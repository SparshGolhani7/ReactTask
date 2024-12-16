import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function ShowModal1({ setShowModal1, category }) {

  const getCategoryExpenses = () => {
    const expenses = JSON.parse(localStorage.getItem(category?.title) || '[]');
    return expenses;
  };


  const calculateTotal = () => {
    const expenses = getCategoryExpenses();
    return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
  };

  const expenses = getCategoryExpenses();
  const totalExpense = calculateTotal();

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {category?.title} Expenses
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal1(false)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="total-expense mb-4">
              <h6>Total {category?.title} Expenses: ₹{totalExpense}</h6>
            </div>

            {expenses.length === 0 ? (
              <p>No expenses recorded yet.</p>
            ) : (
              <div className="expense-list">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{moment(expense.date).format('DD-MM-YYYY')}</td>
                        <td>Rs{expense.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal1(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowModal1;
