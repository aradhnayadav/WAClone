import React,{useState} from 'react'
import {useStateValue} from './StateProvider'
import "./Login.css"
import {Button} from "@material-ui/core"
import {auth,provider} from './firebase'
import { actionTypes } from './reducer';
function Login() {
    const [{},dispatch]=useStateValue();

    const signIn = () => {
     auth
     .signInWithPopup(provider)
     .then(result => {
         dispatch ({
             type: actionTypes.SET_USER,
             user: result.user,
         });
     }
     ).catch(error=>alert(error.message));
    };
    return (
        <div className="login">
            
            <div className="login_cont">
                <img src="https://www.freepnglogos.com/uploads/whatsapp-png-logo-7.png" />
                <div className="login_task">
                    <h1>sign in to whatsapp</h1>

                </div>
                <Button onClick={signIn}>sign in with google</Button>
            </div>
        </div>
    )
}

export default Login
