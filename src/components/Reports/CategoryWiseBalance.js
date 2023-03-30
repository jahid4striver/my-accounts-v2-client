import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../Authentication/firebase.init';
import Loading from '../Shared/Loading';

const CategoryWiseBalance = () => {
    const [accounts, setAccounts] = useState([]);
    const [loanExpenses, setLoanExpenses] = useState([]);
    const [loanIncome, setLoanIncome] = useState([]);
    const [categories, setCategories] = useState([]);
    const [expenseHead, setExpenseHead] = useState([]);

    console.log(expenseHead);

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
    useEffect(() => {
        const url = `https://nbcaccounts.clearsoftwares.xyz/categories`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, []);






    const { data: bankAccounts, isLoading } = useQuery(['accounts'], () => fetch('https://nbcaccounts.clearsoftwares.xyz/ownerexpenses?category=').then(res => res.json()));



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
        const account = ({ name: bankAccounts[i]?.name, balance: array2[i] - array4[i] });
        if (account.balance !== 0) {
            data.push(account);
        }
    }


    if (isLoading) {
        return <Loading></Loading>
    }


    const handleFilteredData = e => {
        e.preventDefault();
        const category = e.target.category.value;
        const url = `https://nbcaccounts.clearsoftwares.xyz/ownerexpenses?category=${category}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const filter = 'subcategory'
                const uniqueExpensesHead = [...new Map(data.map(expense =>
                    [expense[filter], expense])).values()];

                let array = [];
                for (let i = 0; i < uniqueExpensesHead?.length; i++) {
                    const filtered = data.filter(expense => expense.subcategory === uniqueExpensesHead[i]?.subcategory);
                    array.push(filtered);
                }
                let array2 = [];
                for (let i = 0; i < array?.length; i++) {
                    const expenseAccounts = array[i]?.map(a => a.amount);
                    const totalExpense = expenseAccounts?.reduce((a, b) => parseInt(a) + parseInt(b), 0);
                    array2.push(totalExpense);
                }
                console.log(array2);


                const url2 = `https://nbcaccounts.clearsoftwares.xyz/categorywisecheques?chequecategory=${category}`
                fetch(url2)
                    .then(res => res.json())
                    .then(data => {
                        const newArray = data.map((
                            { chequeamount: amount, chequebank: chequebank, chequecategory: category, chequeno: chequeno,
                                chequedate: chequedate, chequesubcategory: subcategory, chequeunit: chequeunit,
                                depositaccount: depositaccount, depositbank: depositbank, depositdate: date, sl: sl,
                                _id: _id }) => (

                            {
                                amount, chequebank, category, chequeno, chequedate, subcategory, chequeunit, depositaccount, depositbank
                                , date, sl, _id
                            }));

                        let array3 = [];
                        for (let i = 0; i < uniqueExpensesHead?.length; i++) {
                            const filtered = newArray.filter(income => income.subcategory === uniqueExpensesHead[i].subcategory);
                            array3.push(filtered);
                        }
                        let array4 = [];
                        for (let i = 0; i < array?.length; i++) {
                            let incomeAccounts = array3[i]?.map(a => a.amount);
                            const totalLoanReturn = incomeAccounts?.reduce((a, b) => parseInt(a) + parseInt(b), 0)
                            array4.push(totalLoanReturn)
                        }

                        let alldata = [];
                        setExpenseHead(alldata);
                        for (var i = 0; i < uniqueExpensesHead?.length; i++) {
                            const account = ({ category: uniqueExpensesHead[i]?.category, subcategory: uniqueExpensesHead[i]?.subcategory, expense: array2[i], income: array4[i], balance: array2[i] - array4[i] });
                            alldata.push(account);
                        }



                    })


            })



    }

    const totalBalance = expenseHead.reduce((total, currentValue) => total + parseInt(currentValue.balance), 0);

    return (
        <div>
            <h1 className='text-center text-xl mt-8'>Category Wise Balance Sheet</h1>
            <form onSubmit={handleFilteredData} className='mt-12 flex flex-col lg:flex-row justify-center items-center'>
                <div class="form-control w-full max-w-xs lg:mr-2">
                    <label class="label">
                        <span class="label-text">Select The Category</span>
                    </label>
                    <select name='category' class="select select-bordered w-full max-w-xs">
                        {
                            categories.map(category => <option key={category._id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <input type='submit' value='Summary' className='btn btn-md mt-4 lg:mt-9 lg:ml-2' />
            </form>
            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Category</th>
                            <th>SubCategory</th>
                            <th>Total Expenses</th>
                            <th>Total Incomes</th>
                            <th>Balance</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenseHead.map((head, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{head?.category}</td>
                                <td>{head?.subcategory}</td>
                                <td>{head?.expense}</td>
                                <td>{head?.income}</td>
                                <td>{head?.balance}</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Total Balance</th>
                            <th>{totalBalance}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default CategoryWiseBalance;