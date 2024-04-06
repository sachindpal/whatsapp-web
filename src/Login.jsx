import logo from './logo.svg';
import './Login.css';
import socketService from './helper';
import { useEffect, useRef, useState } from 'react';
import ApiServices from './ApiServices';
import { useNavigate } from 'react-router-dom';
// import whatsappImag from './../public/images/3d-Whatsapp-Icon-PNG-758x473.jpg'
function Login() {
  const navigate = useNavigate();

    const mobile = useRef('enter value')
    const password = useRef('enter value')
    const onLogin = () => {
        const number = mobile.current.value
        const pass = password.current.value
        const sendData = {};
        console.log(number,'',pass)
        if (pass && number) {
            sendData.password = pass;
            sendData.number = number;
            ApiServices.postRequest(sendData, 'login').then((data) => {
                console.log("hava",data)
                navigate('/',{})
                localStorage.setItem('users', JSON.stringify(data))
            }).catch((err) => {
                console.log('ff', err)
            })
        }
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }} className='login-container'>
            <div>
                <img src={`${process.env.PUBLIC_URL}/images/3d-Whatsapp-Icon-PNG-758x473.jpg`} height={100} width={100} style={{ opacity: 0.3 }} />
            </div>
            <div style={{ borderWidth: 1, borderColor: 'grey', borderStyle: 'solid', padding: 40, borderRadius: 5, width: '50vw' }}>

                <div style={{ width: '90%', padding: 10, borderWidth: 1, borderStyle: 'solid', borderColor: 'grey', borderRadius: 5 }}>

                    <span>Mob</span>
                    <input type='text' ref={mobile} name='mobile' style={{ padding: 10, outline: 'none', border: 'none', background: 'transparent' }} />
                </div>

                <div style={{ width: '90%', padding: 10, borderWidth: 1, borderStyle: 'solid', borderColor: 'grey', borderRadius: 5, marginTop: 10 }}>

                    <span>Pass</span>
                    <input ref={password} type='text' name='mobile' style={{ padding: 10, outline: 'none', border: 'none', background: 'transparent' }} />
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'grey', padding: 10, borderRadius: 5, marginTop: 10 }} onClick={() => onLogin()}>
                        <input type='button' value={"submit"} style={{ border: 'none', background: 'transparent' }} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
