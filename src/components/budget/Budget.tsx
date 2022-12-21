import React, { useState } from "react";
import { BudgetProps, BudgetType } from "../../types/budget";
import BudgetForm from "./BudgetForm";

const Budget = ({ option, list, setList, balance }: BudgetProps) => {
  const [item, setItem] = useState<BudgetType | undefined>(undefined);
  const [change, setChange] = useState<"create" | "modify">("create");
  const handleDelete = (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>{option}</h2>
      <BudgetForm
        option={option}
        balance={balance}
        setList={setList}
        item={item}
        change={change}
        setChange={setChange}
      />
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              {item.source}: {item.amount} on {item.date}
              <button
                onClick={() => {
                  setItem(item);
                  setChange("modify");
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={option === "Income" && balance - item.amount < 0}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Budget;
