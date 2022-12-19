import React, { useState } from "react";
import Income from "./components/income/Income";
import Expense from "./components/expense/Expense";
import Target from "./components/target/Target";

function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [target, setTarget] = useState(0);

  return (
    <div className="App">
      <Income income={income} setIncome={setIncome} />
      <Expense expense={expense} setExpense={setExpense} />
      <Target target={target} setTarget={setTarget} />
    </div>
  );
}

export default App;
