import {
  IonButton,
  useIonAlert,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Moment from "moment";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";

import "./accueil.scss";

export function sum(a, b) {
  return a + b;
}

function AccueilComponent({ actionRegister, stateAuth }) {
  const history = useHistory();
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  const intervalId = null;

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
    console.log("useIonic view will Leave event");
  });

  const decode = () => {
    const decoded = jwt_decode(localStorage.getItem("user"));
    console.log(decoded);

    console.log(
      Moment.unix(decoded.exp).toISOString() + " (format ISO du token)"
    );

    const date = new Date();
    console.log(date.toISOString() + " (format ISO de la date actuel)");

    // Comparison between the current date & time and the time when the token expires
    // https://programmingwithswift.com/how-to-compare-dates-with-typescript/
    // Greater than check toISOString()

    if (Moment.unix(decoded.exp).toISOString() > date.toISOString()) {
      console.log(
        "la date du token est posterieure a la date actuelle :  connecte"
      );
    } else {
      console.log(
        "la date du token est anterieure a la date actuelle :  deconnecte"
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
    <div className="accueil">
      <h1>Bienvenue sur HomeSono</h1>
      <h1>
        Cette version du front de HomeSono a été push vendredi midi, à voir
        vendredi aprem si elle a été redeployée par gitlab, et donc si je la
        vois en faisant docker compose up{" "}
      </h1>
      <h2>Phrase d'accroche</h2>
      {conditionalLinks()}
    </div>
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
