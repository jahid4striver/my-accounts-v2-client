import React, { useEffect, useState } from 'react';

const BankStatement = () => {

    const [bankName, setBankName] = useState([]);
    const [bankDeposit, setBankDeposit] = useState([]);
    const [bankWithdraw, setBankWithdraw] = useState([]);
    const [cashDeposit, setCashDeposit] = useState([]);
    const [opening, setOpening] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)



    const newArray = bankDeposit.map((
        { chequeamount: chequeamount, chequebank: chequebank, chequecategory: chequecategory, chequeno: chequeno,
            chequedate: chequedate, chequesubcategory: chequesubcategory, chequeunit: chequeunit,
            depositaccount: depositaccount, depositbank: depositbank, depositdate: date, sl: sl,
            _id: _id }) => (

        {
            chequeamount, chequebank, chequecategory, chequeno, chequedate, chequesubcategory, chequeunit, depositaccount, depositbank
            , date, sl, _id
        }));
    const newArray2= cashDeposit.map((
        { amount: chequeamount,
            account: depositaccount, date: date, sl: sl,
            _id: _id, description:description, profitAccounts:profitAccounts }) => (

        {
            chequeamount, depositaccount, date, description, profitAccounts
            , sl, _id
        }));

    const joinArray = newArray.concat(newArray2);
    const joinArray2 = joinArray.concat(bankWithdraw);


    // const sorted= joinArray.sort((a,b)=> a.date-b.date)
    const sorted = joinArray2.sort(function (a, b) {
        return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
    });

    console.log(sorted);
    // const options = [
    //     { value: "chocolate", label: "Chocolate" },
    //     { value: "strawberry", label: "Strawberry" },
    //     { value: "vanilla", label: "Vanilla" },
    //   ];

    //   const columns = options.map(({ value: name, label: title }) => ({
    //     name,
    //     title,
    //   }));


    useEffect(() => {
        fetch('https://my-accounts.onrender.com/accounts')
            .then(res => res.json())
            .then(data => {
                setBankName(data);
            })
    }, [])

    const handleFilteredData = e => {
        e.preventDefault();
        const bankName = e.target.bankName.value;
        // const loanReturn = category.slice(0, -6);
        const url = `https://my-accounts.onrender.com/chequeledger`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const onlyBankDeposit = data.filter(bank => bank.depositaccount.includes(bankName))
                setBankDeposit(onlyBankDeposit)
                setIsLoaded(true)
            })
        const url2 = `https://my-accounts.onrender.com/loanreturnreport`

        fetch(url2)
            .then(res => res.json())
            .then(data => {
                const onlyBankWithdraw = data.filter(cash => cash.account.includes(bankName))
                setBankWithdraw(onlyBankWithdraw)
            })

        const url3 = `https://my-accounts.onrender.com/deposits`
        fetch(url3)
            .then(res => res.json())
            .then(data => {
                const onlyCashDeposits = data.filter(deposit => deposit.account.includes(bankName))
                console.log(onlyCashDeposits);
                setCashDeposit(onlyCashDeposits)
            })
        const url4 = `https://my-accounts.onrender.com/accounts`
        fetch(url4)
            .then(res => res.json())
            .then(data => {
                const openingBalance = data.filter(account => account.name.includes(bankName))
                setOpening(openingBalance)
            })
    }
    const openingBl = parseInt(opening[0]?.opening);
    const totalDeposit = joinArray.reduce((total, currentValue) => total + parseInt(currentValue.chequeamount), 0);
    const totalWithdraw = bankWithdraw.reduce((total, currentValue) => total + parseInt(currentValue.amount), 0);
    const closingBalance = openingBl + totalDeposit - totalWithdraw;
    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='mt-8 text-center text-2xl font-bold'>Bank Statement</h2>
            <form onSubmit={handleFilteredData} className='mt-12 flex flex-col lg:flex-row justify-center items-center'>
                <div class="form-control w-full max-w-xs lg:mr-2">
                    <label class="label">
                        <span class="label-text">Select The Bank</span>
                    </label>
                    <select name='bankName' class="select select-bordered w-full max-w-xs">
                        {
                            bankName.map(category => <option key={category._id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <input type='submit' value='Summary' className='btn btn-md mt-4 lg:mt-9 lg:ml-2' />
            </form>
            {/* grid grid-cols-2 gap-4 */}
            <div className=''>
                <div class="overflow-x-auto mt-8 text-sm">
                    <table class="table w-full text-center shadow-xl rounded-lg border-2 ">
                        {
                            isLoaded && <thead className='border-2'>
                                <tr className='border-2'>
                                    <th className='border-2'>SL</th>
                                    <th className='border-2'>Date</th>
                                    <th className='border-2'>Unit</th>
                                    <th className='border-2'>Deposit</th>
                                    <th className='border-2'>Withdraw</th>
                                    <th className='border-2'>Cheque No/Description</th>
                                </tr>

                            </thead>
                        }
                        <tbody className='border-2'>
                            {
                                sorted.map((deposit, index) => <tr className='border-2'>
                                    <td className='border-2'>{index + 1}</td>
                                    <td className='border-2'>{deposit.date}</td>
                                    <td className='border-2'>{deposit.chequeunit ? deposit.chequeunit : "-"}</td>
                                    <td className='border-2'>{!deposit.amount ? deposit.chequeamount : '-'}</td>
                                    <td className='border-2'>{!deposit.chequeamount ? deposit.amount : '-'}</td>
                                    <td className='border-2'>{deposit.chequeno ? deposit.chequeno : deposit.description}</td>
                                </tr>)

                            }

                        </tbody>
                        {
                            isLoaded && <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Total</th>
                                    <th>{totalDeposit}</th>
                                    <th>{totalWithdraw}</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
                {/* <div class="overflow-x-auto mt-8 text-sm">
                    <table class="table w-full text-center shadow-xl rounded-lg">
                        {
                            isLoaded && <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Date</th>
                                    <th>Cheque No</th>
                                    <th>Amount</th>
                                </tr>

                            </thead>
                        }
                        <tbody>
                            {
                                bankWithdraw.map((cash, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{cash.date}</td>
                                    <td>{cash.account}</td>
                                    <td>{cash.amount}</td>
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
                </div> */}
            </div>
            <div class="overflow-x-auto mt-2 text-sm">
                <table class="table w-full text-center shadow-xl rounded-lg">
                    {
                        isLoaded && <tfoot>
                            <tr>
                                <th>Opening Balance</th>
                                <th>{openingBl}</th>
                                <th>Total Deposit</th>
                                <th>{totalDeposit}</th>
                                <th>Total Withdraw</th>
                                <th>{totalWithdraw}</th>
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

export default BankStatement;