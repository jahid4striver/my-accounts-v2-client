import React from 'react';
import { toast } from 'react-toastify';



const ChequesTable = ({cheque, setUpdateCheque, index}) => {

    const {_id, chequedate, chequeno,chequebank,chequecategory,chequesubcategory,chequeunit,chequeamount,depositdate,depositbank, depositaccount}=cheque;


    const handleDeleteCheque= ()=>{

        const proceed= window.confirm('Ary You Sure Want To Delete')

        if(proceed){
            fetch(`https://infinite-anchorage-69144.herokuapp.com/chequeledger/${_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateCheque(null)
                toast('Deleted Successful')

            })
        }
    }

    return (
        <tr className='hover'>
            <td>{index+1}</td>
            <td>{chequedate}</td>
            <td>{chequeno}</td>
            <td>{chequebank}</td>
            <td>{chequecategory}</td>
            <td>{chequesubcategory}</td>
            <td>{chequeunit}</td>
            <td>{chequeamount}</td>
            <td>{depositdate}</td>
            <td>{depositbank}</td>
            <td>{depositaccount}</td>
            <td>User</td>
            <td><label for="update-cheque-modal" onClick={()=>setUpdateCheque(cheque)} className='btn btn-primary'>Edit</label></td>
            <td><button onClick={handleDeleteCheque} className='btn btn-warning'>Delete</button></td>
        </tr>
    );
};

export default ChequesTable;