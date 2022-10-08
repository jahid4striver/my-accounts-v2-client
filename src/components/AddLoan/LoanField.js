import { convertToHsl } from 'daisyui/src/colors/functions';
import { format } from 'date-fns';
import { parse } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import LoanTable from './LoanTable';
import UpdateLoan from './UpdateLoan';



const LoanField = ({ date }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [allExpenses, setAllExpenses] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loanAccounts, setLoanAccounts] = useState([]);
    const [updateExp, setUpdateExp] = useState(null);

    // const lastNo = expenses?.slice(-1)[0]?.sl;
    // const lastSl = parseInt(lastNo) + 1;

    // const preloadedValues = {
    //     sl: lastSl,
    // }



    const formatedDate = format(date, "yyyy-MM-dd");

    useEffect(() => {
        fetch(`https://infinite-anchorage-69144.herokuapp.com/todayledger?date=${formatedDate}`)
            .then(res => res.json())
            .then(data => {
                setExpenses(data)
            })
    }, [expenses, setExpenses, updateExp, setUpdateExp, formatedDate])

    useEffect(() => {
        fetch(`https://infinite-anchorage-69144.herokuapp.com/dailyledger`)
            .then(res => res.json())
            .then(data => {
                setAllExpenses(data)
            })
    }, [expenses, setExpenses, updateExp, setUpdateExp, formatedDate])

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://infinite-anchorage-69144.herokuapp.com/subcategories')
            .then(res => res.json())
            .then(data => {
                setSubCategories(data)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/loanaccountsgiven')
            .then(res => res.json())
            .then(data => {
                setLoanAccounts(data)
            })
    }, [])





    const onSubmit = (data) => {
        
        const sl= data.sl;
        const date= data.date;
        const expense= data.expense.replace(/ /g,"_");
        const category= data.category;
        const subcategory= data.subcategory;
        const amount= data.amount;

const alldata= {sl, date, expense, category, subcategory, amount};

console.log(alldata);

        fetch('https://infinite-anchorage-69144.herokuapp.com/dailyledger', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(alldata)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Expense Added Successful')
                reset();

            })
    }

    const totalExpense= expenses.reduce((total, currentValue)=>total+ parseInt(currentValue.amount),0);
   

    return (
        <div className='shadow-2xl px-12 my-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 grid grid-cols-1 md:gird-cols-3 lg:grid-cols-7 gap-4 justify-items-center'>
                <input {...register("sl")} type="text" value={allExpenses.length + 1} class="input text-center input-bordered w-full max-w-xs" required />
                <input {...register("date")} type="text" value={formatedDate} class="input input-bordered w-full max-w-xs" required />
                <select {...register("expense")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                    <option selected>Select Category</option>
                    {
                        loanAccounts.map(loan => <option>{loan.name}</option>)
                    }
                </select>

                <select {...register("category")} defaultValue='' class="select select-bordered w-full max-w-xs" required>
                    <option selected>Select Category</option>
                    {
                        categories.map(category => <option>{category.name}</option>)
                    }
                </select>
                <select {...register("subcategory")} class="select select-bordered w-full max-w-xs" required>
                    <option  selected>Select Sub-Category</option>
                    {
                        subCategories.map(subCategory => <option>{subCategory.name}</option>)
                    }
                </select>
                <input {...register("amount")} type="text" placeholder="Amount" class="input input-bordered w-full max-w-xs" required />
                <input type='submit' value='Add Expense' className='btn btn-primary' />
            </form>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Date</th>
                                <th>Expense Name</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Amount</th>
                                <th>User</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                expenses.map((expense, index) => <LoanTable
                                    key={expense._id}
                                    expense={expense}
                                    setUpdateExp={setUpdateExp}
                                    index={index}
                                ></LoanTable>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total Expense</th>
                                <th>{totalExpense}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {
                    updateExp && <UpdateLoan setUpdateExp={setUpdateExp} updateExp={updateExp}></UpdateLoan>
                }
            </div>
        </div>
    );
};

export default LoanField;