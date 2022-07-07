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
import "./login.scss";

function ConnexionComponent({ actionUsers, stateUser }) {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const userToLog = {
    usrEmailUsr: emailUser,
    usrPasswordUsr: passwordUser,
  };
  useEffect(() => {
    actionUsers.getUsers();
  }, []);

  const formChecker = (userToLog) => {
    console.log(userToLog);
    actionUsers.postLogUser(userToLog, (res) => {
      console.log(res);
      localStorage.setItem("jean", "steven");
      if (res.status === 200) {
        console.log("OK");
        setEmailUser("");
        setPasswordUser("");
        // history.push("/confirmation");
      } else {
        console.log("NOT OK");
        // presentAlert({
        //   header: "Erreur",
        //   message:
        //     "Un problème a eu lieu lors de l'inscription, veuillez contacter l'administrateur.",
        //   buttons: ["OK"],
        // });
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
            className="ion-margin-top"
            type="submit"
            expand="block"
            onClick={() => {
              formChecker(userToLog);
            }}
          >
            <IonIcon icon={sendSharp} />
          </IonButton>
        </IonList>{" "}
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

const Connexion = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnexionComponent);
export default Connexion;
