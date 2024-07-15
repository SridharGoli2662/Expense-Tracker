import { useState } from "react";
import { auth } from "../firebasesetup/config";
import{createUserWithEmailAndPassword} from 'firebase/auth';
export function SignUp()
{
    const[getdata,setdata]=useState({email:"",password:""});
    const[geterror,seterror]=useState({emailerror:'',passworderror:'',defaulterror:''});
    //for signup button blocking
    // const[getbtn,setbtn]=useState(false);
    async function onhandlesubmit(e)
    {
        e.preventDefault();
        console.log(getdata)
        await createUserWithEmailAndPassword(auth,getdata.email,getdata.password)
        .then((usercredentials)=>{
          alert("user is signed Up Sucessfully",usercredentials.user);
        })
        .catch((err)=>{
          // alert("Error occured While signing");
          alert(err.code)
          errorhandler(err.code)
          console.log(err)
        })
    }
    function errorhandler(error)
    {
      switch(error)
      {
        case 'auth/email-already-in-use':
          // seterror({emailerror:'Email Already Exits!',passworderror:geterror.passworderror,defaulterror:geterror.defaulterror})
          seterror({emailerror:'Email Already Exits!'})
          // setbtn(true);
        //   seterror((key,value)=>
        //      [key]=[...value],
        //      geterror.emailerror="Email Alreay Exits!"
        // )
          break;
        case 'auth/weak-password':
          // seterror("WeakPassword")
          seterror({passworderror:"Weak Password"})
          // setbtn(true);
          // seterror({emailerror:geterror.emailerror,passworderror:"Weak Password",defaulterror:geterror.defaulterror})
          break;
        default:
          // seterror('Invalid Details')
          // seterror({emailerror:geterror.emailerror,passworderror:geterror.passworderror,defaulterror:"Invalid Credentials"})
            seterror({defaulterror:"Invalid Credentials"})
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
//   const[getmail,setmail]=useState();
//   const[getpassword,setpassword]=useState();
    return(
        <div className="form d-flex justify-content-center m-5 p-3">
      <form onSubmit={onhandlesubmit} >
      <div className="form-group  mb-2 ">
          <label >UserName:</label>
          <input name="text"type="text" onChange={handlechange} className="form-control" id="exampleUsername" aria-describedby="UsernameHelp" placeholder="Enter UserName" />
        
        </div>
        <div className="form-group">
          <label >Email address:</label>
          <input name="email"type="email" onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          <p className="text text-danger">{geterror.emailerror}</p>
        </div>
        <div className="form-group">
          <label >Password:</label>
          <input name="password" type="password" onChange={handlechange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
          <p className="text text-danger">{geterror.passworderror}</p>
        </div>
        <button type="submit" className="btn btn-primary m-3">SignUp</button>
      </form>
    </div>
    )
}