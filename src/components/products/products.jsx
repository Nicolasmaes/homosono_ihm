import { useEffect } from "react";
import { connect } from "react-redux";
//import * as productsAction from "../../redux/";
import "./products.scss";

function ProductsComponent({ stateProducts, actionProducts }) {
  useEffect(() => {}, []);

  return (
    <>
      <div className="products ">
        <h1>products</h1>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateProducts: state.productsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  //actionProducts: bindActionCreators(productsAction, dispatch),
});

const Products = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsComponent);
export default Products;
