import React, { useEffect, useState } from "react";
import { eyeIcon, plusIcon, trashIcon } from "../utils/icons";

const colors = {
  red: "bg-red-600",
  yellow: "bg-yellow-600",
  blue: "bg-blue-600",
};

const BudgetCard = ({
  handleOpenView,
  handleOpenAdd,
  budget,
  setExpenseCategory,
  handleDeleteBudget,
}) => {
  const {
    id,
    title,
    budget_total,
    expense_total,
    expenses,
    fullDate,
    month,
    year,
  } = budget;
  const [percentage, setPercentage] = useState(null);

  const [color, setColor] = useState(colors.blue);

  const handleDelete = (id) => {
    handleDeleteBudget(id);
  };

  useEffect(() => {
    const percentageValue = (expense_total / budget_total) * 100;
    const percentageCheck = percentageValue > 100 ? 100 : percentageValue;
    setPercentage(percentageCheck);
    switch (true) {
      case percentageValue > 70:
        return setColor(colors.red);
      case percentageValue > 50:
        return setColor(colors.yellow);
      default:
        return setColor(colors.blue);
    }
  }, [expense_total, budget_total, expenses]);

  return (
    <div className="w-56 md:w-96 h-36 p-4 rounded-xl shadow-md bg-slate-900 text-gray-300 flex flex-col justify-between">
      <div className="flex items-center">
        <div className="text-xs text-gray-400">
          {new Date(fullDate).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm md:text-lg text-gray-400">
          {expense_total} / {budget_total}
        </div>
      </div>
      <div className="w-full h-2 bg-blue-200 rounded-full">
        <div
          className={`h-full text-center text-white ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            handleOpenAdd();
            setExpenseCategory(id);
          }}
          className="p-2 hidden md:block rounded-2xl uppercase text-sm bg-red-900 hover:bg-red-700"
        >
          Add Expense
        </button>
        <button
          onClick={() => {
            handleOpenAdd();
            setExpenseCategory(id);
          }}
          className="p-2 flex md:hidden rounded-2xl text-xs"
        >
          {plusIcon}
        </button>
        <button
          onClick={() => {
            handleOpenView();
            setExpenseCategory(id);
          }}
          className="text-gray-400 hidden md:block rounded-2xl p-2 border border-red-900 hover:border-red-700 uppercase text-sm hover:text-gray-300"
        >
          View Expenses
        </button>
        <button
          onClick={() => {
            handleOpenView();
            setExpenseCategory(id);
          }}
          className="p-2 flex md:hidden text-xs rounded-2xl"
        >
          {eyeIcon}
        </button>
        <button
          className="text-gray-400 hidden md:block uppercase text-sm hover:text-gray-300"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
        <button
          className="p-2 flex md:hidden text-xs rounded-2xl"
          onClick={() => handleDelete(id)}
        >
          {trashIcon}
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;
