import { Suspense } from "react";
import AccountDetails from "../components/accountdetails";
//import { initializeDatabase } from "../models/index.js";
 import InitDb from "../components/initdb";

export default async function Home() {

    const ids = Array.from({ length: 100 }, (_, i) => i + 1);

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
            <Suspense fallback={<p>Welcome back, you are authenticated!</p>}>
                <InitDb>    
                    {ids.map(id => <AccountDetails key={id} id={id} />)}
                </InitDb>
            </Suspense> 
        </div>
    );
    

}