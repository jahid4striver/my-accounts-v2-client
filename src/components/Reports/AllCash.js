import React, { useEffect, useState } from 'react';
import AllCashTable from './AllCashTable';





const AllCash = () => {
    const [allCash, setAllCash] = useState([]);
    



    useEffect(() => {
        fetch(`https://nbcaccounts.clearsoftwares.xyz/dailycash`)
            .then(res => res.json())
            .then(data => {
                setAllCash(data)
            })
    }, [])

    
    const totalCash = allCash.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);


    return (
        <div className='shadow-2xl px-12 my-5'>
            <h2 className='text-center text-3xl text-red-500 my-8 font-serif'>All Cash</h2>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Date</th>
                                <th>Cash Account</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>User</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                allCash.map((cash, index) => <AllCashTable
                                    key={cash._id}
                                    cash={cash}
                                    index={index}
                                ></AllCashTable>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Total Cash</th>
                                <th>{totalCash}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllCash;