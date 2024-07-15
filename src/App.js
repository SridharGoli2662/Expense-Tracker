import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import {SignUp} from "../src/components/signup";
import { SignIn } from './components/signin';
import{auth,onAuthStateChanged} from "../src/firebasesetup/config"
import { Home } from './appcontents/home';
function App() {
  const[user,setuser]=useState(null);
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
     if(user)
       {
         setuser(user);
       }
       else{
         setuser(null);
       }
    })
    return ()=>unsubscribe();
   },[]);
  return (
    <div className="form d-flex justify-content-center m-5 p-3">
           <SignIn></SignIn>
           <SignUp></SignUp>
    </div>
  );
}

export default App;
