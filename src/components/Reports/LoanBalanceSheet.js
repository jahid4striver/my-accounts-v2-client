import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../Authentication/firebase.init';
import Loading from '../Shared/Loading';

const LoanBalanceSheet = () => {
    const [accounts, setAccounts] = useState([]);
    const [loanExpenses, setLoanExpenses] = useState([]);
    const [loanIncome, setLoanIncome] = useState([]);


    useEffect(() => {
        const url = `https://nbcaccounts.clearsoftwares.xyz/categorywiseexpense?category=Loan&subcategory=Given`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoanExpenses(data)
            })
    }, []);

    useEffect(() => {
        const url = `https://nbcaccounts.clearsoftwares.xyz/loanreturnreport`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoanIncome(data)
            })
    }, []);






    const { data: bankAccounts, isLoading } = useQuery(['accounts'], () => fetch('https://nbcaccounts.clearsoftwares.xyz/loanaccountsgiven').then(res => res.json()));



    //Balance Report

    //Loan Given Amount

    let array = [];

    for (let i = 0; i < bankAccounts?.length; i++) {
        const filtered = loanExpenses.filter(loan => loan.expense === bankAccounts[i]?.name);
        array.push(filtered);
    }

    let array2 = [];

    for (let i = 0; i < array?.length; i++) {
        const loanGivenAccounts = array[i]?.map(a => a.amount);
        const totalLoanGiven = loanGivenAccounts?.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        array2.push(totalLoanGiven);

    }

    // console.log(array2);

    //Loan Return Amount

    let returnName = bankAccounts?.map(a => a.name.slice(0, -6));
    let array3 = [];
    for (let i = 0; i < returnName?.length; i++) {
        const filtered = loanIncome.filter(loan => loan.description.includes(returnName[i]));
        array3.push(filtered);
    }

    let array4 = [];

    for (let i = 0; i < array?.length; i++) {
        let loanReturnAccounts = array3[i]?.map(a => a.amount);
        const totalLoanReturn = loanReturnAccounts?.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        array4.push(totalLoanReturn)
    }

    // Joining Balance To data

    var data = [];
    for (var i = 0; i < bankAccounts?.length; i++) {
       const account= ({ name: bankAccounts[i]?.name, balance: array2[i] - array4[i] });
        if(account.balance!==0){
            data.push(account);
        }
    }


    if (isLoading) {
        return <Loading></Loading>
    }

    const handleBalance = (ac) => {
        const underscore = ac.name.replace(/ /g, "_");

        const url = `https://nbcaccounts.clearsoftwares.xyz/accountsbalance?account=${underscore}`
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAccounts(data)
                console.log(data);
            })
    }

    const totalBalance = data.reduce((total, currentValue) => total + parseInt(currentValue.balance), 0);


    // useEffect(() => {
    //     fetch('https://nbcaccounts.clearsoftwares.xyz/banks')
    //         .then(res => res.json())
    //         .then(data => {
    //             setBanks(data);
    //             console.log(data);
    //         })
    // }, [banks, setBanks])
    return (
        <div>
            <h1 className='text-center text-xl mt-8'>Loan Balance Sheet</h1>
            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Account Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((bankAccount, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{bankAccount?.name}</td>
                                <td>{bankAccount?.balance}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total Loan Given</th>
                            <th>{totalBalance}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default LoanBalanceSheet;