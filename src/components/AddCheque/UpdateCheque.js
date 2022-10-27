import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const UpdateCheque = ({ updateCheque, setUpdateCheque }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const {_id, sl, chequedate, chequeno,chequebank,chequecategory,chequesubcategory,chequeunit,chequeamount,depositdate,depositbank, depositaccount}=updateCheque;


    const onSubmit = (data) => {
        fetch(`https://damp-ocean-49219.herokuapp.com/chequeledger/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateCheque(null)
                toast('Cheque Upadated Successful')

            })
    }

    return (
        <div>
            <input type="checkbox" id="update-cheque-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="update-cheque-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">Update :{}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 gap-4 justify-items-center'>
                    <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">SL#</span>
                    </label>
                    <input {...register("sl")} type="text" value={sl} class="input text-center input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Cheque Date</span>
                    </label>
                    <input {...register("chequedate")} defaultValue={chequedate} type="date" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Cheque No</span>
                    </label>
                    <input {...register("chequeno")} type="text" defaultValue={chequeno} class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Cheque Bank</span>
                    </label>
                    <input {...register("chequebank")} type="text" defaultValue={chequebank} class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Category</span>
                    </label>
                    <input {...register("chequecategory")} type="text" defaultValue={chequecategory} class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Sub-Category</span>
                    </label>
                    <input {...register("chequesubcategory")} type="text" defaultValue={chequesubcategory} class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Unit</span>
                    </label>
                    <input {...register("chequeunit")} type="text" defaultValue={chequeunit} class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Amount</span>
                    </label>
                    <input {...register("chequeamount")} type="text" defaultValue={chequeamount} class="input input-bordered w-full max-w-xs" required />
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Deposit Date</span>
                    </label>
                    <input {...register("depositdate")} defaultValue={depositdate} type="date" class="input input-bordered w-full max-w-xs" required />
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Deposit Bank</span>
                    </label>
                    <input {...register("depositbank")} defaultValue={depositbank} type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Deposit Account</span>
                    </label>
                    <input {...register("depositaccount")} defaultValue={depositaccount} type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type='submit' value='Update Cheque' className='btn btn-primary lg:mt-9' />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateCheque;