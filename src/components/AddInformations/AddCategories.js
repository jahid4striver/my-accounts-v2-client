import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCategories = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                console.log(data);
            })
    }, [categories])





    const onSubmit = data => {

        fetch('https://infinite-anchorage-69144.herokuapp.com/categories', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Category Added')
                console.log(data);
                reset();
            })

    }

    const handleDeleteCategory = (id) => {
        const proceed = window.confirm('Are You Sure Want To Delete')
        if (proceed) {
            fetch(`https://infinite-anchorage-69144.herokuapp.com/categories/${id}`, {
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
            <h2 className='text-2xl font-bold text-center mt-16'>Add a New Category</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='container flex flex-col justify-center items-center'>
                <div class="form-control w-full max-w-xs mt-4">
                    <label class="label">
                        <span class="label-text">Category Name</span>
                    </label>
                    <input {...register("name")} placeholder='Enter Category Name' type="text" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type="submit" value='Add Category' className='btn btn-md mt-4' />
            </form>

            <div class="overflow-x-auto mt-8">
                <table class="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td><button onClick={() => handleDeleteCategory(category._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddCategories;