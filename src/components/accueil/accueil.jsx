import { IonButton, IonLabel } from "@ionic/react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import * as usersAction from "../../redux/user/userAction";

import "./accueil.scss";

function AccueilComponent({
  actionRegister,
  stateAuth,
  state,
  actionUsers,
  stateUser,
}) {
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

  const whoami = () => {
    actionUsers.whoami(() => {});
  };

  return (
    <>
      <h1>Bienvenue sur HomeSono</h1>
      <h2>Phrase d'accroche</h2>
      {dynamicLink()}
      <IonButton
        className="ion-margin"
        type="submit"
        expand="block"
        onClick={() => {
          whoami();
          console.log(stateUser.currentUserLoggedIn.email);
        }}
      >
        Qui suis-je
      </IonButton>
      {stateUser.currentUserLoggedIn.email}
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateAuth: state.authReducer.isLoggedIn,
  stateUser: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
  actionUsers: bindActionCreators(usersAction, dispatch),
});

const Accueil = connect(mapStateToProps, mapDispatchToProps)(AccueilComponent);
export default Accueil;
