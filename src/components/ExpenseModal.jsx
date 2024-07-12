import React from "react";
import { CloseIcon, TrashIcon } from "../utils/icons";

const ExpenseModal = ({
  open,
  handleCloseModal,
  expenses,
  handleDeleteExpense,
}) => {
  const handleDelete = (id, category) => {
    handleDeleteExpense(id, category);
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
            <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-[800px] sm:max-w-lg">
              <div className="bg-slate-900  h-[700px] sm:h-[500px] overflow-x-hidden overflow-y-hidden">
                <div className="sm:flex sm:items-start ">
                  <div className="mt-3 w-full text-center sm:mt-0 p-2 sm:text-left text-gray-300">
                    <div className="flex gap-8 md:gap-5 justify-between items-center px-2 py-2">
                      <div>
                        <h4 className="font-bold text-sm">
                          Expenses - {expenses[0]?.title}
                        </h4>
                      </div>
                      <div
                        title="close"
                        onClick={handleCloseModal}
                        className="cursor-pointer hover:text-red-600 hover:rounded-lg hover:w-6 hover:h-6"
                      >
                        <CloseIcon />
                      </div>
                    </div>
                    <div className="flex flex-col px-2 py-2 h-[400px] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                      {/* Expense */}
                      {expenses[0]?.expenses?.map((expense, index) => (
                        <div
                          key={index}
                          className="py-2 px-2 mt-2 border border-gray-400 rounded-lg flex-col justify-between items-center"
                        >
                          <div className="flex flex-row justify-between">
                            <div className="text-xs text-red-600">
                              {expense.date}
                            </div>
                            <div>
                              <button
                                className="cursor-pointer hover:text-red-600 hover:rounded-lg hover:w-4 hover:h-4"
                                onClick={() =>
                                  handleDelete(expense.id, expenses[0]?.id)
                                }
                              >
                                <TrashIcon height="w-4" width="w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between items-center">
                            <div className="text-sm text-gray-300 font-semibold">
                              {expense.description}
                            </div>
                            <div className="flex items-center gap-4">
                              <span>${expense.amount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default ExpenseModal;
