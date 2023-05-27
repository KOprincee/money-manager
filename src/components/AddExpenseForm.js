import React from "react";

const AddExpenseForm = () => {
  return (
    <form>
      <div className="row">
        <div className="col-sm">
          <label for="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
          ></input>
        </div>
        <div className="col-sm">
          <label for="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
          ></input>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default AddExpenseForm;
