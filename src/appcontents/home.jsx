import { useEffect, useState } from 'react'
import {auth,db} from '../firebasesetup/config'
import {Transactions} from './transactions'
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {UserInterface} from '../appcontents/UI'
export function Home()
{
    const[getdata,setdata]=useState({'desc':'','value':0})
    const[loading,setloading]=useState(true)
    // function handlechange(e)
    // {
    //     const[name,value]=e.target;
    //     setdata((pre)=>
    //         ...pre,
    //         [value]=e.targer.name
    //     )
    // }
    const handlechange=(e)=>{
        const{name,value}=e.target;
        setdata((pre)=>
            ({
                ...pre,
                [name]:value
            })
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        const user = auth.currentUser;  // Get the currently authenticated user
        if (user) {
          try {
            // Create or update the user's document in the "users" collection
            await setDoc(doc(db, "users", user.uid), {
            //  desc, // The user's name
            //  value  // The user's age
            getdata
            });
            // Show an alert to inform the user that their profile was updated successfully
            alert("Profile updated successfully!");
          } catch (error) {
            // Log any errors that occur during the write operation
            console.error("Error writing document: ", error);
          }
        }
      };
    useEffect(()=>{
        const fetchinguserdata=async()=>{
            const user=auth.currentUser;
            if(user)
                {
                    const docRef=doc(db,"users",user.uid);
                    const docSnap=await getDoc(docRef);
                    if(docSnap.exists())
                        {
                            const userData=docSnap.data();
                            // setdata(desc=userData.desc,vlaue=userData.value);
                            // setdata(userData)
                            // console.log(userData)
                           setdata(userData.getdata);
                        }
                    else{
                        alert("no such document is available");
                    }
                    setloading(false)
                }
        };
        fetchinguserdata();
    },[])
    return(
        <div style={{background:'#F1FAEE',width:'100vw'}}>
            <h1>You are LoggedIn sucessfully</h1>
            {/* <h3>Enter Description for a Transaction</h3>
            <form className='form' onSubmit={handleSubmit}>
                <label>Enter Descpr</label>
                <textarea onChange={handlechange} name='desc'></textarea>
                <label>Enter Value</label>
                <input onChange={handlechange} name='value' type='number'></input>
            <button className='btn btn-success' type='submit'>SetToFirBase</button>
            </form> */}
            <UserInterface></UserInterface>
            {/* <Transactions data={getdata} ></Transactions> */}
            <button onClick={()=>auth.signOut()} className="btn btn-primary">SignOut</button>

        </div>
    )
}

