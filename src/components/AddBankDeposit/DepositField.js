import { convertToHsl } from 'daisyui/src/colors/functions';
import { format } from 'date-fns';
import { parse } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import DepositTable from './DepositTable';
import UpdateModal from './UpdateModal';



const DepositField = ({ date }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [allDeposits, setAllDeposits] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [profitAccounts, setProfitAccounts] = useState([]);
    const [updateExp, setUpdateExp] = useState(null);

    // const lastNo = expenses?.slice(-1)[0]?.sl;
    // const lastSl = parseInt(lastNo) + 1;

    // const preloadedValues = {
    //     sl: lastSl,
    // }



    const formatedDate = format(date, "yyyy-MM-dd");

    useEffect(() => {
        fetch(`https://my-accounts.onrender.com/deposits`)
            .then(res => res.json())
            .then(data => {
                setDeposits(data)
            })
    }, [deposits, setDeposits, updateExp, setUpdateExp, formatedDate])

    useEffect(() => {
        fetch(`https://my-accounts.onrender.com/deposits`)
            .then(res => res.json())
            .then(data => {
                setAllDeposits(data)
            })
    }, [deposits, setDeposits, updateExp, setUpdateExp, formatedDate])

    useEffect(() => {
        fetch('https://my-accounts.onrender.com/accounts')
            .then(res => res.json())
            .then(data => {
                const onlyAccounts= data.filter(account=> !account.name.includes('Office Cash'))
                setAccounts(onlyAccounts)
            })
    }, [])
    useEffect(() => {
        fetch('https://my-accounts.onrender.com/profitAccounts')
            .then(res => res.json())
            .then(data => {
                setProfitAccounts(data)
            })
    }, [])


    const onSubmit = (data) => {
        fetch('https://my-accounts.onrender.com/deposits', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Deposit Added Successful')
                reset();

            })
    }

    const totalExpense = deposits.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    return (
        <div className='shadow-2xl px-12 my-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 md:gird-cols-3 lg:grid-cols-7 gap-4 justify-items-center'>
                <input {...register("sl")} type="text" value={allDeposits.length + 1} class="input text-center input-bordered w-full max-w-xs" required />
                <input {...register("date")} type="text" value={formatedDate} class="input input-bordered w-full max-w-xs" required />
                <select {...register("account")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                    <option selected>Select Accounts</option>
                    {
                        accounts.map(category => <option>{category.name}</option>)
                    }
                </select>
               
                <input {...register("amount")} type="text" placeholder="Amount" class="input input-bordered w-full max-w-xs" required />
                <select {...register("profitAccounts")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                    <option selected>Select Profit Accounts</option>
                    {
                        profitAccounts.map(accounts => <option>{accounts.name}</option>)
                    }
                </select>
                <div class="form-control w-full max-w-xs">
                    <input {...register("description")} type="text" placeholder="Month/Details" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type='submit' value='Add Deposit' className='btn btn-primary' />
            </form>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Date</th>
                                <th>Accounts Name</th>
                                <th>Amount</th>
                                <th>Profit Accounts</th>
                                <th>Month/Details</th>
                                <th>User</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                deposits.map((deposit, index) => <DepositTable
                                    key={deposit._id}
                                    deposit={deposit}
                                    setUpdateExp={setUpdateExp}
                                    index={index}
                                ></DepositTable>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Total Expense</th>
                                <th>{totalExpense}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {
                    updateExp && <UpdateModal setUpdateExp={setUpdateExp} updateExp={updateExp}></UpdateModal>
                }
            </div>
        </div>
    );
};

export default DepositField;