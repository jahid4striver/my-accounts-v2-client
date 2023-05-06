import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SiExpensify } from 'react-icons/si';
import { FcDebt } from 'react-icons/fc';
import { GiTakeMyMoney } from 'react-icons/gi';
import { AiFillBank } from 'react-icons/ai';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { GiCash } from 'react-icons/gi';
import { BsInfoCircle } from 'react-icons/bs';
import { TbCategory } from 'react-icons/tb';
import { MdOutlineCategory } from 'react-icons/md';
import { SiBankofamerica } from 'react-icons/si';
import { GiProfit } from 'react-icons/gi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { MdOutlineArrowDropUp } from 'react-icons/md';
import { useState } from 'react';


const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    console.log(open);
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <Outlet />

            </div>
            <div class="drawer-side bg-red-200">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 text-base-content mt-px bg-red-200 h-max">

                    <li className=' bg-blue-400 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addexpense'><SiExpensify className='text-2xl' />Add Expenses</Link></li>
                    <li className=' bg-blue-400 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addloan'><FcDebt className='text-2xl' />Add Loan Expenses</Link></li>
                    <li className=' bg-blue-400 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addsalary'><GiTakeMyMoney className='text-xl' />Add Advance Salarys</Link></li>
                    <li className=' bg-blue-400 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/adddeposit'><AiFillBank className='text-2xl' />Add Bank Deposit</Link></li>
                    <li className=' bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addcheque'><HiOutlineBanknotes className='text-2xl' /> Add Cheques</Link></li>
                    <li className=' bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content mb-2'><Link to='/addcash'><GiCash className='text-2xl' /> Add Cash</Link></li>

                    <div class="collapse mb-2">
                        <input onClick={() => setOpen2(!open2)} type="checkbox" class="peer" />
                        <div class="collapse-title bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content flex justify-left">
                            <BsInfoCircle className='text-2xl mr-2.5' />Add Informations{open2 ? <span><MdOutlineArrowDropDown className='text-2xl' /></span> : <span><MdOutlineArrowDropUp className='text-2xl' /></span>}
                        </div>
                        <div class="collapse-content">
                            <li className='mt-2'><Link to='/addcategories'><TbCategory className='text-2xl' />Add Categories</Link></li>
                            <li><Link to='/addsubcategories'><MdOutlineCategory className='text-2xl' />Add Sub-Categories</Link></li>
                            <li><Link to='/addbank'><AiFillBank className='text-2xl' />Add Bank Name</Link></li>
                            <li><Link to='/addaccounts'><SiBankofamerica className='text-2xl' />Add Bank Accounts</Link></li>
                            <li><Link to='/addprofits'><GiProfit className='text-2xl' />Add Profit Accounts</Link></li>
                            <li><Link to='/addloangiven'><FcDebt className='text-2xl' />Add Loan Accounts</Link></li>
                            <li><Link to='/addloantaken'><FcDebt className='text-2xl' />Add Loan Taken Accounts</Link></li>
                            <li><Link to='/addsalarygiven'><GiTakeMyMoney className='text-2xl' />Add Advance Salary Accounts</Link></li>
                        </div>
                    </div>
                    <div class="collapse">
                        <input onClick={() => setOpen(!open)} type="checkbox" class="peer" />
                        <div class="collapse-title bg-red-300 peer-checked:bg-red-400 peer-checked:text-secondary-content flex justify-left">
                            <HiOutlineDocumentReport className='text-2xl mr-2' />Reports {open ? <span><MdOutlineArrowDropDown className='text-2xl' /></span> : <span><MdOutlineArrowDropUp className='text-2xl' /></span>}
                        </div>
                        <div class="collapse-content">
                            <li><Link to='/cashstatement'><GiCash className='text-2xl' />Daily Cash Statement</Link></li>
                            <li><Link to='/currentbalance'><MdOutlineAccountBalanceWallet className='text-2xl' />Current Balance</Link></li>
                            <li><Link to='/categorywisebalance'><TbCategory className='text-2xl' />CategoryWise Balance</Link></li>
                            <li className='mt-2'><Link to='/allexpenses'><SiExpensify className='text-2xl' />All Expenses</Link></li>
                            <li className='mt-2'><Link to='/allcash'><GiCash className='text-2xl' />All Cash</Link></li>
                            <li className='mt-2'><Link to='/chequereport'><HiOutlineBanknotes className='text-2xl' />Category Wise Cheques</Link></li>
                            <li><Link to='/categorywisereport'><SiExpensify className='text-2xl' />Category Wise Expense</Link></li>
                            <li><Link to='/incomeexpense'><TbCategory className='text-2xl' />Income Expense Category Report</Link></li>
                            <li><Link to='/loangivenreturn'><FcDebt className='text-2xl' />Loan Given Return Report</Link></li>
                            <li><Link to='/loanbalance'><FcDebt className='text-2xl' />Loan Balance Sheet</Link></li>
                            <li><Link to='/advancesalaryreport'><GiTakeMyMoney className='text-2xl' />Advance Salary Report</Link></li>
                            <li><Link to='/bankstatement'><AiFillBank className='text-2xl' />Bank Statement</Link></li>
                        </div>
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;