import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonAlert,
} from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as usersAction from "../../redux/user/userAction";

import "./signup.scss";

function InscriptionComponent({ actionUsers, stateUser }) {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const newUser = {
    usrEmailUsr: emailUser,
    usrPasswordUsr: passwordUser,
  };

  useEffect(() => {
    actionUsers.getUsers();
  }, []);

  const formChecker = (newUser) => {
    if (newUser.usrEmailUsr === "") {
      presentAlert({
        header: "Identifiant vide",
        message: "Veuillez renseigner votre identifiant.",
        buttons: ["OK"],
      });
    } else if (newUser.usrPasswordUsr.length < 2) {
      presentAlert({
        header: "Mot de passe incomplet",
        message: "Votre mot de passe doit contenir minimum 8 caractères.",
        buttons: ["OK"],
      });
    } else {
      console.log(newUser);
      actionUsers.getAddUser(newUser, (res) => {
        if (res.status === 200) {
          console.log("OK");
          setEmailUser("");
          setPasswordUser("");
          history.push("/confirmation");
        } else if (
          res.data.message ===
          "L'identifiant est déjà utilisé, merci d'en choisir un autre."
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
      <div className="connexion ">
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Identifiant</IonLabel>
            <IonInput
              value={emailUser}
              clearInput
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
            className="ion-margin-top"
            type="submit"
            expand="block"
            onClick={() => {
              formChecker(newUser);
            }}
          >
            <IonIcon icon={sendSharp} />
          </IonButton>
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
  actionUsers: bindActionCreators(usersAction, dispatch),
});

const Inscription = connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionComponent);
export default Inscription;
