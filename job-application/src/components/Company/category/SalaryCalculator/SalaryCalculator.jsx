import React, { useState } from 'react';
import './SalaryCalculator.css'; // Import your CSS for styling

const SalaryCalculator = () => {
    const [baseSalary, setBaseSalary] = useState('');
    const [bonus, setBonus] = useState('');
    const [deductions, setDeductions] = useState('');
    const [totalSalary, setTotalSalary] = useState(null);

    const handleCalculate = () => {
        const total = parseFloat(baseSalary) + parseFloat(bonus) - parseFloat(deductions);
        setTotalSalary(total);
    };

    return (
        <div className="SalaryCalculator">
            <h1>Salary Calculator</h1>
            <div className="calculator-form">
                <div className="form-group">
                    <label htmlFor="baseSalary">Base Salary:</label>
                    <input
                        type="number"
                        id="baseSalary"
                        value={baseSalary}
                        onChange={(e) => setBaseSalary(e.target.value)}
                        placeholder="Enter base salary"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bonus">Bonus:</label>
                    <input
                        type="number"
                        id="bonus"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                        placeholder="Enter bonus amount"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deductions">Deductions:</label>
                    <input
                        type="number"
                        id="deductions"
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                        placeholder="Enter deductions amount"
                    />
                </div>
                <button onClick={handleCalculate}>Calculate</button>
            </div>
            {totalSalary !== null && (
                <div className="result">
                    <h2>Total Salary: ₹{totalSalary.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
};

export default SalaryCalculator;
