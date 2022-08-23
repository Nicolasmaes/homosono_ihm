import { IonButton } from "@ionic/react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import "./accueil.scss";

function AccueilComponent({ actionRegister, stateAuth, state }) {
  useEffect(() => {
    /*     console.log(state);
     */
  }, []);

  const dynamicLink = () => {
    if (stateAuth) {
      return <h1>Bienvenue {}</h1>;
    } else {
      return (
        <IonButton className="ion-margin" type="submit" routerLink="/login">
          Connectez-vous pour en voir plus
        </IonButton>
      );
    }
  };

  return (
    <>
      <h1>Bienvenue sur HomeSono</h1>
      <h2>Phrase d'accroche</h2>
      {dynamicLink()}
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateAuth: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
});

const Accueil = connect(mapStateToProps, mapDispatchToProps)(AccueilComponent);
export default Accueil;
