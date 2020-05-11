import React, {Component} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }


    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit = () => {

        if (this.state.password.length < 6) {
            alert("Password is too short!");

        } else {

            fetch('http://localhost:3001/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
                .then(response => response.json())
                .then(response => {
                if (response !== 0) {
                    const cookies = new Cookies();
                    cookies.set('leitner_token', response, {path: '/'});
                    Router.push('/profile', undefined, {shallow: true});
                   

                } else {
                    alert('Username or Password is Wrong');
                }
            })
        }
    }


    render() {

        const particlesOptions = {
            particles: {
                number: {
                    value: 30,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                }
            }
        }


        return (
            <div className=''>
                <article className="signInUpBox br3 ba b--black-10 mt5 bg-light-purple w-100 w-50-m w-25-l mw6 shadow-5 center br4">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
                                <div className="mt3">
                                    <label className="db lh-copy f6 white-70" htmlFor="email-address">Email</label>
                                    <input
                                        className="pa2 input-reset  bg-white-50 ba w-100 relative br-pill"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db lh-copy f6 white-70" htmlFor="password">Password</label>
                                    <input
                                        className="b pa2 input-reset ba bg-white-50 w-100 relative br-pill"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="tc">
                                <input
                                    onClick={this.onSubmit}
                                    className="w-100 ph3 pv2 input-reset ba b--black grow pointer bg-purple white f5 dib br-pill"
                                    type="submit"
                                    value="Sign In"
                                />
                            </div>
                            <div className="tc">
                                <p className="white-70">Don't have an account? Click <button onClick={() => Router.push('/signup')}>here</button> to Register</p>
                            </div>
                        </div>
                    </main>
                </article>
                <Link href='/'>
                    <button>Home</button>
                </Link>
            </div>
        );
    }

}


export default SignIn