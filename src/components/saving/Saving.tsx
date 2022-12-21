import React, { useState, useEffect } from "react";
import { SavingProps } from "../../types/saving";

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
    <div>
      <p>Current saving: {saving}</p>
      <form onSubmit={(e) => transferBalance(e)}>
        <label htmlFor="savingToBalance">Transfer back to the balance</label>
        <input
          type="number"
          id="savingToBalance"
          name="savingToBalance"
          value={transferBack}
          onChange={({ target }) => setTransferBack(+target.value)}
        />
        <button type="submit">Transfer</button>
      </form>
      <p>Current target: {target}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="target">
          <label htmlFor="target">Set target</label>
          <input
            type="number"
            id="target"
            name="target"
            value={target}
            onChange={({ target }) => setTarget(+target.value)}
          />
          <button type="submit">Reset</button>
        </div>
      </form>
      <label htmlFor="progress">{(saving / target) * 100 || 0}%</label>
      <progress value={saving} max={target} />
    </div>
  );
};

export default Saving;
