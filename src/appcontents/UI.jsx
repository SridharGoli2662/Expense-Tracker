import { get, set } from "firebase/database";
import { useEffect, useId, useState } from "react";
import{History} from '../appcontents/lasttransactions'
import{BalanceCard} from '../appcontents/balancecard'
import {styled} from 'styled-components';
import{useFormik} from 'formik'
import * as yupmeths from 'yup'
import { AuthErrorCodes, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import{auth,db} from '../firebasesetup/config';

export function UserInterface() {
    const[getuserstatus,setuserstatus]=useState({});
    useEffect(()=>{
        // console.log(auth.currentUser)
        // async function gettinguid()
        // {
        //     // const userid= await auth.currentUser; 
            if(auth.currentUser)
                {
                    // console.log(true)
                     setuserstatus( auth.currentUser.uid)
                    console.log("userid is setted")
                    console.log(auth.currentUser.uid)
                 }
        //     else{
        //             console.log("this  is not working man")
        //         }
        // }
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if (user) {
                setuserstatus(user.uid);
            } else {
                console.log("User is not authenticated");
            }
            // console.log(user);
        });
        return () => unsubscribe();
    },[])
    const formik=useFormik({
        initialValues:{
         'description':'',
        'amount':'',
        'date':'',
        'transactiontype':''
    },
        // validate:formvalidation,
        validationSchema:yupmeths.object({
            
            'description':yupmeths.string().required().min(4),
            'amount':yupmeths.number().required(),
            'date':yupmeths.string().required(),
            'transactiontype':yupmeths.string().required('this is required')
        }),
        onSubmit:async (values)=>{
          if(getuserstatus)
            {
                await datasubmission(getuserstatus,values)
                console.log("this function is working bhai")
            }
            else{
                console.log("user is no authenticated")
            }
        },
    })
//    const handlechange=(e)=>{
//     const{name,value}=e.target;
//     setdata((previous)=>({
//         ...previous,
//         [name]:value
//     }))
//    }
    // function handlesubmit(e)
    // {
    //     e.preventDefault();
    //     // alert(JSON.stringify(getdata))
    // }
    const datasubmission=async(userid,data)=>{
        const documetnreference=doc(db,'users',userid);
        const newcollection=collection(documetnreference,'transactions');
       await addDoc(newcollection,data)
    }
    return (
                // props=>
        <div>
            <BalanceCard></BalanceCard>
            {/* <h2>This is the main page for my application</h2> */}
            <Responsive>
            <Form_style>
                <form className="needs-validation"  onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column justify-content-center w-75 m-auto">
                     <label htmlFor="description" style={{margin:'6px'}}>Description</label>
                     <input name="description" type="text" onChange={formik.handleChange}  placeholder="TransactionDetails" id="description"></input>
                     <p className="text-danger">{formik.errors.description}</p>
                   </div>
                    <div id="inner">
                        <div>
                            <label htmlFor="amount">Amount</label><br></br>
                            <input name="amount" onChange={formik.handleChange} type="number" id="amount"></input>
                            <p className="text-danger">{formik.errors.amount}</p>
                        </div>
                        <div>
                            <label htmlFor="date">Date</label><br></br>
                            <input name="date" onChange={formik.handleChange} type="date" id='date'></input>
                            <p className="text-danger">{formik.errors.date}</p>
                        </div>
                    </div>
                    <div  className="d-flex justify-content-center gap-2">
                        <input onChange={formik.handleChange} type="radio" name="transactiontype" id="expense"></input>
                        <label htmlFor="expense">Expense</label>
                        <input onChange={formik.handleChange} name="transactiontype" type="radio" id="income"></input>
                        <label  htmlFor="income">Income</label>
                    </div>
                    <p className="text-danger text-center">{formik.errors.transactiontype}</p>
                    <div className="d-flex justify-content-center" >
                    <button type="submit">ADD</button>
                    </div>
                </form>
                </Form_style>
            
                <History data={{getuserstatus}}></History>
                </Responsive>
        </div>
    )
}
const Form_style=styled.div`
    background-color: #A8DADC;
    width: 35vw;
    margin: auto auto;
    padding: 10px;
    #inner{
        display:flex;
        justify-content: space-evenly;
    }
    /* height: 38vh; */
   @media (max-width:800px)  {
    width: 75vw;
    margin: 10px auto;
    #inner{
        display: grid;
        /* line-height: 20px; */
       input{
        width: 30vw;
       }
    }
   }
`
//container for responsive
const Responsive=styled.div`
display: flex;
    @media (max-width:800px){
        display: block;
        /* width: 100vw; */
        /* display: ""; */
        /* background-color: red; */
    }
`