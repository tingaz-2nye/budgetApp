import React from "react";
import { PlusIcon } from "../utils/icons";

const SideBarNav = ({ handleOpenBudgetModal }) => {
  return (
    <div className="min-h-screen w-20 bg-slate-900 text-gray-300 py-4 flex flex-col gap-4 items-center">
      <div className="rounded-full bg-white w-12 h-12"></div>
      <div className="mt-4">
        <button
          className="hover:text-gray-500"
          title="Add Budget"
          onClick={handleOpenBudgetModal}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default SideBarNav;
