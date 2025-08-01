import { Account } from '../models/account';

export default async function AccountDetails({ id }) {
    console.log("AccountDetails started")
    try {
        const account = await Account.getAccount(id);
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
    } catch (error) {
        return <div className='bg-red-500'>Account fetch failed: {error.message}</div>
    }
}
