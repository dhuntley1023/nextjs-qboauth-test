import { Suspense } from "react";
import Account from "../components/account"
import { initializeDatabase } from "../models/index.js";
 
export default async function Home() {

    // Initialize the database
    await initializeDatabase();
 
    const ids = Array.from({ length: 0 }, (_, i) => i + 1);

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
            <Suspense
                fallback={<p>Welcome back, you are authenticated!</p>}>
                {ids.map(id => <Account key={id} id={id} />)}
            </Suspense> 
        </div>
    );
    

}