import React from 'react';

const SideBarNav = ({ handleOpenBudgetModal }) => {
  return (
    <div className="h-screen w-20 bg-slate-900 text-gray-300 py-4 flex flex-col gap-4 items-center">
      <div className="rounded-full bg-white w-12 h-12"></div>
      <div className="mt-4">
        <button
          className="hover:text-gray-500"
          title="Add Budget"
          onClick={handleOpenBudgetModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transform rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SideBarNav;
