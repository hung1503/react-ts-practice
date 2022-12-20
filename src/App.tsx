import React, { useState, useEffect } from "react";
import Budget from "./components/budget/Budget";
import Balance from "./components/balance/Balance";
import Saving from "./components/saving/Saving";
import { BudgetType } from "./types/budget";

function App() {
  const incomeList = JSON.parse(localStorage.getItem("incomes") || "[]");
  const expenseList = JSON.parse(localStorage.getItem("expenses") || "[]");
  const [incomes, setIncomes] = useState<BudgetType[]>(incomeList);
  const [expenses, setExpenses] = useState<BudgetType[]>(expenseList);
  const [balance, setBalance] = useState(0);
  const [saving, setSaving] = useState(0);

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

  return (
    <div className="App">
      <Budget
        option="Income"
        list={incomes}
        setList={setIncomes}
        balance={balance}
      />
      <Budget
        option="Expense"
        list={expenses}
        setList={setExpenses}
        balance={balance}
      />
      <Balance balance={balance} setSaving={setSaving} />
      <Saving saving={saving} />
    </div>
  );
}

export default App;
