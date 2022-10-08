import React from 'react';
import { toast } from 'react-toastify';

const MyExpense = ({expenses, index}) => {
const {_id, date, expense, category,subcategory, amount}= expenses;

    const handleExpenseStatus = (id, updateExpense) => {
        const status = 'Approved';

        const finalExpenses = {status };

        fetch(`https://infinite-anchorage-69144.herokuapp.com/finalexpense/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(finalExpenses)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Expense Approved')
                console.log(data);
            })

    }
    return (
            <tr className='hover'>
                <td>{index + 1}</td>
                <td>{date}</td>
                <td>{expense}</td>
                <td>{category}</td>
                <td>{subcategory}</td>
                <td>{amount}</td>
                <td><button onClick={() => handleExpenseStatus(_id)} className='btn btn-info btn-xs'>Approve</button></td>
            </tr>)
};

export default MyExpense;