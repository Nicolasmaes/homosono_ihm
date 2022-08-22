import { IonButton } from "@ionic/react";
import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authAction from "../../redux/authorization/actions/auth";
import "./accueil.scss";

function AccueilComponent({ actionRegister, stateAuth, state }) {
  useEffect(() => {
    /*     console.log(state);
     */
  }, []);

  const dynamicLink = () => {
    if (localStorage.user) {
      return <h1>connecté</h1>;
    } else {
      return <h1>déconnecté</h1>;
    }
  };

  const logOutButton = () => {
    if (stateAuth) {
      return (
        <IonButton
          className="ion-margin-top"
          type="submit"
          expand="block"
          onClick={() => {
            actionRegister.logout();
          }}
        >
          se déconnecter
        </IonButton>
      );
    } else {
      return (
        <IonButton
          className="ion-margin-top"
          type="submit"
          expand="block"
          onClick={() => {
            actionRegister.logout();
          }}
        >
          se connecter
        </IonButton>
      );
    }
  };

  return (
    <>
      <div className="accueil ">
        <ion-list>
          {" "}
          Vous êtes
          {dynamicLink()}
        </ion-list>
        {logOutButton()}
      </div>
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
