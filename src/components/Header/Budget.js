import React, { useContext, useEffect, useState } from "react";
import getCookie from "../../context/getCookie";
import { AppContext } from "../../context/AppContext";
import Modal from "../../Modals/Modal";
import BudgetForm from "./BudgetForm";

const Budget = () => {
  const [showFormModal, setshowFormModal] = useState(false);
  const hideModal = () => {
    setshowFormModal(false);
  };

  const showModal = () => {
    setshowFormModal(true);
  };

  const { dispatch } = useContext(AppContext);
  const budget = getCookie("budget");
  useEffect(() => {
    dispatch({
      type: "ADD_BUDGET",
      payload: {
        budget,
      },
    });
  }, [budget, dispatch]);

  // const budget = getCookie("budget");
  return (
    <div className="alert alert-secondary">
      <span> Budget: {budget}</span>
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        onClick={showModal}
      >
        Edit
      </button>
      {showFormModal && (
        <Modal onClose={hideModal}>
          <BudgetForm onClose={hideModal} />
        </Modal>
      )}
    </div>
  );
};

export default Budget;
