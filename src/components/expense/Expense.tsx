import React from "react";

type ExpenseProps = {
  expense: number;
  setExpense: (expense: number) => void;
};

const Expense = (props: ExpenseProps) => {
  return (
    <div className="expense">
      <form action="">
        <label htmlFor="">Expense source</label>
        <input type="text" />
        <label htmlFor="">Amount of expense</label>
        <input type="number" />
        <label htmlFor="">Dateo of expense</label>
        <input type="date" />
        <button>Add expense</button>
      </form>
    </div>
  );
};

export default Expense;
