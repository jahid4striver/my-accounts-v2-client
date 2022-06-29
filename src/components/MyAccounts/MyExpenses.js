import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Authentication/firebase.init';

const MyExpenses = () => {
    const [user]= useAuthState(auth)

    const [myExpenses, setMyExpenses] = useState([]);
    // const [category, setCategory]= useState();
    // const [subCategory, setSubCategory]= useState();
    // const [owner, setOwner]= useState();



    // if(user.email=='owner@myaccounts.com'){
    //     setOwner('Personal');
    // }

    if(user?.email=='hameem@myaccounts.com'){
        fetch(`http://localhost:5000/myexpenses?category=Construction&subcategory=Hameem`)
        .then(res => res.json())
        .then(data => {
            setMyExpenses(data)
        })
    }
    if(user?.email=='owner@myaccounts.com'){
        fetch(`http://localhost:5000/ownerexpenses?category=Personal`)
        .then(res => res.json())
        .then(data => {
            setMyExpenses(data)
        })
    }


    // useEffect(() => {
    //     fetch(`http://localhost:5000/ownerexpenses?category=${owner}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMyExpenses(data)
    //         })
    // }, [myExpenses, setMyExpenses, owner])

    // useEffect(() => {
    //     fetch(`http://localhost:5000/myexpenses?category=${category}&subcategory=${subCategory}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMyExpenses(data)
    //         })
    // }, [])


    const totalExpense = myExpenses.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    return (
        <div className='w-full shadow-2xl px-12 my-5'>
            <h2 className='text-center text-3xl text-red-500 my-8 font-serif'>My Expenses</h2>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Date</th>
                                <th>Expense Name</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                myExpenses.map((expense, index) => <tr className='hover'>
                                    <td>{index + 1}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.expense}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.subcategory}</td>
                                    <td>{expense.amount}</td>
                                    <td><button for="update-modal" className='btn btn-info btn-xs'>Approve</button></td>
                                </tr>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total Expense</th>
                                <th>{totalExpense}</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyExpenses;