import QuickBooks from 'node-quickbooks';
import { getSession } from '../actions/session';

export default async function Account({id}) {

        async function getAccountAsync(qbo, id) {
            'use server'
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
                                    false, // enable debugging?
                                    null, // set minorversion, or null for the latest version
                                    '2.0', //oAuth version
                                    session.refreshToken);
    
            const account = await getAccountAsync(qbo, id);

            return <div className='pt-4'>
                        <h1 className='font-extrabold bg-blue-700 text-white'>Account: {account.Name}</h1>
                        <ul>
                            <li><span className='font-bold'>ID: </span>{account.Id}</li>
                            <li><span className='font-bold'>Classification: </span>{account.Classification}</li>
                            <li>Type: {account.AccountType}</li>
                            <li>SubType: {account.AccountSubType}</li>
                            <li>Balance: {account.CurrentBalance}</li>
                        </ul>
                    </div>
        }
    }