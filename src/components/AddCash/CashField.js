import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import CashTable from './CashTable';
import UpdateCash from './UpdateCash';




const CashField = ({ date }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [allCash, setAllCash] = useState([]);
    const [cashes, setCashes] = useState([]);
    const [banks, setBanks] = useState([]);
    const [loans, setLoans] = useState([]);
    const [updateCash, setUpdateCash] = useState(null);



    const formatedDate = format(date, "yyyy-MM-dd");

    useEffect(() => {
        fetch(`https://infinite-anchorage-69144.herokuapp.com/todaycash?date=${formatedDate}`)
            .then(res => res.json())
            .then(data => {
                setCashes(data)
            })
    }, [cashes, setCashes, updateCash, setUpdateCash, formatedDate])

    useEffect(() => {
        fetch(`https://infinite-anchorage-69144.herokuapp.com/dailycash`)
            .then(res => res.json())
            .then(data => {
                setAllCash(data)
            })
    }, [cashes, setCashes, updateCash, setUpdateCash, formatedDate])

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/accounts')
            .then(res => res.json())
            .then(data => {
                setBanks(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/loanaccounts')
            .then(res => res.json())
            .then(data => {
                setLoans(data)
            })
    }, [])





    const onSubmit = (data) => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/dailycash', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Cash Added Successful')
                reset();

            })
    }

    const totalCash = cashes.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    return (
        <div className='shadow-2xl px-12 my-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 md:gird-cols-3 lg:grid-cols-6 gap-4 justify-items-center'>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">SL#</span>
                    </label>
                    <input {...register("sl")} type="text" value={allCash.length + 1} class="input text-center input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Date</span>
                    </label>
                    <input {...register("date")} type="text" value={formatedDate} class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Select Cash Account</span>
                    </label>
                    <select {...register("account")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                        <option selected>Select Account</option>
                        {
                            banks.map(bank => <option>{bank.name}</option>)
                        }
                        {
                            loans.map(loan => <option>{loan.name}</option>)
                        }
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Amount</span>
                    </label>
                    <input {...register("amount")} type="text" placeholder="Amount" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <input {...register("description")} type="text" placeholder="Cash Description" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type='submit' value='Add Cash' className='btn btn-primary lg:mt-9' />
            </form>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Date</th>
                                <th>Cash Account</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>User</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                cashes.map((cash, index) => <CashTable
                                    key={cash._id}
                                    cash={cash}
                                    setUpdateCash={setUpdateCash}
                                    index={index}
                                ></CashTable>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Total Cash</th>
                                <th>{totalCash}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {
                    updateCash && <UpdateCash setUpdateCash={setUpdateCash} updateCash={updateCash}></UpdateCash>
                }
            </div>
        </div>
    );
};

export default CashField;