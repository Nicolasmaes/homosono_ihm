import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as shoppingCartAction from "../../redux/";
import "./shoppingCart.scss";

function ShoppingcartComponent({ state }) {
  useEffect(() => {}, []);

  return (
    <>
      <div className="shoppingCart ion-margin">
        <h1>shoppingCart</h1>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateShoppingcart: state.shoppingCartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  //actionShoppingcart: bindActionCreators(shoppingCartAction, dispatch),
});

const Shoppingcart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingcartComponent);
export default Shoppingcart;
