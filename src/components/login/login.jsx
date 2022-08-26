import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonAlert,
  useIonToast,
  IonRouterLink,
  IonGrid,
  IonRow,
  IonCol,
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
  const [loginUser, setLoginUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const userToLog = {
    email: loginUser,
    password: passwordUser,
  };
  const [present] = useIonToast();

  useEffect(() => {}, []);

  const formChecker = (userToLog) => {
    console.log(userToLog);
    if (userToLog.email === "") {
      presentAlert({
        header: "E-mail non renseigné",
        message: "Merci de renseigner votre e-mail.",
        buttons: ["OK"],
      });
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
        setLoginUser("");
        setPasswordUser("");
        history.push("/accueil");
        present({
          message: "Vous êtes connecté",
          duration: 1000,
          position: "top",
        });
      } else if (res.data.message === "Cet e-mail est inconnu") {
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
  };

  return (
    <>
      <div className="connexion ">
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput
              value={loginUser}
              clearInput
              clearOnEdit
              onIonChange={(e) => setLoginUser(e.detail.value)}
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
          <IonGrid>
            <IonRow>
              <IonCol>
                <div class="ion-text-center">
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
