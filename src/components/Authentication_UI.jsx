import { useState } from 'react';
import {SignIn} from './signin';
import {SignUp} from './signup';
import {styled} from 'styled-components';
export function UserAthenticaionUI()
{
    const[getbtnvalue,setbtnvalue]=useState(false);
    const[getstyle,setstyle]=useState('')
    function handleclick(e)
    {
        // setbtnvalue(e.target.value)
        e.preventDefault();
       setbtnvalue(!getbtnvalue)
    //    console.log(getbtnvalue)
      setstyle('red');
    //    setstyle
    // console.log(getstyle)
    }
    return(
        <Loginui className="" style={{width:'50vw',border:'2px solid black'}} >
            <div className="d-flex justify-content-center gap-3 border border-dark">
                <div style={{width:'100%',textAlign:'center',backgroundColor:!getbtnvalue?getstyle:''}}><button  onClick={handleclick} className="btn btn-primary" disabled={!getbtnvalue}>Login</button></div>
                <div style={{width:'100%',textAlign:'center',backgroundColor:getbtnvalue?getstyle:''}}><button  onClick={handleclick} className="btn btn-success" disabled={getbtnvalue}>SignUp</button></div>
            </div>
            <div>LoginDetails
            {getbtnvalue?<SignUp></SignUp>:<SignIn></SignIn>}
            </div>
        </Loginui>
    )
}
const Loginui=styled.div`
    background-color: black;
    color: white;
 button{
    /* width: auto; */
     
    
 }
    button:hover{
        /* background-color: red; */
    }
`