import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddBanks= () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [banks, setBanks] = useState([]);

    useEffect(() => {
        fetch('https://nbcaccounts.clearsoftwares.xyz/banks')
            .then(res => res.json())
            .then(data => {
                setBanks(data);
                console.log(data);
            })
    }, [banks, setBanks])





    const onSubmit = data => {

        fetch('https://nbcaccounts.clearsoftwares.xyz/banks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Bank Added')
                console.log(data);
                reset();
            })

    }

    const handleDeleteBank = (id) => {
        const proceed = window.confirm('Are You Sure Want To Delete')
        if (proceed) {
            fetch(`https://nbcaccounts.clearsoftwares.xyz/banks/${id}`, {
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
            <h2 className='text-2xl font-bold text-center mt-16'>Add a New Bank</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='container flex flex-col justify-center items-center'>
                <div class="form-control w-full max-w-xs mt-4">
                    <label class="label">
                        <span class="label-text">Bank Name</span>
                    </label>
                    <input {...register("name")} placeholder='Enter Bank Name' type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type="submit" value='Add Bank' className='btn btn-md mt-4' />
            </form>

            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Bank Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            banks.map((bank, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{bank.name}</td>
                                <td><button onClick={() => handleDeleteBank(bank._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddBanks;