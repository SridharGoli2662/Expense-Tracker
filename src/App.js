import './App.css';
import { useState,useEffect } from 'react';
import{auth,onAuthStateChanged} from "../src/firebasesetup/config"
import{UserAthenticaionUI} from './components/Authentication_UI'
import { Home } from './appcontents/home';
function App() {
  const[user,setuser]=useState(null);
  //userAthenticaion checking in database
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(userstatus)=>{
     if(userstatus)
       {
        setuser(true);
       }
       else{
        setuser(null);
       }
    })
    return ()=>unsubscribe();
   },[user]);
  return (
    <div className="form d-flex justify-content-center m-5 p-3">
           {user?<Home></Home>:<UserAthenticaionUI></UserAthenticaionUI>}
      </div>
  );
}

export default App;
