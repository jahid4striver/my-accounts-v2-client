import { convertToHsl } from 'daisyui/src/colors/functions';
import { format } from 'date-fns';
import { parse } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import ChequesTable from './ChequesTable'
import UpdateCheque from './UpdateCheque'



const ChequeField = ({ today }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [allCheques, setAllCheques] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [banks, setBanks] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [updateCheque, setUpdateCheque] = useState(null);

    // const lastNo = expenses?.slice(-1)[0]?.sl;
    // const lastSl = parseInt(lastNo) + 1;

    // const preloadedValues = {
    //     sl: lastSl,
    // }



    useEffect(() => {
        fetch(`https://nbcaccounts.clearsoftwares.xyz/chequeledger`)
            .then(res => res.json())
            .then(data => {
                setAllCheques(data)
            })
    }, [allCheques, setAllCheques, updateCheque, setUpdateCheque, today])

    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/subcategories')
            .then(res => res.json())
            .then(data => {
                setSubCategories(data)
            })
    }, [])
    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/banks')
            .then(res => res.json())
            .then(data => {
                setBanks(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/accounts')
            .then(res => res.json())
            .then(data => {
                setAccounts(data)
            })
    }, [])





    const onSubmit = (data) => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/chequeledger', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Cheque Added Successful')
                reset();

            })
    }



    return (
        <div className='shadow-2xl px-12 my-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 md:gird-cols-3 lg:grid-cols-7 gap-4 justify-items-center'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">SL#</span>
                    </label>
                    <input {...register("sl")} type="text" value={allCheques.length + 1} class="input text-center input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Cheque Date</span>
                    </label>
                    <input {...register("chequedate")} type="date" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Cheque No</span>
                    </label>
                    <input {...register("chequeno")} type="text" placeholder="Cheque No" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Cheque Bank</span>
                    </label>
                    <input {...register("chequebank")} type="text" placeholder="Cheque Bank" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Category</span>
                    </label>
                    <select {...register("chequecategory")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                        <option selected>Select Category</option>
                        {
                            categories.map(category => <option>{category.name}</option>)
                        }
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Sub-Category</span>
                    </label>
                    <select {...register("chequesubcategory")} class="select select-bordered w-full max-w-xs" required>
                        <option selected>Select Sub-Category</option>
                        {
                            subCategories.map(subCategory => <option>{subCategory.name}</option>)
                        }
                    </select>
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Unit</span>
                    </label>
                    <input {...register("chequeunit")} type="text" placeholder="Cheque Unit" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Amount</span>
                    </label>
                    <input {...register("chequeamount")} type="text" placeholder="Amount" class="input input-bordered w-full max-w-xs" required />
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Deposit Date</span>
                    </label>
                    <input {...register("depositdate")} type="date" class="input input-bordered w-full max-w-xs" required />
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Deposit Bank</span>
                    </label>
                    <select {...register("depositbank")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                        <option selected>Select Bank</option>
                        {
                            banks.map(bank => <option>{bank.name}</option>)
                        }
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Deposit Account</span>
                    </label>
                    <select {...register("depositaccount")} class="select select-bordered w-full max-w-xs" required>
                        <option selected>Select Account</option>
                        {
                            accounts.map(account => <option>{account.name}</option>)
                        }
                    </select>
                </div>
                <input type='submit' value='Add Cheque' className='btn btn-primary lg:mt-9' />
            </form>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Cheque Date</th>
                                <th>Cheque No</th>
                                <th>Cheque Bank</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Unit</th>
                                <th>Amount</th>
                                <th>Deposit Date</th>
                                <th>Deposit Bank</th>
                                <th>Deposit Account</th>
                                <th>User</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                allCheques.map((cheque, index) => <ChequesTable
                                    key={cheque._id}
                                    cheque={cheque}
                                    setUpdateCheque={setUpdateCheque}
                                    index={index}
                                ></ChequesTable>)
                            }
                        </tbody>
                    </table>
                </div>
                {
                    updateCheque && <UpdateCheque setUpdateCheque={setUpdateCheque} updateCheque={updateCheque}></UpdateCheque>
                }
            </div>
        </div>
    );
};

export default ChequeField;