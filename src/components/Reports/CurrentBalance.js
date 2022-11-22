import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../Authentication/firebase.init';
import Loading from '../Shared/Loading';

const CurrentBalance = () => {
    // const [user]= useAuthState(auth)
    const [accounts, setAccounts]= useState([]);


    const { data: bankAccounts, isLoading } = useQuery(['accounts'], () => fetch('https://my-accounts.onrender.com/accounts').then(res => res.json()));


    // if(user.email=='hameem@myaccounts.com'){
        
    // }


    if (isLoading) {
        return <Loading></Loading>
    }

    const handleBalance=(ac)=>{
        const underscore =ac.name.replace(/ /g,"_");

        const url= `https://my-accounts.onrender.com/accountsbalance?account=${underscore}`
        console.log(url);
        fetch(url)
        .then(res=> res.json())
        .then(data=> {
            setAccounts(data)
            console.log(data);
        })
    }

    const totalBalance = accounts.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    // useEffect(() => {
    //     fetch('https://my-accounts.onrender.com/banks')
    //         .then(res => res.json())
    //         .then(data => {
    //             setBanks(data);
    //             console.log(data);
    //         })
    // }, [banks, setBanks])
    return (
        <div>
            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Bank Name</th>
                            <th>Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bankAccounts.map((bankAccount, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{bankAccount.name.replace(/_/g, ' ')}</td>
                                <td>{totalBalance}</td>
                                <td><button onClick={()=>handleBalance(bankAccount)} className='btn btn-xs'>Show Balance</button> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CurrentBalance;