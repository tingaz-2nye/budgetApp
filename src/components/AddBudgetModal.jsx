import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const AddBudgetModal = ({ open, handleCloseModal, handleSubmit }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [formValues, setFormValues] = useState({
    name: "",
    amount: "",
    fullDate: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetValues = () => {
    setValue({ startDate: null, endDate: null });
    setFormValues({
      name: "",
      amount: "",
      fullDate: "",
      month: "",
      year: "",
    });
  };

  const handleValueChange = (newValue) => {
    const { startDate } = newValue;
    const month = new Date(startDate).toLocaleString("default", {
      month: "short",
    });
    const year = new Date(startDate).toLocaleString("default", {
      year: "numeric",
    });
    setValue(newValue);
    setFormValues({ ...formValues, fullDate: startDate, month, year });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (
      formValues.name === "" ||
      formValues.amount === "" ||
      formValues.fullDate === ""
    )
      return;

    handleSubmit(formValues);

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
            <div className="relative transform overflow-visibletext-left shadow-xl transition-all sm:my-20 sm:w-[800px] sm:max-w-lg">
              <div className="bg-slate-900 h-[390px] md:h-[390px] rounded-lg overflow-visible">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 p-2 sm:text-left text-gray-300">
                    <div className="flex gap-8 md:gap-5 justify-between items-center px-2 py-2">
                      <div>
                        <h4 className="font-bold text-sm uppercase">
                          New Budget
                        </h4>
                      </div>
                      <div
                        title="close"
                        onClick={() => {
                          resetValues();
                          handleCloseModal();
                        }}
                        className="cursor-pointer hover:text-red-600 hover:rounded-lg hover:w-6 hover:h-6"
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
                        {/* Budget Name */}
                        <div className="">
                          <label htmlFor="budgetName" className="text-sm">
                            Budget Name
                          </label>
                          <input
                            id="budgetName"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formValues.name}
                            className="bg-slate-900 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900 focus-within:bg-slate-900"
                            placeholder="Budget Name"
                          />
                        </div>
                        {/* Max Amount */}
                        <div className="">
                          <label htmlFor="maxAmount" className="text-sm">
                            Max Amount
                          </label>
                          <input
                            id="maxAmount"
                            type="number"
                            name="amount"
                            onChange={handleChange}
                            value={formValues.amount}
                            className="appearance-none bg-slate-900 border-gray-400 border-2 p-2 w-full rounded-md focus:border-green-500 focus:outline-none active:bg-slate-900 hover:appearance-none"
                            placeholder="Max Amount"
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

export default AddBudgetModal;
