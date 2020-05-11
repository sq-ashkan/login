const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();
const crypto = require('crypto');
// var device = require('express-device');
// app.use(device.capture());
app.use(bodyParser.json());
app.use(cors());


require('crypto').randomBytes(64, function(err, buffer) {
    var token = buffer.toString('hex');
});



const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'samanto',
        password: '',
        database: 'leitner'
    }
});


app.get('/', (req, res) => {
    res.send('this is working - home page');
})




app.get('/profile/:token', (req, res) => {
    var { token } = req.params;

    db.from('token')
        .innerJoin('users', 'token.email', 'users.email')
        .where('token.token', token)
        .select('users.name', 'users.email', 'users.reg_time', 'token.token')

    // db('users').join('token', 'users.email', '=', 'token.email')
    //     .where({ 'token.token': token })
    //     .select('users.id', 'users.email', 'users.joined', 'token.token')
    .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
})


app.post('/signin', (req, res) => {

    const { newEmail } = req.body.email;
    db.select('email', 'hash').from('users')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            (isValid) ?
            db.select('*').from('token')
                .where('email', '=', req.body.email)
                .then(user => {
                    if (user[0].expired === 0) {
                        var token = crypto.randomBytes(48).toString('hex');
                        db.transaction(trx => {
                                trx.insert({
                                        token: token,
                                        email: newEmail,
                                        joined: new Date(),
                                        expired: 0,

                                    })
                                    .into('token')

                                .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                            .catch(err => res.status(400).json('ERR'));
                    } else {
                        res.status(200).json(user[0].token)
                    }

                })
                .catch(err => res.status(400).json('error in token finding'))

            :
            res.status(400).json(0)

        })
        .catch(err => res.status(400).json(0))
})








app.put('/signout', (req, res) => {
    const { token } = req.body;
    db('token').where('token', '=', token)
        .increment('expired', 1)
        .returning('expired')
        .then(expiration => {
            res.json(expiration[0]);
        })
        .catch(err => res.status(400).json('Error'))
})






app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    var token = crypto.randomBytes(48).toString('hex');
    db.transaction(trx => {
            trx.insert({
                    email: email,
                    token: token,
                    joined: new Date(),
                    expired: 0,

                })
                .into('token')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: loginEmail[0],
                            hash: hash,
                            reg_time: new Date()
                        })
                        .then(UserIsRegistered => {
                            res.status(200).json(token);
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(0));
})

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`app is running on port ${process.env.PORT}`);
// })

app.listen(3001, () => {
    console.log(`app is running on port 3001`);
})