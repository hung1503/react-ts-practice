import React, { useState } from "react";
import { BudgetProps, BudgetType } from "../../types/budget";
import uuid4 from "uuid4";

const Budget = ({ option, list, setList, balance }: BudgetProps) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (source === "Open to see") {
      setError("Please select a source");
      return;
    } else {
      setError("");
    }
    const newItem: BudgetType = {
      id: uuid4(),
      source,
      amount,
      date,
    };
    if (option === "Expense") {
      if (balance < amount) {
        setError("You don't have enough money");
        return;
      } else {
        setError("");
      }
    }
    setList([...list, newItem]);
    setSource("");
    setAmount(0);
    setDate("");
  };

  return (
    <div>
      <h2>{option}</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="src">{option} source</label>
          {option === "Income" && (
            <select
              name="src"
              id="src"
              value={source}
              onChange={({ target }) => setSource(target.value)}
            >
              <option value="Open to see">Open to see</option>
              <option value="Salary">Salary</option>
              <option value="Bonus">Bonus</option>
              <option value="Other">Other</option>
            </select>
          )}
          {option === "Expense" && (
            <select
              name="src"
              id="src"
              value={source}
              onChange={({ target }) => setSource(target.value)}
            >
              <option value="Open to see">Open to see</option>
              <option value="Water bill">Water bill</option>
              <option value="Electricity bill">Electricity bill</option>
              <option value="Rent">Rent</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          )}
        </div>
        <div>
          <label htmlFor="amount">Amount of {option}</label>
          <input
            type="text"
            id="amount"
            name="amount"
            required
            value={amount}
            onChange={({ target }) => setAmount(+target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date of {option}</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <button type="submit">Add {option}</button>
      </form>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              {item.source}: {item.amount} on {item.date}
            </li>
          );
        })}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Budget;
