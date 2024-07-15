import {auth} from '../firebasesetup/config'
import {UserInterface} from '../appcontents/UI'
export function Home()
{
    return(
        <div style={{background:'#F1FAEE',width:'100vw'}}>
            <h1>You are LoggedIn sucessfully</h1>
            <UserInterface></UserInterface>
            <button onClick={()=>auth.signOut()} className="btn btn-primary">SignOut</button>
        </div>
    )
}

