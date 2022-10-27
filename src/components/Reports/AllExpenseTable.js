import React from 'react';
import { toast } from 'react-toastify';



const AllExpenseTable = ({expense, setUpdateExp, index}) => {


    const handleDeleteExpense= ()=>{

        const proceed= window.confirm('Ary You Sure Want To Delete')

        if(proceed){
            fetch(`https://damp-ocean-49219.herokuapp.com/dailyledger/${expense._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateExp(null)
                toast('Deleted Successful')

            })
        }
    }

    return (
        <tr className='hover'>
            <td>{index+1}</td>
            <td>{expense.date}</td>
            <td>{expense.expense}</td>
            <td>{expense.category}</td>
            <td>{expense.subcategory}</td>
            <td>{expense.amount}</td>
            <td>User</td>
            <td><label for="update-modal" onClick={()=>setUpdateExp(expense)} className='btn btn-primary btn-xs'>Edit</label></td>
            <td><button onClick={handleDeleteExpense} className='btn btn-warning btn-xs'>Delete</button></td>
        </tr>
    );
};

export default AllExpenseTable;