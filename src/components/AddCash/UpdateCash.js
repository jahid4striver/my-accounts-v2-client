import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const UpdateCash = ({ updateCash, setUpdateCash }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { _id, sl, date, account, amount, description } = updateCash;


    const onSubmit = (data) => {
        fetch(`https://infinite-anchorage-69144.herokuapp.com/dailycash/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateCash(null)
                toast('Cash Upadated Successful')

            })
    }

    return (
        <div>
            <input type="checkbox" id="update-cash-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="update-cash-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">Update : {updateCash.account}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 gap-4 justify-items-center'>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">SL</span>
                            </label>
                            <input {...register("sl")} value={sl} type="text" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Date</span>
                            </label>
                            <input {...register("date")} defaultValue={date} type="text" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Cash Account</span>
                            </label>
                            <input {...register("account")} defaultValue={account} type="text" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Amount</span>
                            </label>
                            <input {...register("amount")} defaultValue={amount} type="text" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Description</span>
                            </label>
                            <input {...register("description")} defaultValue={description} type="text" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <input type='submit' value='Update Cash' className='btn btn-primary' />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateCash;