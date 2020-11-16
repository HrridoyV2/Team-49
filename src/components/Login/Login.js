import React, { useContext, useState } from 'react';
import './Login.css'
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import google from './google.png';
import fb from './fb.png'

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from:{pathname:"/"}};

    

    // google sign in
    const googleSingIn = () => {
        const providerGL = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(providerGL)
        .then(result => {
            const {displayName, email} = result.user;
            const optUser = {
                signed: true,
                name: displayName,
                email: email,
                message: 'Login Successful'
            }
            setUser(optUser);
            history.replace(from);
        })
        .catch(error => {
            const optUser = {};
            optUser.message = error.message;
            setUser(optUser)
        });
    }

    // facebook sign in
    const facebookSingIn = () => {
        var providerFB = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(providerFB)
        .then(result => {
            const {displayName, email} = result.user;
            const optUser = {
                signed: true,
                name: displayName,
                email: email,
                message: 'Login Successful'
            }
            setUser(optUser);
            history.replace(from);
        })
        .catch(error => {
            const optUser = {};
            optUser.message = error.message;
            setUser(optUser)
        });
    }

    // blur handler
    const handleBlur = (e) => {
        const optUser = {...user};
        optUser[e.target.name] = e.target.value;
        setUser(optUser)
    }
    
    const subForm = (e) => {
        if (newUser){
            // email sign in
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                const optUser = {
                    signed: true,
                    name: user.name,
                    email: user.email,
                    message: 'Login Successful'
                }
                setUser(optUser);
                updateName(user.name)
                history.replace(from);
            })
            .catch(error => {
                const optUser = {...user};
                optUser.message = error.message;
                setUser(optUser)
            });
        }
        if (!newUser) {
            // email login
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    const {displayName, email} = result.user;
                    const optUser = {
                        signed: true,
                        name: displayName,
                        email: email,
                        message: 'Login Successful'
                    }
                    setUser(optUser);
                    history.replace(from);
                })
                .catch(error => {
                    const optUser = {};
                    optUser.message = error.message;
                    setUser(optUser)
                });
        }
        e.preventDefault();
    }

    // update name
    const updateName = name => {
        const currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({displayName: name})
        .then()
        .catch(error => {
            console.log(error)
        });
    }

    console.log(user)

    return (
        <Container className="text-center text-white">
            <div className="mx-auto bg-dark p-3 rounded" id="login">
                    <Form onSubmit={subForm}>
                        <h3 className="my-4">{newUser ? 'Create Account' : 'User Login'}</h3>
                        {newUser && <FormControl onBlur={handleBlur} name="name" type="text" placeholder="First Name" className="my-3 bg-light" required />}

                        {newUser && <FormControl onBlur={handleBlur} name="name" type="text" placeholder="Last Name" className="my-3 bg-light" required />}

                        <FormControl onBlur={handleBlur} name="email" type="email" placeholder="Username or Email" className="my-3 bg-light" required />

                        <FormControl onBlur={handleBlur} name="password" type="password" placeholder="Your Password" className="my-3 bg-light" required />

                        {newUser && <FormControl  type="password" name="password" placeholder="Confirm Password" className="my-3 bg-light" required />}

                        <button className="btn-warning btn-sm" type="submit">{newUser ? 'Sign Up' : 'Login'}</button>
                        <span className="d-block btn my-4 text-light" onClick={()=>{
                            setNewUser(!newUser);
                            setUser({
                                signed: false,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                                message: ''
                            });
                        }}>{newUser ? 'I have an account' : 'I am new here'}</span>
                        <h6 className="text-warning text-center mt-4">{user.message}</h6>
                    </Form>
                    <hr className="bg-white" />
                    
                    <Button variant="light" className="my-3 rounded-pill" onClick={googleSingIn}>
                        <img src={google} className="icon" alt=""/>
                        Sign in with Google
                    </Button>
                    <Button variant="light" className="my-3 rounded-pill" onClick={facebookSingIn}>
                        <img src={fb} className="icon" alt=""/>
                        Sign in with Facebook
                    </Button>
                    
                
            </div>
            
        </Container>
    );
};

export default Login;