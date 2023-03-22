import React, { useEffect, useState } from 'react';
import AllExpenseTable from './AllExpenseTable';
import UpdateModal from '../AddExpense/UpdateModal';



const AllExpenses = () => {
    const [allExpenses, setAllExpenses] = useState([]);
    const [updateExp, setUpdateExp] = useState(null);

    useEffect(() => {
        fetch(`https://nbcaccounts.clearsoftwares.xyz/dailyledger`)
            .then(res => res.json())
            .then(data => {
                setAllExpenses(data)
            })
    }, [allExpenses, setAllExpenses])

    
    const totalExpense = allExpenses.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    return (
        <div className='shadow-2xl px-12 my-5'>
            <h2 className='text-center text-3xl text-red-500 my-8 font-serif'>All Expenses</h2>
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

                                allExpenses.map((expense, index) => <AllExpenseTable
                                    key={expense._id}
                                    expense={expense}
                                    index={index}
                                ></AllExpenseTable>)
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
                    updateExp && <UpdateModal setUpdateExp={setUpdateExp} updateExp={updateExp}></UpdateModal>
                }
            </div>
        </div>
    );
};

export default AllExpenses;