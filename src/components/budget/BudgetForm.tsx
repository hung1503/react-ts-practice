import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";

import { BudgetFormProps, BudgetType } from "../../types/budget";
import uuid4 from "uuid4";

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

  const incomeOptions = [
    { value: "Salary", label: "Salary" },
    { value: "Bonus", label: "Bonus" },
    { value: "Other", label: "Other" },
  ];

  const expenseOptions = [
    { value: "Water bill", label: "Water bill" },
    { value: "Electricity bill", label: "Electricity bill" },
    { value: "Internet bill", label: "Internet bill" },
    { value: "Rent", label: "Rent" },
    { value: "Food", label: "Food" },
    { value: "Other", label: "Other" },
  ];

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
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box>
          <label htmlFor="src">{option} source</label>
          {option === "Income" && (
            <Autocomplete
              id="src"
              options={incomeOptions}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, value) => {
                if (!value) return;
                setSource(value.value);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          {option === "Expense" && (
            <Autocomplete
              id="src"
              options={expenseOptions}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, value) => {
                if (!value) return;
                setSource(value.value);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        </Box>
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
        <Button size="small" variant="outlined" type="submit">
          Add {option}
        </Button>
      </form>
      {error && <p>{error}</p>}
    </Box>
  );
};

export default BudgetForm;
