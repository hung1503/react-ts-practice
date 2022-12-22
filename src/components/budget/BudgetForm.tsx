import React, { useState, useEffect } from "react";
import { BudgetFormProps, BudgetType } from "../../types/budget";
import uuid4 from "uuid4";
import "./styles/budget.css";

const BudgetForm = ({
  option,
  balance,
  setList,
  item,
  change,
  setChange,
}: BudgetFormProps) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (change === "modify" && item) {
      console.log(item);
      setSource(item.source);
      setAmount(item.amount);
      setDate(item.date);
    }
  }, [item]);

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
    if (change === "modify" && item) {
      setList((prev) => {
        return prev.map((i) => {
          if (i.id === item.id) {
            const modifiedItem = {
              ...item,
              source: source,
              amount: amount,
              date: date,
            };
            return modifiedItem;
          }
          return i;
        });
      });
    } else {
      setList((prev) => [...prev, newItem]);
    }
    setChange("create");
    setSource("");
    setAmount(0);
    setDate("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="src">{option} source</label>
          {option === "Income" && (
            <select
              name="src"
              id="src"
              value={source}
              className="input"
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
              className="input"
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
            className="input"
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
            className="input"
            required
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <button type="submit">Save {option}</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default BudgetForm;
