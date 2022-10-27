import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const IncomeExpense = () => {

    const [categories, setCategories] = useState([]);
    const [subcategories, setsubCategories] = useState([]);
    const [filteredExpense, setFilteredExpense] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [opening, setOpening] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    // const categoryRef= useRef('');
    const subcategoryRef = useRef();

    useEffect(() => {
        fetch('https://damp-ocean-49219.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])

    useEffect(() => {
        fetch('https://damp-ocean-49219.herokuapp.com/subcategories')
            .then(res => res.json())
            .then(data => {
                setsubCategories(data);
            })
    }, [])


    const handleFilteredData = e => {
        e.preventDefault();

        const category = e.target.category.value;
        const subcategory = e.target.subcategory.value;
        const url = `https://damp-ocean-49219.herokuapp.com/categorywiseexpense?category=${category}&subcategory=${subcategory}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setFilteredExpense(data)
                setIsLoaded(true)
            })
        const url2 = `https://damp-ocean-49219.herokuapp.com/incomeamount?chequecategory=${category}&chequesubcategory=${subcategory}`

        fetch(url2)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setFilteredIncome(data)
            })

        // const subCategoryRef = subcategoryRef?.current?.innerText;
        // console.log(subCategoryRef);







    }

    const totalExpense = filteredExpense.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);
    const totalIncome = filteredIncome.reduce((total, currentValue) => total + parseInt(currentValue.chequeamount), 0);
    const closingBalance =totalExpense-totalIncome;
    // setClosing(closingBalance);


    const filter = 'subcategory';

    const uniqueExpenses = [...new Map(filteredExpense.map(expense =>
        [expense[filter], expense])).values()];
    const uniqueIncomes = [...new Map(filteredIncome.map(income =>
        [income[filter], income])).values()];

    //     const myfunction = async () => {

    //         console.log(category);
    //     }

    // myfunction();


    // setTimeout(() => {
    //     const sub = subcategoryRef.current.innerText;
    //     const sub2 = subcategoryRef.current.innerText;
    //     console.log({ sub, sub2 });
    // }, 1000)

    // const maping= uniqueExpenses.map(e=>{
    //     const cate= e.category;
    //     const sub= e.subcategory;

    // })
    // console.log();

    // const url2= `https://damp-ocean-49219.herokuapp.com/expenseamount?category=${category}$subcategory=${subcategory}`



    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='mt-8 text-center text-2xl font-bold'>Category Wise Income-Expense</h2>
            <form onSubmit={handleFilteredData} className='mt-12 flex flex-col lg:flex-row justify-center items-center'>
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
                <div class="form-control w-full max-w-xs lg:mr-2">
                    <label class="label">
                        <span class="label-text">Select The Sub-Category</span>
                    </label>
                    <select name='subcategory' class="select select-bordered w-full max-w-xs">
                        {
                            subcategories.map(subcategory => <option key={subcategory._id}>{subcategory.name}</option>)
                        }
                    </select>
                </div>
                <input type='submit' value='Summary' className='btn btn-md mt-4 lg:mt-9 lg:ml-2' />
            </form>
            <div className='grid grid-cols-2 gap-4'>
                <div class="overflow-x-auto mt-8 text-sm">
                    <table class="table w-full text-center shadow-xl rounded-lg">
                        {
                            isLoaded && <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Category</th>
                                    <th>SubCategory</th>
                                    <th>Amount</th>
                                </tr>

                            </thead>
                        }
                        <tbody>
                            {
                                uniqueExpenses.map((expense, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.subcategory}</td>
                                    <td>{totalExpense}</td>
                                </tr>)

                            }

                        </tbody>
                        {
                            isLoaded && <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Total Expense</th>
                                    <th>{totalExpense}</th>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
                <div class="overflow-x-auto mt-8 text-sm">
                    <table class="table w-full text-center shadow-xl rounded-lg">
                        {
                            isLoaded && <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Category</th>
                                    <th>Sub-Category</th>
                                    <th>Amount</th>
                                </tr>

                            </thead>
                        }
                        <tbody>
                            {
                                uniqueIncomes.map((income, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{income.chequecategory}</td>
                                    <td>{income.chequesubcategory}</td>
                                    <td>{totalIncome}</td>
                                </tr>)
                            }
                        </tbody>
                        {
                            isLoaded && <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Total Income</th>
                                    <th>{totalIncome}</th>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            </div>
            <div class="overflow-x-auto mt-8 text-sm">
                <table class="table w-full text-center shadow-xl rounded-lg">
                    {
                        isLoaded && <tfoot>
                            <tr>
                                <th>Total Expense</th>
                                <th>{totalExpense}</th>
                                <th>Total Income</th>
                                <th>{totalIncome}</th>
                                <th>Balance</th>
                                <th>{closingBalance}</th>
                            </tr>
                        </tfoot>
                    }
                </table>
            </div>
        </div>
    );
};

export default IncomeExpense;