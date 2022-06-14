import React, { useEffect, useState } from 'react';

const CategoryWiseReport = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])
    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/subcategories')
            .then(res => res.json())
            .then(data => {
                setSubCategories(data);
            })
    }, [])

    const handleFilteredData = e => {
        e.preventDefault();
        const category = e.target.category.value;
        const subcategory = e.target.subcategory.value;
        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;
        // console.log(startDate, endDate);
        const url = `https://infinite-anchorage-69144.herokuapp.com/filteredexpense?category=${category}&subcategory=${subcategory}&startDate=${startDate}&endDate=${endDate}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setIsLoaded(true)
                setFilteredData(data);
            })


    }

    const totalExpense = filteredData.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);

    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='mt-8 text-center text-2xl font-bold'>Category Wise Report</h2>
            <form onSubmit={handleFilteredData} className='mt-12 flex flex-col lg:flex-row justify-center items-center'>
                <div class="form-control w-full max-w-xs lg:mr-2">
                    <label class="label">
                        <span class="label-text">Starting Date</span>
                    </label>
                    <input name='startDate' type="date" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs lg:mr-2">
                    <label class="label">
                        <span class="label-text">End Date</span>
                    </label>
                    <input name='endDate' type="date" class="input input-bordered w-full max-w-xs" required />
                </div>
                <div class="form-control w-full max-w-xs lg:mr-2">
                    <label class="label">
                        <span class="label-text">Select The Category</span>
                    </label>
                    <select name='category' class="select select-bordered w-full max-w-xs">
                        {
                            categories.map(category => <option key={category._id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Select The Sub-Category</span>
                    </label>
                    <select name='subcategory' class="select select-bordered w-full max-w-xs">
                        {
                            subCategories.map(subCategory => <option key={subCategory._id}>{subCategory.name}</option>)
                        }
                    </select>
                </div>
                <input type='submit' value='Summary' className='btn btn-md mt-4 lg:mt-9 lg:ml-2' />
            </form>
            <div class="overflow-x-auto mt-8">
                <table class="table w-full">
                    {
                        isLoaded && <thead>
                            <tr>
                                <th>SL</th>
                                <th>Date</th>
                                <th>Expense Name</th>
                                <th>Category</th>
                                <th>Sub-Category</th>
                                <th>Amount</th>
                            </tr>

                        </thead>
                    }
                    <tbody>
                        {
                            filteredData.map((expense, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{expense.date}</td>
                                <td>{expense.expense}</td>
                                <td>{expense.category}</td>
                                <td>{expense.subcategory}</td>
                                <td>{expense.amount}</td>
                            </tr>)
                        }
                    </tbody>
                    {
                        isLoaded && <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total Expense</th>
                                <th>{totalExpense}</th>
                            </tr>
                        </tfoot>
                    }
                </table>
            </div>
        </div>
    );
};

export default CategoryWiseReport;