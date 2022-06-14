import React from 'react';

const Home = () => {
    return (
        <div>
            <h2 className='text-3xl text-center text-red-500 my-8'>Welcome to My Accounts</h2>
            <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                <div class="card bg-primary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Today Expense</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-secondary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Today Income</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-accent text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Today Cheque</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-warning text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Hand Cash</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-error text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Month Expense</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-info text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Month Income</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-primary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Month Cheque</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-error text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">Bank Balance</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-secondary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Expense</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-primary text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Income</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-accent text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Cheque</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
                <div class="card bg-info text-primary-content">
                    <div class="card-body flex justify-center items-center">
                        <h2 class="card-title">This Year Profit</h2>
                        <h2 class="card-title"> 120000 Tk</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;