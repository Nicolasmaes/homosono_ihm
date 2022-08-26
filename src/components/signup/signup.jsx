import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonAlert,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
} from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import * as usersAction from "../../redux/user/userAction";

import "./signup.scss";

function InscriptionComponent({ actionRegister, actionUsers }) {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const newUser = {
    email: emailUser,
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
    } else if (newUser.password.length < 2) {
      presentAlert({
        header: "Mot de passe incomplet",
        message: "Votre mot de passe doit contenir minimum 8 caractères.",
        buttons: ["OK"],
      });
    } else {
      console.log(newUser);
      actionRegister.register(newUser, (res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("OK");
          setEmailUser("");
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
        } else if (
          res.data.message ===
          "Cet e-mail est déjà utilisé, merci d'en renseigner un autre."
        ) {
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
                <div class="ion-text-center">
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
  actionUsers: bindActionCreators(usersAction, dispatch),
});

const Inscription = connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionComponent);
export default Inscription;
