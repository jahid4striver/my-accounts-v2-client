import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <Outlet />

            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 text-base-content mt-px bg-red-200">

                    <li className=' bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addexpense'><img className='h-8' src="https://www.svgrepo.com/show/32881/cash.svg" alt="" />Add Expenses</Link></li>
                    <li className=' bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addcheque'><img className='h-8' src="https://www.svgrepo.com/show/86220/check.svg" alt="" /> Add Cheques</Link></li>
                    <li className=' bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addcash'><img className='h-8' src="https://www.svgrepo.com/show/320519/cash.svg" alt="" /> Add Cash</Link></li>

                    <div class="collapse mb-2">
                        <input type="checkbox" class="peer" />
                        <div class="collapse-title bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content flex justify-between">
                            <img className='h-6' src="https://www.svgrepo.com/show/93814/information.svg" alt="" />Add Informations <span><img src="https://www.svgrepo.com/show/368230/arrow-down.svg" alt="" /></span>
                        </div>
                        <div class="collapse-content">
                            <li className='mt-2'><Link to='/addcategories'><img src='https://www.svgrepo.com/show/356425/category.svg' alt="" /> Add Categories</Link></li>
                            <li><Link to='/addsubcategories'><img src='https://www.svgrepo.com/show/356425/category.svg' alt="" />Add Sub-Categories</Link></li>
                            <li><Link to='/addbank'><img className='h-6' src="https://www.svgrepo.com/show/71268/bank.svg" alt="" /> Add Bank Name</Link></li>
                            <li><Link to='/addaccounts'><img className='h-6' src="https://www.svgrepo.com/show/4765/bank-sign.svg" alt="" /> Add Bank Accounts</Link></li>
                            <li><Link to='/addloan'><img className='h-8' src="https://www.svgrepo.com/show/163357/loan.svg" alt="" /> Add Loan Accounts</Link></li>
                        </div>
                    </div>
                    <div class="collapse">
                        <input type="checkbox" class="peer" />
                        <div class="collapse-title bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content flex justify-left">
                            <img className='h-6 mr-2' src="https://www.svgrepo.com/show/335473/reports.svg" alt="" />Reports <span><img src="https://www.svgrepo.com/show/368230/arrow-down.svg" alt="" /></span>
                        </div>
                        <div class="collapse-content">
                            <li><Link to='/cashstatement'><img className='h-8' src='https://www.svgrepo.com/show/356425/category.svg' alt="" />Daily Cash Statement</Link></li>
                            <li className='mt-2'><Link to='/allexpenses'><img className='h-8' src='https://www.svgrepo.com/show/32881/cash.svg' alt="" /> All Expenses</Link></li>
                            <li><Link to='/categorywisereport'><img className='h-8' src='https://www.svgrepo.com/show/356425/category.svg' alt="" />Category Wise Expense</Link></li>
                        </div>
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;