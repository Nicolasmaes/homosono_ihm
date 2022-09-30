import {
  IonButton,
  useIonToast,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  useIonAlert,
} from "@ionic/react";
import { useEffect } from "react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import jwt_decode from "jwt-decode";
import Moment from "moment";

import "./accueil.scss";

function AccueilComponent({ actionRegister, stateAuth }) {
  const history = useHistory();
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  var intervalId = null;

  useIonViewDidEnter(() => {
    console.log("useIonic view Did Enter event");
    // intervalId = setInterval(() => {
    //   console.log("verification");
    //   var decoded = jwt_decode(localStorage.getItem("user"));
    //   console.log("TIMESTAMP DU TOKEN : " + decoded.exp);

    //   const expirationDuToken = Moment.unix(decoded.exp).format(
    //     "D/MM/YYYY HH:mm:ss"
    //   );
    //   console.log("HEURE D'EXPIRATION : " + expirationDuToken);

    //   const formatDate = Moment().format("D/MM/YYYY HH:mm:ss");
    //   console.log("HEURE ACTUELLE : " + formatDate);
    //   console.log("HEURE ACTUELLE  en timestamp : " + Date.now());
    // }, 1000);
  });

  /*   useIonViewDidLeave(() => {
    console.log("ionic view Did Leave event");
  });

  useIonViewWillEnter(() => {
    console.log("ionVic view will Enter event");
  }); */

  useIonViewWillLeave(() => {
    console.log("useIonVic view will Leave event");
    clearInterval(intervalId);
    console.log("Le décompte s'est arrêté");
  });

  const decode = () => {
    var decoded = jwt_decode(localStorage.getItem("user"));
    // console.log(decoded.exp);

    const formatDate = Moment().format("D/MM/YYYY HH:mm:ss");
    // console.log(formatDate + " (date et heure a l'instant T)");
    console.log(Moment.unix(decoded.exp).toISOString() + " (ISO du token)");

    const expirationDuToken = Moment.unix(decoded.exp).format(
      "D/MM/YYYY HH:mm:ss"
    );
    // console.log(expirationDuToken + " (date et heure d'expiration du token)");

    const date = new Date();
    console.log(date.toISOString() + " (ISO actuel)");

    // Comparison between the current date & time and the time when the token expires
    // 3. Greater than check toISOString()
    if (Moment.unix(decoded.exp).toISOString() > date.toISOString()) {
      console.log("token greater than current date: toISOString(), connecté");
    } else {
      console.log(
        "token is not greater than current date: toISOString(), déconnecté"
      );
      actionRegister.logout();
      presentAlert({
        header: "Vous êtes déconnecté",
        buttons: [
          {
            text: "Se reconnecter",
            handler: () => {
              history.push("/login");
            },
          },
          {
            text: "Page d'accueil",
            handler: () => {
              history.push("/accueil");
            },
          },
        ],
      });
    }
  };

  const conditionalLinks = () => {
    if (stateAuth.isLoggedIn) {
      return (
        <>
          <h1>Bienvenue {stateAuth.currentUserLoggedIn?.username}</h1>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            onClick={() => {
              decode();
            }}
          >
            click me
          </IonButton>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            routerLink="/accueil"
            onClick={() => {
              actionRegister.logout();
              present({
                message: "Vous êtes déconnecté",
                duration: 1000,
                position: "top",
              });
            }}
          >
            Déconnexion
          </IonButton>
        </>
      );
    } else {
      return (
        <>
          <IonButton className="ion-margin" type="submit" routerLink="/login">
            Connectez-vous pour en voir plus
          </IonButton>
        </>
      );
    }
  };

  return (
    <>
      <h1>Bienvenue sur HomeSono</h1>
      <h2>Phrase d'accroche</h2>
      {conditionalLinks()}
    </>
  );
}

const mapStateToProps = (state) => ({
  stateAuth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
});

const Accueil = connect(mapStateToProps, mapDispatchToProps)(AccueilComponent);
export default Accueil;
