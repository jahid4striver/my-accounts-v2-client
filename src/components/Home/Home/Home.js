import React, { useEffect, useState } from 'react';
import DaywiseExpenseGraph from '../../Shared/DayWiseExpenseGraph';

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [yearlyExpenses, setYearlyExpenses] = useState([]);
    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/todayexpenses')
            .then(res => res.json())
            .then(data => {
                setExpenses(data);
                console.log(data);
            })
    }, []);
    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/getcurrentmonthexpenses')
            .then(res => res.json())
            .then(data => {
                setMonthlyExpenses(data);
                console.log(data);
            })
    }, []);
    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/getmonthwiseexpenses')
            .then(res => res.json())
            .then(data => {
                setYearlyExpenses(data[0]);
                console.log(data);
            })
    }, []);

    const totalExpense =  expenses?.reduce((total, currentValue) => total + parseInt(currentValue?.amount), 0);
    const thisMonthExpense =  monthlyExpenses?.reduce((total, currentValue) => total + parseInt(currentValue?.expense), 0);

    return (
        <div>
            <h2 className='text-3xl text-center text-red-500 my-8'>Welcome to My Accounts</h2>
            <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 '>
                <div class="card bg-primary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Today Expense</h2>
                        <h2 class="card-title">{totalExpense} Tk</h2>
                    </div>
                </div>
                {/* <div class="card bg-secondary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Today Income</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                
                {/* <div class="card bg-warning text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Hand Cash</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                <div class="card bg-error text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Month Expense</h2>
                        <h2 class="card-title">{thisMonthExpense} Tk</h2>
                    </div>
                </div>
                <div class="card bg-secondary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Expense</h2>
                        <h2 class="card-title">{yearlyExpenses?.totalExpense} Tk</h2>
                    </div>
                </div>
                {/* <div class="card bg-info text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Month Income</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                {/* <div class="card bg-accent text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Today Cheque</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-primary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Month Cheque</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                {/* <div class="card bg-error text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Bank Balance</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                
                {/* <div class="card bg-primary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Income</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                {/* <div class="card bg-accent text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Cheque</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
                {/* <div class="card bg-info text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Profit</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div> */}
            </div>

            <div className='w-11/12 mx-auto'>
            <DaywiseExpenseGraph/>
            </div>
        </div>
    );
};

export default Home;