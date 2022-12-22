import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

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
    <Box
      sx={{
        margin: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Budget
            option="Income"
            list={incomes}
            setList={setIncomes}
            balance={balance}
          />
        </Grid>
        <Grid item xs={4}>
          <Budget
            option="Expense"
            list={expenses}
            setList={setExpenses}
            balance={balance}
          />
        </Grid>
        <Grid item xs={4}>
          <Saving
            saving={saving}
            setBalance={setBalance}
            setSaving={setSaving}
          />
        </Grid>
        <Grid item xs={4}>
          <Balance balance={balance} setSaving={setSaving} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
