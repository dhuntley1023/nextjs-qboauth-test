//import { getSession } from "../actions/session"
import Account from "../components/account"

 export default function Home() {
    const ids = Array.from({ length: 5 }, (_, i) => i + 1);

    // const accounts = [];
    // for (let i = 1; i <= 50; i++) {
    //     accounts.push(<Account key={i} id={i}/>);
    // }
 
    // return ( 
    //     <div>
    //         <p>Welcome back, you are authenticated!</p>
    //        {accounts}
    //      </div>
    // );
    return ( 
        <div>
            <p>Welcome back, you are authenticated!</p>
           {ids.map(id => <Account key={id} id={id} />)}
         </div>
    );
    

}