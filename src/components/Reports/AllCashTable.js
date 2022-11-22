import React from 'react';
import { toast } from 'react-toastify';



const AllCashTable = ({cash, setUpdateCash, index}) => {


    const handleDeleteCash= ()=>{

        const proceed= window.confirm('Ary You Sure Want To Delete')

        if(proceed){
            fetch(`https://my-accounts.onrender.com/dailycash/${cash._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateCash(null)
                toast('Deleted Successful')

            })
        }
    }

    return (
        <tr className='hover'>
            <td>{index+1}</td>
            <td>{cash.date}</td>
            <td>{cash.account.replace(/_/g, ' ')}</td>
            <td>{cash.amount}</td>
            <td>{cash.description}</td>
            <td>User</td>
            <td><label for="update-cash-modal" onClick={()=>setUpdateCash(cash)} className='btn btn-primary'>Edit</label></td>
            <td><button onClick={handleDeleteCash} className='btn btn-warning'>Delete</button></td>
        </tr>
    );
};

export default AllCashTable;