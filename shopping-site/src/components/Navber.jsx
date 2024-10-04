import React from "react";
import { useSelector } from "react-redux";
import { CartIcon } from "../HeroIcons";

const Navber = () => {
  const { amount } = useSelector((store) => store.cart); //分割代入が一般的
  // const amount = useSelector((store) => store.cart.amount)でも動く
  console.log(amount);
  return (
    <nav>
      <div className="nav-center">
        <h3>Redux Shopping</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
