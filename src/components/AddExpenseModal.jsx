import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const AddExpenseModal = ({
  open,
  handleCloseModal,
  handleSubmit,
  budgets,
  expense,
}) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [formValues, setFormValues] = useState({
    description: "",
    amount: 0,
    budgetID: "",
    date: "",
  });

  const resetValues = () => {
    setValue({ startDate: null, endDate: null });
    setFormValues({
      description: "",
      amount: 0,
      budgetID: "",
      date: "",
    });
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleValueChange = (newValue) => {
    const { startDate } = newValue;
    setValue(newValue);
    setFormValues({ ...formValues, date: startDate });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (
      formValues.name === "" ||
      formValues.amount === "" ||
      formValues.date === ""
    )
      return;

    handleSubmit({
      ...formValues,
      budgetName: expense.id ? expense.id : formValues.budgetID,
      budgetID: expense.id ? expense.id : formValues.budgetID,
    });
    resetValues();
  };

  return (
    <>
      <div
        className={`relative z-10 ${
          !open ? "hidden" : "flex"
        } transition ease-in-out duration-300 delay-75`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-visible text-left shadow-xl transition-all sm:my-8 md:w-[800px] sm:max-w-lg">
              <div className="bg-slate-900 h-[510px] md:h-[500px] overflow-visible rounded-lg">
                <div className="sm:flex sm:items-start ">
                  <div className="mt-3 w-full text-center sm:mt-0 p-2 sm:text-left text-gray-300">
                    <div className="flex gap-8 md:gap-5 justify-between items-center px-2 py-2">
                      <div className="">
                        <h4 className="font-bold text-sm uppercase">
                          New Expense
                        </h4>
                      </div>
                      <div
                        title="close"
                        onClick={handleCloseModal}
                        className="cursor-pointer hover:text-red-500 hover:rounded-lg hover:w-6 hover:h-6"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <form onSubmit={handleForm}>
                      <div className="flex flex-col gap-5 mt-6 px-2">
                        {/* Description */}
                        <div className="">
                          <label htmlFor="budgetName" className="text-sm">
                            Description
                          </label>
                          <input
                            id="budgetName"
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={formValues.description}
                            className="bg-slate-900 mt-2 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900  focus-within:bg-slate-900"
                            placeholder="Description"
                          />
                        </div>
                        {/* Amount */}
                        <div className="">
                          <label htmlFor="maxAmount" className="text-sm">
                            Amount
                          </label>
                          <input
                            id="maxAmount"
                            type="number"
                            name="amount"
                            onChange={handleChange}
                            value={formValues.amount}
                            className="appearance-none mt-2 bg-slate-900 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900 hover:appearance-none
                            "
                            placeholder="Amount"
                          />
                        </div>
                        {/* Date */}
                        <div className="">
                          <label htmlFor="date" className="text-sm">
                            Date
                          </label>
                          <Datepicker
                            displayFormat={"MM-YYYY"}
                            useRange={false}
                            asSingle={true}
                            showShortcuts={false}
                            value={value}
                            onChange={handleValueChange}
                            inputClassName="appearance-none bg-slate-900 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900"
                            classNames={{
                              popover: "absolute z-50",
                            }}
                          />
                        </div>
                        <div className="">
                          <label htmlFor="budgetName" className="text-sm">
                            Budget
                          </label>
                          {expense ? (
                            <>
                              <input
                                type="text"
                                name="budgetName"
                                id="budgetName"
                                value={expense.title}
                                className="appearance-none mt-2 bg-slate-900 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900 hover:appearance-none
                            "
                                disabled
                              />
                            </>
                          ) : (
                            <select
                              onChange={handleChange}
                              name="budgetID"
                              id="budgetID"
                              value={formValues.budgetID}
                              className="appearance-none w-full mt-2 bg-slate-900 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900 hover:appearance-none
                          "
                            >
                              {budgets.map((budget, index) => (
                                <option key={index} value={budget.id}>
                                  {budget.title}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                        {/* Add */}
                        <div className="flex flex-row justify-end">
                          <button
                            type="submit"
                            className="bg-red-600 px-4 py-2 text-gray-200 rounded-lg shadow-md"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
