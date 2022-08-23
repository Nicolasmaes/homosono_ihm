import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import "./login.scss";

function ConnexionComponent({ actionRegister, stateAuth, state }) {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const userToLog = {
    usrEmailUsr: emailUser,
    usrPasswordUsr: passwordUser,
  };
  const [present] = useIonToast();

  useEffect(() => {}, []);

  const formChecker = (userToLog) => {
    console.log(userToLog);
    actionRegister.login(userToLog, (res) => {
      if (res.status === 200) {
        console.log("OK");
        setEmailUser("");
        setPasswordUser("");
        history.push("/accueil");
        present("Vous êtes connecté.", 3000);
      } else {
        console.log("NOT OK");
        presentAlert({
          header: "Erreur",
          message:
            "Un problème a eu lieu lors de la connexion. Veuillez contacter l'administrateur du site.",
          buttons: ["OK"],
        });
      }
    });
  };

  return (
    <>
      <div className="connexion ">
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Identifiant</IonLabel>
            <IonInput
              value={emailUser}
              clearInput
              clearOnEdit
              onIonChange={(e) => setEmailUser(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mot de passe</IonLabel>
            <IonInput
              value={passwordUser}
              clearInput
              type="password"
              onIonChange={(e) => setPasswordUser(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            onClick={() => {
              formChecker(userToLog);
            }}
          >
            <IonIcon icon={sendSharp} />
          </IonButton>
        </IonList>
        <IonList className="ion-padding">
          <p>Vous n'avez pas encore de compte ?</p>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            routerLink="/signup"
          >
            Inscrivez-vous ici{" "}
          </IonButton>{" "}
        </IonList>
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

const Connexion = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnexionComponent);
export default Connexion;
