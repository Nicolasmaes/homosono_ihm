import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRouterLink,
  IonRow,
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

export const util = { sum: null, formchecker: null };

export const sumTest = (a, b) => {
  return util.sum(a, b);
};

export const formCheckerTest = (userTest) => {
  return util.formchecker(userTest);
};

function ConnexionComponent({ actionRegister }) {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();
  const [usernameOrEmailUser, setUsernameOrEmaiUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const userToLog = {
    param: usernameOrEmailUser,
    password: passwordUser,
  };

  useEffect(() => {}, []);

  util.formchecker = (userToLog) => {
    console.log(userToLog);
    if (userToLog.param === "") {
      presentAlert({
        header: "Identifiant ou e-mail non renseigné",
        message: "Merci de renseigner le champ.",
        buttons: ["OK"],
      });
      return "missing e-mail";
    } else if (userToLog.password === "") {
      presentAlert({
        header: "Mot de passe non renseigné",
        message: "Merci de renseigner votre mot de passe.",
        buttons: ["OK"],
      });
    }
    actionRegister.login(userToLog, (res) => {
      if (res.status === 403) {
        console.log("NOT OK");
        presentAlert({
          header: "Erreur d'authentification",
          message: "Mot de passe erroné",
          buttons: ["OK"],
        });
      } else if (res.status === 200) {
        console.log("OK");
        setUsernameOrEmaiUser("");
        setPasswordUser("");
        history.push("/accueil");
        actionRegister.whoami((response) => {
          present({
            message: "Vous êtes connecté.",
            duration: 1000,
            position: "top",
          });
        });
      } else if (res.data.message === "Cet utilisateur est inconnu") {
        console.log("NOT OK");
        presentAlert({
          header: "Erreur",
          message: res.data.message,
          buttons: ["OK"],
        });
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
    return "all fields are filled";
  };

  util.sum = (a, b) => {
    const result = a + b;
    if (result !== 10) {
      presentAlert({
        header: "Mauvais calcul",
        buttons: ["OK"],
      });
      return "error";
    } else {
      presentAlert({
        header: "Bon calcul",
        buttons: ["OK"],
      });
      return "success";
    }
  };

  return (
    <>
      <div className="connexion ">
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Identifiant ou e-mail</IonLabel>
            <IonInput
              value={usernameOrEmailUser}
              clearInput
              clearOnEdit
              onIonChange={(e) => setUsernameOrEmaiUser(e.detail.value)}
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
              util.formchecker(userToLog);
            }}
          >
            <IonIcon icon={sendSharp} />
          </IonButton>
        </IonList>
        <IonList className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <div className="ion-text-center">
                  <p>Vous n'avez pas encore de compte ?</p>
                  <IonRouterLink routerLink="/signup">
                    Inscrivez-vous ici
                  </IonRouterLink>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
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
