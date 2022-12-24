import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProfitAccounts = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [profitAccounts, setProfitAccounts] = useState([]);

    useEffect(() => {
        fetch('https://my-accounts.onrender.com/profitAccounts')
            .then(res => res.json())
            .then(data => {
                setProfitAccounts(data);
                console.log(data);
            })
    }, [profitAccounts, setProfitAccounts])





    const onSubmit = data => {

        fetch('https://my-accounts.onrender.com/profitAccounts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Sub-Category Added')
                console.log(data);
                reset();
            })

    }

    const handleDeleteSubCategory = (id) => {
        const proceed = window.confirm('Are You Sure Want To Delete')
        if (proceed) {
            fetch(`https://my-accounts.onrender.com/profitAccounts/${id}`, {
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
            <h2 className='text-2xl font-bold text-center mt-16'>Add a Profit Accounts Name</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='container flex flex-col justify-center items-center'>
                <div class="form-control w-full max-w-xs mt-4">
                    <label class="label">
                        <span class="label-text">Profit Accounts Name</span>
                    </label>
                    <input {...register("name")} placeholder='Enter Profit Accounts Name' type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type="submit" value='Add Profit Accounts' className='btn btn-md mt-4' />
            </form>

            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Profit Account Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            profitAccounts.map((subCategory, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{subCategory.name}</td>
                                <td><button onClick={() => handleDeleteSubCategory(subCategory._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddProfitAccounts;