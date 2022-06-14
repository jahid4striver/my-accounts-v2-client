import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import CashField from './CashField';

const AddCash = () => {
    const [date, setDate]= useState(new Date());
    return (
        <div className='mt-10'>
            <h1 className='text-3xl text-center text-green-600'>Add a New Cash</h1>
            <div className='flex justify-center items-center flex-col'>
            <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            />
            <p>Today Is {format(date, "yyyy-MM-dd")}</p>
            </div>
            <CashField date={date}></CashField>
        </div>
    );
};

export default AddCash;