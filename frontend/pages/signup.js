import React, {Component} from 'react';
import Particles from "react-particles-js";
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        }
    }


    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onPasswordConfirmChange = (event) => {
        this.setState({
            passwordConfirm: event.target.value
        })
    }

    onSubmit = () => {

        if (this.state.password.length < 6) {
            alert("Password is too short!");
            return;
        }

        if (this.state.password !== this.state.passwordConfirm) {
            alert('Passwords are not same!');
            return;
        }

        fetch('http://localhost:3001/signup', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response !== 0) {
                    const cookies = new Cookies();
                    cookies.set('leitner_token', response, {path: '/'});
                    Router.push('/profile', undefined, {shallow: true});

                } else {
                    alert('this email is used befor, please take another email address');
                }
            })
    }


    render() {

        const cookies = new Cookies();
        const token = cookies.get('leitner_token');
        if (token != null && token.length > 0) {
            Router.push('/profile', undefined, {shallow: true});
        }

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
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0 white">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db lh-copy f6 white-70" htmlFor="name-address">Name</label>
                                    <input
                                        className="pa2 input-reset  bg-white-50 ba w-100 relative br-pill"
                                        type="name"
                                        name="name-address"
                                        id="name-address"
                                        onChange={this.onNameChange}
                                    />
                                </div>
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
                                        className="b pa2 input-reset  bg-white-50 ba w-100 relative br-pill"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db lh-copy f6 white-70" htmlFor="passwordconfirm">Confirm Password</label>
                                    <input
                                        className="b pa2 input-reset  bg-white-50 ba w-100 relative br-pill"
                                        type="password"
                                        name="passwordconfirm"
                                        id="passwordconfirm"
                                        onChange={this.onPasswordConfirmChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="tc">
                                <input
                                    onClick={this.onSubmit}
                                    className="w-100 ph3 pv2 input-reset ba b--black grow pointer bg-purple white f5 dib br-pill"
                                    type="submit"
                                    value="Sign Up"
                                />
                            </div>
                            <div className="tc">
                                <p className="white-70">Already have an account? Click <button onClick={() => Router.push('/signin')}>here</button> to Sign In!</p>
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

export default SignUp;
