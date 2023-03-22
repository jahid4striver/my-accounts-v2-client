import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddLoanTakenAccount = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [loanAccounts, setLoanAccounts] = useState([]);

    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/loanaccounts')
            .then(res => res.json())
            .then(data => {
                setLoanAccounts(data);
                console.log(data);
            })
    }, [loanAccounts])


    const onSubmit = data => {

        fetch('https://nbcaccounts.clearsoftwares.xyz/loanaccounts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Loan Taken Accounts Added')
                console.log(data);
                reset();
            })

    }

    const handleDeleteLoanAccount = (id) => {
        const proceed = window.confirm('Are You Sure Want To Delete')
        if (proceed) {
            fetch(`https://nbcaccounts.clearsoftwares.xyz/loanaccounts/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Delete Successful')
                    console.log(data);
                })
        }
    }
    return (
        <div className='container mx-auto w-11/12'>
           <div> <h2 className='text-2xl font-bold text-center mt-16'>Add a New Loan Taken Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='container flex flex-col justify-center items-center'>
                <div class="form-control w-full max-w-xs mt-4">
                    <label class="label">
                        <span class="label-text">Loan Account Name</span>
                    </label>
                    <input {...register("name")} placeholder='Enter Loan Account Name' type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type="submit" value='Add Loan Account' className='btn btn-md mt-4' />
            </form>
            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Loan Account Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loanAccounts.map((loanAccount, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{loanAccount.name}</td>
                                <td><button onClick={() => handleDeleteLoanAccount(loanAccount._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div></div>
        </div>
    );
};

export default AddLoanTakenAccount;