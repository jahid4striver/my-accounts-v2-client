import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const CashStatement = () => {

    const [filteredExpense, setFilteredExpense] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [opening, setOpening]= useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const lastdayRef= useRef('');
    const closingRef= useRef();





    const handleFilteredData = e => {
        e.preventDefault();
        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;

        const url = `https://nbcaccounts.clearsoftwares.xyz/onlyexpense?startDate=${startDate}&endDate=${endDate}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsLoaded(true)
                setFilteredExpense(data);
            })

        const url2 = `https://nbcaccounts.clearsoftwares.xyz/onlyincome?startDate=${startDate}&endDate=${endDate}`

        fetch(url2)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsLoaded(true)
                setFilteredIncome(data);
            })

            let today= new Date(startDate)
            today.setDate(today.getDate()-1)
            const yesterday = format(today, "yyyy-MM-dd");

        const url3=`https://nbcaccounts.clearsoftwares.xyz/yesterdaycash?date=${yesterday}`
        console.log(url3);
        fetch(url3)
        .then(res=> res.json())
        .then(data=> {
            console.log(data);
            setOpening(data);
            
        });

      

    }

    const totalExpense = filteredExpense.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);
    const totalIncome = filteredIncome.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);
    const openingBalance = opening.cash;
    const closingBalance= openingBalance+totalIncome-totalExpense;
    // setClosing(closingBalance);



    const  handleSaveForTomorrow=(e)=>{
    
        const date= lastdayRef.current.value;
        const lastCash= closingRef?.current?.innerText;
        const cash= parseInt(lastCash);
        const closingBalance= {date, cash};

        fetch(`https://nbcaccounts.clearsoftwares.xyz/handcash?date=${date}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(closingBalance)
        })
        .then(res=> res.json())
        .then(data=>{
            toast('Cash Saved For Tomorrow')
            console.log(data);
        })



        // const today= new Date(lastday);
        // today.setDate(today.getDate()+1);
        // const tomorrow= format(today, "yyyy-MM-dd");
        // console.log(tomorrow);
    }

    
    

    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='mt-8 text-center text-2xl font-bold'>Daily Cash Statement Report</h2>
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
                    <input ref={lastdayRef} name='endDate' type="date" class="input input-bordered w-full max-w-xs" required />
                </div>
                <input type='submit' value='Show Statement' className='btn btn-md mt-4 lg:mt-9 lg:ml-2' />
            </form>
            <div className='grid grid-cols-2 gap-4'>
                <div class="overflow-x-auto mt-8 text-sm">
                    <table class="table w-full text-center shadow-xl rounded-lg">
                        {
                            isLoaded && <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Date</th>
                                    <th>Expense Name</th>
                                    <th>Amount</th>
                                </tr>

                            </thead>
                        }
                        <tbody>
                            {
                                filteredExpense.map((expense, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.expense}</td>
                                    <td>{expense.amount}</td>
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
                                    <th>Date</th>
                                    <th>Income Name</th>
                                    <th>Amount</th>
                                </tr>

                            </thead>
                        }
                        <tbody>
                            {
                                filteredIncome.map((income, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{income.date}</td>
                                    <td>{income.account}</td>
                                    <td>{income.amount}</td>
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
                                <th>Opening Balance</th>
                                <th>{openingBalance}</th>
                                <th>Total Income</th>
                                <th>{totalIncome}</th>
                                <th>Total Expense</th>
                                <th>{totalExpense}</th>
                                <th>Balance</th>
                                <th ref={closingRef}>{closingBalance}</th>
                                <th><button onClick={handleSaveForTomorrow} className='btn btn-sm btn-warning'>Save</button></th>
                            </tr>
                        </tfoot>
                    }
                </table>
            </div>
        </div>
    );
};

export default CashStatement;