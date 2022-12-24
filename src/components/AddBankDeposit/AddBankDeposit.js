import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import DepositField from './DepositField';

const AddBankDeposit = () => {
    const [date, setDate]= useState(new Date());
    return (
        <div className='mt-10'>
            <h1 className='text-3xl text-center text-green-600'>Add a Bank Deposit</h1>
            <div className='flex justify-center items-center flex-col'>
            <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            />
            <p>Today Is {format(date, "yyyy-MM-dd")}</p>
            </div>
            <DepositField date={date}></DepositField>
        </div>
    );
};

export default AddBankDeposit;