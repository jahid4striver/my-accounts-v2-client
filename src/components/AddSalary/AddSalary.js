import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import SalaryField from './SalaryField';

const AddSalary = () => {
    const [date, setDate]= useState(new Date());
    return (
        <div className='mt-10'>
            <h1 className='text-3xl text-center text-green-600'>Add a New Advance Salary Expense</h1>
            <div className='flex justify-center items-center flex-col'>
            <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            />
            <p>Today Is {format(date, "yyyy-MM-dd")}</p>
            </div>
            <SalaryField date={date}></SalaryField>
        </div>
    );
};

export default AddSalary;