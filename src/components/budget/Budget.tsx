import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { BudgetProps, BudgetType } from "../../types/budget";
import BudgetForm from "./BudgetForm";
import "./styles/budget.css";

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
      <div className="displayResult">
        {list.map((item) => {
          return (
            <div className="singleResult" key={item.id}>
              <div>
                {item.source}: {item.amount} on {item.date}
              </div>
              <div>
                <button
                  className="filterBtn"
                  onClick={() => {
                    setItem(item);
                    setChange("modify");
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  className="filterBtn"
                  onClick={() => handleDelete(item.id)}
                  disabled={option === "Income" && balance - item.amount < 0}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;
