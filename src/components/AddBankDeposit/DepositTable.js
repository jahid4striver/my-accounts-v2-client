import React from 'react';
import { toast } from 'react-toastify';



const DepositTable = ({deposit, setUpdateExp, index}) => {


    const handleDeleteExpense= ()=>{

        const proceed= window.confirm('Ary You Sure Want To Delete')

        if(proceed){
            fetch(`https://my-accounts.onrender.com/deposits/${deposit._id}`, {
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
            <td>{deposit.date}</td>
            <td>{deposit.account}</td>
            <td>{deposit.amount}</td>
            <td>{deposit.profitAccounts}</td>
            <td>{deposit.description}</td>
            <td>User</td>
            <td><label for="update-modal" onClick={()=>setUpdateExp(deposit)} className='btn btn-primary btn-xs'>Edit</label></td>
            <td><button onClick={handleDeleteExpense} className='btn btn-warning btn-xs'>Delete</button></td>
        </tr>
    );
};

export default DepositTable;