import React, { useEffect } from 'react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const DaywiseExpenseGraph = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetch(`https://nbcaccounts.clearsoftwares.xyz/getcurrentmonthexpenses`)
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
      }

      )
  }, [])

  const maxSalesValue = Math.max(...expenses.map(item => item.expense));

  return (

    <div className="mt-40">
      <h1 className='text-xl text-center font-bold'>Day Wise Sales (This Month)</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={expenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, maxSalesValue]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="#FF0000" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DaywiseExpenseGraph;
