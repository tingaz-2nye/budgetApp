import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import ExpenseModal from './components/ExpenseModal';
import SideBarNav from './components/SideBarNav';

function App() {
  const LOCAL_STORAGE_KEY = 'budgets';
  const [viewExpense, setViewExpense] = useState(false);
  const [addBudget, setAddBudget] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState(null);

  // const [budget, setBudget] = useState({
  //   title: ' ',
  //   expenses: [],
  //   budget_total: 0,
  //   expense_total: 0,
  // });
  // const [expense, setExpense] = useState({
  //   Description: '',
  //   Amount: 0,
  //   budget_name: '',
  // });
  const [budgets, setBudgets] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []

    // {
    // total: 2000,
    // month: 'Jan',
    // year: '2023',
    // budgets:

    // [
    // {
    //   id: uuidv4(),
    //   title: 'Entertainment',
    //   expenses: [],
    //   budget_total: 5000,
    //   expense_total: 0,
    // },
    // {
    //   id: uuidv4(),
    //   title: 'Food',
    //   expenses: [],
    //   budget_total: 2000,
    //   expense_total: 0,
    // },
    // {
    //   id: uuidv4(),
    //   title: 'Transportation',
    //   expenses: [],
    //   budget_total: 2000,
    //   expense_total: 0,
    // },
    // {
    //   id: uuidv4(),
    //   title: 'Rental Services',
    //   expenses: [],
    //   budget_total: 2000,
    //   expense_total: 0,
    // },
    // ]
    // }
  );

  const handleOpenViewExpenseModal = () => setViewExpense(true);
  const handleCloseViewExpenseModal = () => setViewExpense(false);
  const handleOpenAddBudgetModal = () => setAddBudget(true);
  const handleCloseAddBudgetModal = () => setAddBudget(false);
  const handleOpenAddExpenseModal = () => setAddExpense(true);
  const handleCloseAddExpenseModal = () => setAddExpense(false);

  const addSum = ({ budgetID, amount = 0, id = 0, isSum = true }) => {
    let sum = 0;

    const expenses = budgets.filter((budget) => budget.id === budgetID)[0]
      ?.expenses;

    if (!isSum) {
      const newExpenses = expenses.filter((expense) => expense.id !== id);

      for (const n of newExpenses) {
        sum += n.amount;
      }
      return sum;
    }

    for (const n of expenses) {
      sum += n.amount;
    }
    return sum + parseFloat(amount);
  };

  const overallBudgetTotal = () => {
    let sum = 0;

    for (const n of budgets) {
      sum += parseFloat(n.budget_total);
    }

    return sum;
  };
  const overallExpenseTotal = () => {
    let sum = 0;

    for (const n of budgets) {
      sum += parseFloat(n.expense_total);
    }

    return sum;
  };

  const handleAddBudgetForm = (formValues) => {
    const { name, amount } = formValues;
    const obj = {
      id: uuidv4(),
      title: name,
      expenses: [],
      budget_total: parseFloat(amount),
      expense_total: 0,
    };

    setBudgets([...budgets, obj]);
    handleCloseAddBudgetModal();
  };

  const handleAddExpenseForm = (formValues) => {
    const { description, amount, budgetID } = formValues;
    const obj = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      budgetID,
    };

    const sum = addSum({ budgetID, amount });

    setBudgets(
      budgets.map((budget) => {
        return budget.id === budgetID
          ? {
              ...budget,
              ['expenses']: [...budget.expenses, obj],
              ['expense_total']: sum,
            }
          : budget;
      })
    );
    handleCloseAddExpenseModal();
  };

  const handleDeleteExpense = (id, budgetID) => {
    const expense = budgets.filter((budget) => budget.id === budgetID)[0];
    const expenses = expense.expenses.filter((exp) => exp.id !== id);

    const sum = addSum({ budgetID, isSum: false, id });

    setBudgets(
      budgets.map((budget) => {
        return budget.id === budgetID
          ? {
              ...budget,
              ['expenses']: expenses,
              ['expense_total']: sum,
            }
          : budget;
      })
    );
  };

  const handleDeleteBudget = (id) => {
    const newBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(newBudgets);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  return (
    <>
      <div className="bg-slate-800 w-screen min-h-screen overflow-x-hidden flex justify-start">
        <SideBarNav handleOpenBudgetModal={handleOpenAddBudgetModal} />

        <div className="w-full h-auto pb-20 bg-slate-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-3 pt-10 px-4 overflow-x-hidden">
          {budgets.map((budget, index) => (
            <BudgetCard
              key={index}
              budget={budget}
              handleOpenView={handleOpenViewExpenseModal}
              handleOpenAdd={handleOpenAddExpenseModal}
              setExpenseCategory={setExpenseCategory}
              handleDeleteBudget={handleDeleteBudget}
            />
          ))}
        </div>

        <div className="w-72 h-20 rounded-full bg-slate-900 fixed bottom-4 right-5 shadow-lg text-gray-400 justify-center flex items-center px-4 text-xl font-bold">
          <div>Total :</div>
          <div className="px-4 text-2xl text-gray-300">{`${overallExpenseTotal()} / ${overallBudgetTotal()}`}</div>
        </div>
        <ExpenseModal
          open={viewExpense}
          handleCloseModal={handleCloseViewExpenseModal}
          expenses={budgets.filter((budget) => budget.id === expenseCategory)}
          handleDeleteExpense={handleDeleteExpense}
        />
        <AddBudgetModal
          open={addBudget}
          handleSubmit={handleAddBudgetForm}
          handleCloseModal={handleCloseAddBudgetModal}
        />
        <AddExpenseModal
          open={addExpense}
          handleSubmit={handleAddExpenseForm}
          budgets={budgets}
          expense={budgets.filter((budget) => budget.id === expenseCategory)[0]}
          handleCloseModal={handleCloseAddExpenseModal}
        />
      </div>
    </>
  );
}

export default App;
