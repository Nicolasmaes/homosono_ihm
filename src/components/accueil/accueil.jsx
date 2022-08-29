import { IonButton, useIonToast } from "@ionic/react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import "./accueil.scss";

function AccueilComponent({ actionRegister, stateAuth, state }) {
  useEffect(() => {}, []);
  const [present] = useIonToast();

  const conditionalLinks = () => {
    if (stateAuth.isLoggedIn) {
      return (
        <>
          <h1>Bienvenue {stateAuth.currentUserLoggedIn.username}</h1>
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
      <IonButton
        className="ion-margin"
        type="submit"
        expand="block"
        routerLink="/accueil"
        onClick={() => {
          console.log(stateAuth);
        }}
      >
        Bouton utile{" "}
      </IonButton>
      {conditionalLinks()}
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateAuth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
});

const Accueil = connect(mapStateToProps, mapDispatchToProps)(AccueilComponent);
export default Accueil;
