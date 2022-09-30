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
} from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";

import "./signup.scss";

function InscriptionComponent({ actionRegister }) {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [emailUser, setEmailUser] = useState("");
  const [usernameUser, setUsernameUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const newUser = {
    email: emailUser,
    username: usernameUser,
    password: passwordUser,
  };

  useEffect(() => {}, []);

  const formChecker = (newUser) => {
    if (newUser.email === "") {
      presentAlert({
        header: "E-mail non renseigné",
        message: "Merci de renseigner votre e-mail.",
        buttons: ["OK"],
      });
    } else if (newUser.login === "") {
      presentAlert({
        header: "Identifiant non renseigné",
        message: "Merci de renseigner un identifiant.",
        buttons: ["OK"],
      });
    } else if (newUser.password.length < 2) {
      presentAlert({
        header: "Mot de passe incomplet",
        message: "Votre mot de passe doit contenir minimum 8 caractères.",
        buttons: ["OK"],
      });
    } else {
      console.log(newUser);
      actionRegister.register(newUser, (res) => {
        if (res.status === 200) {
          console.log("OK");
          setEmailUser("");
          setUsernameUser("");
          setPasswordUser("");
          presentAlert({
            header: "Vous êtes bien inscrit !",
            buttons: [
              {
                text: "Page de connexion",
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
        } else {
          console.log("NOT OK");
          presentAlert({
            header: "Erreur",
            message: res.data.message,
            buttons: ["OK"],
          });
        }
      });
    }
  };

  return (
    <>
      <div className="inscription ">
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput
              value={emailUser}
              clearInput
              type="text"
              onIonChange={(e) => setEmailUser(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Identifiant</IonLabel>
            <IonInput
              value={usernameUser}
              clearInput
              type="text"
              onIonChange={(e) => setUsernameUser(e.detail.value)}
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
            slot="icon-only"
            expand="block"
            onClick={() => {
              formChecker(newUser);
            }}
          >
            <IonIcon icon={sendSharp} className="ion-padding" />
          </IonButton>
        </IonList>
        <IonList className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <div className="ion-text-center">
                  <p>Vous avez déjà un compte ?</p>
                  <IonRouterLink routerLink="/login">
                    Connectez-vous ici
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
  stateUser: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
});

const Inscription = connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionComponent);
export default Inscription;
