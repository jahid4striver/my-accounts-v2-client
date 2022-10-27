import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../Authentication/firebase.init';
import Loading from '../Shared/Loading';
import MyExpense from './MyExpense';

const MyExpenses = () => {
    const [user] = useAuthState(auth)

    const [myExpenses, setMyExpenses] = useState([]);
    const [loading, setLoading] = useState(true)
    // const [category, setCategory]= useState();
    // const [subCategory, setSubCategory]= useState();
    // const [owner, setOwner]= useState();



    // if(user.email=='owner@myaccounts.com'){
    //     setOwner('Personal');
    // }



    if (user?.email == 'hameem@myaccounts.com') {
        fetch(`https://damp-ocean-49219.herokuapp.com/myexpenses?category=Construction&subcategory=Hameem`)
            .then(res => res.json())
            .then(data => {
                setMyExpenses(data)
                setLoading(false)
            })
    }
    if (user?.email == 'owner@myaccounts.com') {
        fetch(`https://damp-ocean-49219.herokuapp.com/ownerexpenses?category=Personal`)
            .then(res => res.json())
            .then(data => {
                setMyExpenses(data)
                setLoading(false)
            })
    }

    if (loading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch(`https://damp-ocean-49219.herokuapp.com/ownerexpenses?category=${owner}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMyExpenses(data)
    //         })
    // }, [myExpenses, setMyExpenses, owner])

    // useEffect(() => {
    //     fetch(`https://damp-ocean-49219.herokuapp.com/myexpenses?category=${category}&subcategory=${subCategory}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMyExpenses(data)
    //         })
    // }, [])

    const myNewExpenses = myExpenses.filter(expense => !expense.status);

    const totalExpense = myNewExpenses.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    return (
        <div className='w-full shadow-2xl px-12 my-5'>
            <h2 className='text-center text-3xl text-red-500 my-8 font-serif'>My Expenses</h2>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full text-xs">
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
                                myNewExpenses.map((expenses, index) => <MyExpense key={expenses._id} expenses={expenses} index={index}></MyExpense>)
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