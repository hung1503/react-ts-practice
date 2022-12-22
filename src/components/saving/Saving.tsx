import React, { useState, useEffect } from "react";
import { SavingProps } from "../../types/saving";
import "./styles/saving.css";

const Saving = ({ saving, setBalance, setSaving }: SavingProps) => {
  const targetValue = JSON.parse(localStorage.getItem("target") || "0");
  const [target, setTarget] = useState(targetValue);
  const [transferBack, setTransferBack] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    localStorage.setItem("target", JSON.stringify(target));
  }, [target]);

  const transferBalance = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (transferBack > saving) {
      return;
    }
    setBalance((prev) => prev + transferBack);
    setSaving((prev) => prev - transferBack);
  };

  return (
    <div className="saving">
      <div className="saving-value-container">
        <p className="saving-value">Current saving: {saving}</p>
        <p className="saving-value">Current target: {target}</p>
      </div>
      <label htmlFor="progress">{(saving / target) * 100 || 0}%</label>
      <progress value={saving} max={target} />
      <div className="savingFormContainer">
        <form onSubmit={(e) => transferBalance(e)} className="savingForm">
          <label htmlFor="savingToBalance">Transfer back to the balance</label>
          <input
            className="input"
            type="number"
            id="savingToBalance"
            name="savingToBalance"
            value={transferBack}
            onChange={({ target }) => setTransferBack(+target.value)}
          />
          <button type="submit">Transfer</button>
        </form>
        <form onSubmit={(e) => handleSubmit(e)} className="savingForm">
          <label htmlFor="target">Set target</label>
          <input
            className="input"
            type="number"
            id="target"
            name="target"
            value={target}
            onChange={({ target }) => setTarget(+target.value)}
          />
          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
};

export default Saving;
