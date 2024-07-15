import { useState } from "react";
import { auth } from "../firebasesetup/config";
import{signInWithEmailAndPassword} from 'firebase/auth';
export function SignIn()
{
    const[getdata,setdata]=useState({email:"",password:""});
    const[geterror,seterror]=useState('')
    async function onhandlesubmit(e)
    {
        e.preventDefault();
        seterror('')
        console.log(getdata)
        try{
          await signInWithEmailAndPassword(auth,getdata.email,getdata.password)
        }
        catch(err)
        {
          alert(err.code)
          handlerrors(err)
        }
        // .then((usercredentials)=>{
        //   alert("user is signed In Sucessfully",usercredentials.user);
        // })
        // .catch((err)=>{
        //   // alert("Error occured While signing");
        //   alert(err.code)
        // })
    }
    const handlerrors=(err)=>{
      switch(err.code)
      {
        // case "auth/invalid-credential":
        //       seterror("Invalid Credentials")
        //       break;
        case "auth/wrong-password":
        // case "auth/rejected-credential":
              seterror("Invalid Password")
              break;
        case 'auth/invalid-email':
            seterror("No such User Found")
            break;
        default:
            seterror("Invalid credentials")
            break;
      }
    }
    const handlechange=(e)=>{
        const{name,value}=e.target
        setdata((pre)=>({
            ...pre,
            [name]:value
        }))
    }
    return(
        <div className="form d-flex justify-content-center m-5 p-3">
      <form onSubmit={onhandlesubmit}>
        <div className="form-group ">
          <label >Email address:</label>
          <input name="email"type="email" onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label >Password:</label>
          <input name="password" type="password" onChange={handlechange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary m-3">SignIn</button>
      </form>
      <p className="text-danger">{geterror}</p>
    </div>
    )
}