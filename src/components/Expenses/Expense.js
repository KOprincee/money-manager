import { useState } from "react";

import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
import Modal from "../../modals/Modal";

const Expense = () => {
  const [showFormModal, setshowFormModal] = useState(false);
  const hideModal = () => {
    setshowFormModal(true);
  };

  return (
    <>
      <h3 className="mt-3">Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          {" "}
          <ExpenseList />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          {showFormModal && (
            <Modal onClose={hideModal}>
              <AddExpenseForm />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Expense;
