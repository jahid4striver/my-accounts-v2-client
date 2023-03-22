import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const UpdateModal = ({ updateExp, setUpdateExp }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { _id, sl, date, expense, category, subcategory, amount } = updateExp;


    const onSubmit = (data) => {
        fetch(`https://nbcaccounts.clearsoftwares.xyz/dailyledger/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateExp(null)
                toast('Expense Upadated Successful')

            })
    }

    return (
        <div>
            <input type="checkbox" id="update-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="update-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">Update : {updateExp.expense}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 gap-4 justify-items-center'>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">SL</span>
                            </label>
                            <input {...register("sl")} value={sl} type="text" placeholder="SL" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Date</span>
                            </label>
                            <input {...register("date")} defaultValue={date} type="text" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Expense Name</span>
                            </label>
                            <input {...register("expense")} defaultValue={expense} type="text" placeholder="Expense Name" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Category</span>
                            </label>
                            <input {...register("category")} defaultValue={category} type="text" placeholder="Category" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Sub Category</span>
                            </label>
                            <input {...register("subcategory")} defaultValue={subcategory} type="text" placeholder="Sub Category" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Amount</span>
                            </label>
                            <input {...register("amount")} defaultValue={amount} type="text" placeholder="Amount" class="input input-bordered w-full max-w-xs" />
                        </div>


                        
                       
                       
                        
                        <input type='submit' value='Update Expense' className='btn btn-primary' />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateModal;