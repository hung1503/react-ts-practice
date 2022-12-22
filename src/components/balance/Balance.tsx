import React, { useState } from "react";
import { BalanceProps } from "../../types/balance";
import "./styles/balance.css";

const Balance = ({ balance, setSaving }: BalanceProps) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount > balance) {
      setError("You don't have enough money to transfer");
      return;
    } else {
      setError("");
    }
    setSaving((prev) => prev + amount);
  };

  return (
    <div className="balance">
      <div className="balance-value-container">
        <p className="balance-value">Current balance: {balance}</p>
      </div>
      <div className="balanceFormContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="saving">
            <label htmlFor="saving">Transfer to saving account</label>
            <input
              className="input"
              type="text"
              id="saving"
              name="saving"
              value={amount}
              onChange={({ target }) => setAmount(+target.value)}
            />
            <button type="submit">Transfer</button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Balance;
