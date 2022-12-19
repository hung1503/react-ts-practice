import React from "react";

type TargetProps = {
  target: number;
  setTarget: (target: number) => void;
};

const Target = (props: TargetProps) => {
  return (
    <div className="target">
      <label htmlFor="">Set target</label>
      <input type="text" />
      <button>Set target</button>
    </div>
  );
};

export default Target;
