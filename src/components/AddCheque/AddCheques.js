import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ChequeField from './ChequeField';


const AddCheques = () => {
    const today= format(new Date(), "yyyy-MM-dd")

    return (
        <div className='mt-10'>
            <h1 className='text-3xl text-center text-green-600'>Add a New Cheque</h1>
            <div className='flex justify-center items-center flex-col'>
            <p>Today Is: {today}</p>
            </div>
            <ChequeField today={today}></ChequeField>
        </div>
    );
};

export default AddCheques;