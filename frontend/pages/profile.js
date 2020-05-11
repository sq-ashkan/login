import React, {Component} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';


class profile extends Component {

    constructor() {
        super();

    }

    SignOut = () => {

        const cookies = new Cookies();
        const token = cookies.get('leitner_token');

        fetch('http://localhost:3001/signout', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: token,
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response !== 0) {
                    cookies.set('leitner_token', null, {expires: new Date()});
                    Router.push('/', undefined, {shallow: true});
                }
            })
    }


    render() {

        return (
            <div>
                <h1>here is your dashboard - profile page</h1>

                <Link href='/'>
                    <button>Home</button>
                </Link>
                <button onClick={this.SignOut}>Sign out</button>
            </div>
        );
    }

}


export default profile



