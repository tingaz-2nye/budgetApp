import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import ExpenseModal from './components/ExpenseModal';
import SideBarNav from './components/SideBarNav';

function App() {
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
  const [budgets, setBudgets] = useState({
    total: 2000,
    month: 'Jan',
    year: '2023',
    budgets: [
      {
        id: uuidv4(),
        title: 'Entertainment',
        expenses: [],
        budget_total: 5000,
        expense_total: 0,
      },
      {
        id: uuidv4(),
        title: 'Food',
        expenses: [],
        budget_total: 2000,
        expense_total: 0,
      },
      {
        id: uuidv4(),
        title: 'Transportation',
        expenses: [],
        budget_total: 2000,
        expense_total: 0,
      },
      {
        id: uuidv4(),
        title: 'Rental Services',
        expenses: [],
        budget_total: 2000,
        expense_total: 0,
      },
    ],
  });

  const handleOpenViewExpenseModal = () => setViewExpense(true);
  const handleCloseViewExpenseModal = () => setViewExpense(false);
  const handleOpenAddBudgetModal = () => setAddBudget(true);
  const handleCloseAddBudgetModal = () => setAddBudget(false);
  const handleOpenAddExpenseModal = () => setAddExpense(true);
  const handleCloseAddExpenseModal = () => setAddExpense(false);

  const addSum = ({ budgetID, amount = 0, id = 0, isSum = true }) => {
    let sum = 0;

    const expenses = budgets.budgets.filter(
      (budget) => budget.id === budgetID
    )[0]?.expenses;

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

  const handleAddBudgetForm = (formValues) => {
    const { name, amount } = formValues;
    const obj = {
      id: uuidv4(),
      title: name,
      expenses: [],
      budget_total: amount,
      expense_total: 0,
    };

    setBudgets({
      ...budgets,
      ['budgets']: [...budgets.budgets, obj],
    });
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

    setBudgets({
      ...budgets,
      ['budgets']: budgets.budgets.map((budget) => {
        return budget.id === budgetID
          ? {
              ...budget,
              ['expenses']: [...budget.expenses, obj],
              ['expense_total']: sum,
            }
          : budget;
      }),
    });

    handleCloseAddExpenseModal();
  };

  const handleDeleteExpense = (id, budgetID) => {
    const expense = budgets.budgets.filter(
      (budget) => budget.id === budgetID
    )[0];
    const expenses = expense.expenses.filter((exp) => exp.id !== id);

    const sum = addSum({ budgetID, isSum: false, id });

    setBudgets({
      ...budgets,
      ['budgets']: budgets.budgets.map((budget) => {
        return budget.id === budgetID
          ? {
              ...budget,
              ['expenses']: expenses,
              ['expense_total']: sum,
            }
          : budget;
      }),
    });
  };

  const handleDeleteBudget = (id) => {
    const newBudgets = budgets.budgets.filter((budget) => budget.id !== id);
    setBudgets({
      ...budgets,
      ['budgets']: newBudgets,
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-slate-800 w-screen h-screen overflow-x-hidden flex justify-start">
        <SideBarNav handleOpenBudgetModal={handleOpenAddBudgetModal} />

        <div className="w-full bg-slate-600 grid grid-cols-3 gap-4 pt-10 px-4">
          {budgets.budgets.map((budget, index) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              handleOpenView={handleOpenViewExpenseModal}
              handleOpenAdd={handleOpenAddExpenseModal}
              setExpenseCategory={setExpenseCategory}
              handleDeleteBudget={handleDeleteBudget}
            />
          ))}
        </div>
        <ExpenseModal
          open={viewExpense}
          handleCloseModal={handleCloseViewExpenseModal}
          expenses={budgets.budgets.filter(
            (budget) => budget.id === expenseCategory
          )}
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
          budgets={budgets.budgets}
          expense={
            budgets.budgets.filter((budget) => budget.id === expenseCategory)[0]
          }
          handleCloseModal={handleCloseAddExpenseModal}
        />
      </div>
    </>
  );
}

export default App;
