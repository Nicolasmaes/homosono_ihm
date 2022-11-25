import {
  IonButton,
  useIonAlert,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonIcon,
  IonImg,
  IonSearchbar,
} from "@ionic/react";
import { playCircle } from "ionicons/icons";
import { connect } from "react-redux";
import { useState } from "react";
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
  const [searchText, setSearchText] = useState("");

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
            verification de l'exp du token
          </IonButton>
          {/* <IonButton
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
          </IonButton> */}
        </>
      );
    } else {
      return (
        <>
          {/* <IonButton className="ion-margin" type="submit" routerLink="/login">
            Connectez-vous pour en voir plus
          </IonButton> */}
        </>
      );
    }
  };

  return (
    <div className="accueil">
      <h1>HomeSono</h1>
      <IonButton
        className="ion-margin button"
        type="submit"
        expand="block"
        color="favorite"
        routerLink="/accueil"
      >
        <IonIcon slot="end" icon={playCircle} size="large" color="primary" />
        <h2>PROMOS</h2>
      </IonButton>
      <img
        src="https://i.postimg.cc/J7H6nM1z/logo.png"
        alt="illustration de la catégorie"
        className="imageReduce"
      />
      <IonSearchbar
        value={searchText}
        inputMode="search"
        showCancelButton="never"
        placeholder="Rechercher un produit"
        className="searchBar"
        color="medium"
      ></IonSearchbar>

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
