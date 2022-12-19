import React, { useState } from "react";

type IncomeProps = {
  income: number;
  setIncome: (income: number) => void;
};

const Income = ({ income, setIncome }: IncomeProps) => {
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  let counter = 0;

  const generateId = (
    existingId: string[],
    keyName: string,
    objectData: {}
  ) => {
    const idExist = existingId.includes(keyName);
    if (!idExist) {
      localStorage.setItem(keyName, JSON.stringify(objectData));
    } else {
      for (let i = 0; i < existingId.length; i++) {
        const idExist = existingId.includes(`${keyName}${i}`);
        if (!idExist) {
          localStorage.setItem(`${keyName}${i}`, JSON.stringify(objectData));
        }
      }
    }
  };
  console.log(localStorage);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.setItem(
      `incomeInfo${counter}`,
      JSON.stringify({ incomeSource, incomeDate, income })
    );
    counter = counter + 1;
    setIncomeSource("");
    setIncomeDate("");
    setIncome(0);
  };

  const displayIncome = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const incomeInfo = localStorage.getItem(`incomeInfo${i}`);
      console.log(`incomeInfo${i}`);
      console.log(localStorage.length);
      if (incomeInfo) {
        const { incomeSource, incomeDate, income } = JSON.parse(incomeInfo);
        return (
          <li>
            {incomeSource}: {income} Euro on {incomeDate}
          </li>
        );
      }
    }
  };

  return (
    <div className="income">
      <form onSubmit={handleSubmit}>
        <label htmlFor="incomeSrc">Income source</label>
        <input
          type="text"
          id="incomeSrc"
          value={incomeSource}
          onChange={({ target }) => setIncomeSource(target.value)}
        />
        <label htmlFor="incomeAm">Amount of income</label>
        <input
          type="text"
          id="incomeAm"
          value={income}
          onChange={({ target }) => setIncome(+target.value)}
        />
        <label htmlFor="incomeDate">Date of income</label>
        <input
          type="date"
          id="incomeDate"
          value={incomeDate}
          onChange={({ target }) => setIncomeDate(target.value)}
        />
        <button type="submit">Add income</button>
      </form>
      <div className="displayIncome">
        <h3>Income</h3>
        <ul>{displayIncome()}</ul>
      </div>
    </div>
  );
};

export default Income;
