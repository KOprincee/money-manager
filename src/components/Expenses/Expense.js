import { useState } from "react";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
import Modal from "../../modals/Modal";

const Expense = () => {
  const [showFormModal, setshowFormModal] = useState(false);
  const hideModal = () => {
    setshowFormModal(false);
  };

  const showModal = () => {
    setshowFormModal(true);
  };

  return (
    <>
      <h3 className="mt-3">
        Expenses{" "}
        <button className="btn btn-primary btn-sm" onClick={showModal}>
          Add
        </button>
      </h3>
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
              <AddExpenseForm onClose={hideModal} />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Expense;
