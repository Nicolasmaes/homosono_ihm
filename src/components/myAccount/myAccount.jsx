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
import { close, sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import * as usersAction from "../../redux/user/userAction";

import "./myAccount.scss";

function MyAccountComponent({ stateAuth, actionRegister, actionUsers }) {
  const history = useHistory();
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [updateBox, setUpdateBox] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [usernameUser, setUsernameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [firstNameUser, setFirstNameUser] = useState("");
  const [pictureUser, setPictureUser] = useState("");

  const userToUpdate = {
    email: emailUser,
    username: usernameUser,
    lastName: lastNameUser,
    firstName: firstNameUser,
    profile_picture: pictureUser,
  };

  useEffect(() => {
    actionRegister.whoami((response) => {
      console.log(response);
      if (response.status === 403) {
        console.log("token expiré");
        actionRegister.logout();
        present({
          message: "Vous êtes déconnecté.",
          duration: 2000,
          position: "top",
        });
      }
    });
  }, []);

  const updateForm = () => {
    if (updateBox) {
      return (
        <>
          <IonList className="ion-padding">
            <div className="test">
              <IonButton
                type="submit"
                slot="icon-only"
                onClick={() => {
                  setUpdateBox(false);
                }}
              >
                <IonIcon icon={close} size="large" slot="icon-only" />
              </IonButton>
            </div>
            <IonItem>
              <IonLabel position="floating">Identifiant</IonLabel>
              <IonInput
                value={usernameUser}
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.username}
                onIonChange={(e) => setUsernameUser(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">E-mail</IonLabel>
              <IonInput
                value={emailUser}
                type="email"
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.email}
                onIonChange={(e) => setEmailUser(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nom de famille</IonLabel>
              <IonInput
                value={lastNameUser}
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.lastName}
                onIonChange={(e) => setLastNameUser(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Prénom</IonLabel>
              <IonInput
                value={firstNameUser}
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.firstName}
                onIonChange={(e) => setFirstNameUser(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Photo de profil</IonLabel>
              <IonInput
                type="file"
                onIonChange={(e) => setPictureUser(e.detail.value)}
              ></IonInput>
            </IonItem>

            <IonButton
              className="ion-margin"
              type="submit"
              expand="block"
              onClick={() => {
                console.log(userToUpdate);
                actionUsers.getUpdateUser(
                  stateAuth.currentUserLoggedIn.id,
                  userToUpdate,
                  (res) => {
                    console.log(res);
                    if (res.status === 200) {
                      console.log("OK");
                    } else {
                      console.log("NOT OK");
                      presentAlert({
                        header: "Erreur",
                        message: res.data.message,
                        buttons: ["OK"],
                      });
                    }
                  }
                );
                setUsernameUser("");
                setEmailUser("");
                setLastNameUser("");
                setFirstNameUser("");
                setUpdateBox(false);
                setTimeout(() => {
                  actionRegister.whoami((response) => {
                    console.log(response);
                    console.log("whoami() apres mise à jour du user");
                  });
                }, "250");
              }}
            >
              <IonIcon icon={sendSharp} />
            </IonButton>
          </IonList>
        </>
      );
    }
    return (
      <>
        <IonButton
          className="ion-margin"
          type="submit"
          expand="block"
          onClick={() => {
            setUpdateBox(true);
            setUsernameUser(stateAuth.currentUserLoggedIn.username);
            setEmailUser(stateAuth.currentUserLoggedIn.email);
            setLastNameUser(stateAuth.currentUserLoggedIn.lastName);
            setFirstNameUser(stateAuth.currentUserLoggedIn.firstName);
            console.log(userToUpdate);
          }}
        >
          Modifier les informations
        </IonButton>
      </>
    );
  };

  return (
    <>
      <div className="myAccount ion-margin">
        Username : <h1>{stateAuth.currentUserLoggedIn?.username}</h1>
        E-mail : <h1>{stateAuth.currentUserLoggedIn?.email}</h1>
        Last Name : <h1>{stateAuth.currentUserLoggedIn?.lastName}</h1>
        FirstName : <h1>{stateAuth.currentUserLoggedIn?.firstName}</h1>
        {updateForm()}
        <IonButton
          className="ion-margin"
          color={"danger"}
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
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  stateAuth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
  actionUsers: bindActionCreators(usersAction, dispatch),
});

const MyAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccountComponent);
export default MyAccount;
