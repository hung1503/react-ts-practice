import React, { useState } from "react";
import { SavingProps } from "../../types/saving";

const Saving = ({ saving }: SavingProps) => {
  const [target, setTarget] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <p>Current saving: {saving}</p>
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
