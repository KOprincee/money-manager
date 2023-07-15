import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";

const Header = () => {
  return (
    <div className="row mt-3">
      <div className="col-sm">
        <Budget />
      </div>
      <div className="col-sm">
        <Remaining />
      </div>
      <div className="col-sm">
        <ExpenseTotal />
      </div>
    </div>
  );
};

export default Header;
