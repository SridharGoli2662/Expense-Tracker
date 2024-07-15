import {styled} from 'styled-components'
import{db} from '../firebasesetup/config';
import { collection ,deleteDoc,doc,onSnapshot,orderBy,query} from 'firebase/firestore';
import { useEffect, useState } from 'react';
export function History(props)
{
        const[getdata,setdata]=useState([]);
        const userid=props.data.getuserstatus;
       async function deletion(x)
        {
         try{
            //getting userdocument from users collection 
                        const userref=doc(db,"users",userid)
                    //getting every transaction document using document id from transactions collection
                        const userefff=doc(userref,'transactions',x)
                        //deleting clicked document using deleteDoc
                        await deleteDoc(userefff);
                        // console.log(x)
                }
                catch(err)
                {
                    console.log("error occured while deleting"+err)
                }
        }
        useEffect(()=>{
                    async function gettingdata()
                    {
                        try{
                             //user document from users collection
                            const userref=doc(db,"users",userid)
                            //getting transactions collections
                        const getuserf=query(collection(userref,'transactions'),orderBy('date','desc')) 
                        //dynamically updating transactions
                        onSnapshot(getuserf,(documents)=>{
                            const document=documents.docs.map((x)=>{
                                // console.log(x)
                                return{
                                    id:x.id,
                                    ...x.data()
                                }
                            })
                            setdata(document)
                        })
                    }
                    catch(err)
                    {
                        console.log("error occuerd while getting data")
                    }
                }
                gettingdata()
            },[userid])
    return(
        <Historycontainer className=' text-white '>
            <h2>Transactions</h2>
            {
                getdata.map((x)=>
                        
                <TansctionHistory key={x.id}>
                 <div className=' text-wrap w-50'>
                    <p className='fs-4 mb-2 fw-bold text-danger'>{x.description}</p>
                    <p className='text-white bg-secondary p-1'>{x.date}</p>
                 </div>
                 <div className='d-flex gap-3  text-align-right'>
                    <h3>{x.amount}</h3>
                   <img alt='deleteIcon' style={{cursor:'pointer'}} onClick={()=>deletion(x.id)} value={x.id} src='delete.png'></img>
                 </div>
                 </TansctionHistory>
                )
            }
        </Historycontainer>
    )
}
// const Fontstyle=createGlobalStyle`
// @font-face {
//     font-family: 'MyFont';
//     src: url('https://fonts.googleapis.com/css2?family=Ga+Maamli&display=swap') format('woff2');
//     font-weight: 400;
// }
// body{
//     font-family:'MyFont';
// }
// `
const TansctionHistory=styled.div`
    background-color: #aae0ec;
    color: black;
    margin: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 12px;
    img{
         height: 2rem;
    }
    button{
        background: none;
        border: none;
    }
`
const Historycontainer=styled.div`
background-color: wheat;
width: 30vw;
margin: auto auto;
padding: 10px;
flex-wrap: wrap;
overflow: scroll;
scrollbar-width: none;
height: 60vh;
    @media (max-width:800px){
        background-color: black;
        width: 90vw;
        height: 45vh;
        flex-wrap: wrap;
        /* word-wrap: scroll; */
        overflow: scroll;
        scrollbar-width: none;

    }
`