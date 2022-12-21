import React, { useState } from "react";
import { BalanceProps } from "../../types/balance";

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
    <div>
      <p>Current balance: {balance}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="saving">
          <label htmlFor="saving">Transfer to saving account</label>
          <input
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
  );
};

export default Balance;
