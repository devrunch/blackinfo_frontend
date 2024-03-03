import * as Tabs from '@radix-ui/react-tabs';
import './eachstyle/popup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
const LoginPopUp = ( {toggleState, setuser} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
     axios.post('http://localhost:3000/api/user/login', {
       email: email,
       password: password,
     })
      .then(function (response) {
        console.log(response.data);
         if (!response.data.success) {
           console.log(response.data.message)
           localStorage.setItem("token", response.data.token);
           toast("Login Successfull")
           setInterval(() => {
            console.log(hello)
           }, 5000);
           window.document.location.reload();
           
           return;
         }
      })
      .catch(function (error) {
        toast(error.response.data.message);
      });
  };

  const handleRegister = async () => {
    console.log("here")
    try{
      const response = await fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if(data.status==0){
      toast("User already exists")
    }
    else{
      toast("User registered successfully")
      window.document.location.reload();

    }
  }catch(err){
    console.log(err)

  }
    console.log(data)
    setuser(data);
  };
  return (
    <Tabs.Root className="TabsRoot" style={{zIndex:"334"}} defaultValue="tab1">
    <Tabs.List className="TabsList" aria-label="Manage your account">
      <Tabs.Trigger className="TabsTrigger bg-gray-700 text-gray-200" value="tab1">
        Login
      </Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger bg-gray-700 text-gray-200" value="tab2">
        Register
      </Tabs.Trigger>
      <button className='bg-gray-700 text-gray-200 rounded-tr-lg w-6 text-center' onClick={()=>toggleState(false)}>x</button>
    </Tabs.List>
    <Tabs.Content className="TabsContent" value="tab1">
      <p className="Text">Login into your account</p>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="name">
          Email
        </label>
        <input className="Input" type='email' placeholder='abc@email.com' onChange={
          (e) => {
            setEmail(e.target.value);
          }
      
        } />
      </fieldset>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="username">
          Password
        </label>
        <input className="Input" id="username" placeholder='****' onChange={
          (e) => {
            setPassword(e.target.value);
          }
        } />
      </fieldset>
      <a href="" className='text-gray-900 text-xs hover:underline'>Forgot password</a>
      <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
        <button className="Button green" onClick={()=>{handleLogin()}}>Login</button>
      </div>
    </Tabs.Content>
    <Tabs.Content className="TabsContent" value="tab2">
      <p className="Text">Register Yourself!</p>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="currentPassword">
          Email 
        </label>
        <input className="Input"  type="email" placeholder='Email' onChange={
          (e) => {
            setEmail(e.target.value);
          }
        } />
      </fieldset>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="newPassword">
          Password
        </label>
        <input className="Input" id="newPassword" type="password" onChange={
          (e) => {
            setPassword(e.target.value);
            console.log(password)
          }
        
        } />
      </fieldset>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input className="Input" id="confirmPassword" type="password" />
      </fieldset>
      <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }} onClick={()=>{handleRegister()}}>
        <button className="Button green" >Register</button>
      </div>
    </Tabs.Content>
    <ToastContainer/>
  </Tabs.Root>
  )
}

export default LoginPopUp