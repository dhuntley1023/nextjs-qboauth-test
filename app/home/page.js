import { getSession } from "../actions/session"
var QuickBooks = require('node-quickbooks')

export default async function Home() {

    function getAccountAsync(qbo, id) {
        return new Promise((resolve, reject) => {
            qbo.getAccount(id, (err, account) => {
            if (err) return reject(err);
            resolve(account);
            });
        });
    }


    const session = await getSession();
    if (session && session.accessToken) {
        var qbo = new QuickBooks(process.env.QUICKBOOKS_CLIENT_ID,
                                process.env.QUICKBOOKS_CLIENT_SECRET,
                                session.accessToken,
                                false, // no token secret for oAuth 2.0
                                session.realmId,
                                true, // use the sandbox?
                                true, // enable debugging?
                                null, // set minorversion, or null for the latest version
                                '2.0', //oAuth version
                                session.refreshToken);

        const account = await getAccountAsync(qbo, 41)

        return <div>
                <p>Welcome back, you are authenticated!</p>
                <p>Access token = {session.accessToken}</p>
                <h1>Fetching Account</h1>
                <p>Fetched account {account.Name}.  Balance {account.CurrentBalance}                     </p>
                </div>
    } else {
        return <p>No access token or unable to fetch cookie</p>
    }
}