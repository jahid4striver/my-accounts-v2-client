import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddAccounts = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetch('https://my-accounts.onrender.com/accounts')
            .then(res => res.json())
            .then(data => {
                setAccounts(data);
                console.log(data);
            })
    }, [accounts, setAccounts])





    const onSubmit = data => {

        fetch('https://my-accounts.onrender.com/accounts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Account Added')
                console.log(data);
                reset();
            })

    }

    const handleDeleteAccount = (id) => {
        const proceed = window.confirm('Are You Sure Want To Delete')
        if (proceed) {
            fetch(`https://my-accounts.onrender.com/accounts/${id}`, {
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
        <div className='container mx-auto'>
            <h2 className='text-2xl font-bold text-center mt-16'>Add a New Bank Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='container flex lg:flex-row flex-col justify-center items-center'>
                <div class="form-control w-full max-w-xs mt-4 lg:mr-2">
                    <label class="label">
                        <span class="label-text">Bank Account Name</span>
                    </label>
                    <input {...register("name")} placeholder='Enter Bank Account Name' type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs mt-4 lg:mr-2">
                    <label class="label">
                        <span class="label-text">Opening Balance</span>
                    </label>
                    <input {...register("opening")} placeholder='Enter Opening Balance' type="number" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type="submit" value='Add Bank Account' className='btn btn-md mt-4 lg:mt-12' />
            </form>

            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Bank Account Name</th>
                            <th>Opening Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accounts.map((account, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{account.name}</td>
                                <td>{account.opening}</td>
                                <td><button onClick={() => handleDeleteAccount(account._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddAccounts;