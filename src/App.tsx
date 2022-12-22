import React, { useState, useEffect } from "react";
import "./App.css";
import Budget from "./components/budget/Budget";
import Balance from "./components/balance/Balance";
import Saving from "./components/saving/Saving";
import { BudgetType } from "./types/budget";

function App() {
  const incomeList = JSON.parse(localStorage.getItem("incomes") || "[]");
  const expenseList = JSON.parse(localStorage.getItem("expenses") || "[]");
  const savingValue = JSON.parse(localStorage.getItem("saving") || "0");
  const [incomes, setIncomes] = useState<BudgetType[]>(incomeList);
  const [expenses, setExpenses] = useState<BudgetType[]>(expenseList);
  const [balance, setBalance] = useState(0);
  const [saving, setSaving] = useState(savingValue);

  useEffect(() => {
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    setBalance(totalIncome - totalExpense - saving);
  });

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("saving", JSON.stringify(saving));
  }, [saving]);

  return (
    <div className="main">
      <div className="income-container">
        <Budget
          option="Income"
          list={incomes}
          setList={setIncomes}
          balance={balance}
        />
      </div>
      <div className="expense-container">
        <Budget
          option="Expense"
          list={expenses}
          setList={setExpenses}
          balance={balance}
        />
      </div>
      <div className="saving-container">
        <Saving saving={saving} setBalance={setBalance} setSaving={setSaving} />
      </div>
      <div className="balance-container">
        <Balance balance={balance} setSaving={setSaving} />
      </div>
    </div>
  );
}

export default App;
