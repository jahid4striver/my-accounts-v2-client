import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddSubCategories = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/subcategories')
            .then(res => res.json())
            .then(data => {
                setSubCategories(data);
                console.log(data);
            })
    }, [subCategories, setSubCategories])





    const onSubmit = data => {

        fetch('https://infinite-anchorage-69144.herokuapp.com/subcategories', {
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
            fetch(`https://infinite-anchorage-69144.herokuapp.com/subcategories/${id}`, {
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
            <h2 className='text-2xl font-bold text-center mt-16'>Add a New Sub-Category</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='container flex flex-col justify-center items-center'>
                <div class="form-control w-full max-w-xs mt-4">
                    <label class="label">
                        <span class="label-text">Sub-Category Name</span>
                    </label>
                    <input {...register("name")} placeholder='Enter Sub-Category Name' type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type="submit" value='Add Sub-Category' className='btn btn-md mt-4' />
            </form>

            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Sub-Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subCategories.map((subCategory, index) => <tr>
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

export default AddSubCategories;