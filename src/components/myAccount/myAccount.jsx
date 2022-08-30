import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonToast,
} from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";
import * as usersAction from "../../redux/user/userAction";
import "./myAccount.scss";

function MyAccountComponent({ stateAuth, actionRegister, actionUsers }) {
  const [present] = useIonToast();

  const [updateBox, setUpdateBox] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [usernameUser, setUsernameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [firstNameUser, setFirstNameUser] = useState("");

  const userToUpdate = {
    email: emailUser,
    username: usernameUser,
    lastName: lastNameUser,
    firstName: firstNameUser,
  };

  useEffect(() => {
    actionRegister.whoami();
  }, []);

  const updateForm = () => {
    if (updateBox) {
      return (
        <>
          <IonList className="ion-padding">
            <IonButton
              className="ion-margin"
              type="submit"
              expand="block"
              onClick={() => {
                setUpdateBox(false);
              }}
            >
              Fermer le formulaire
            </IonButton>
            <IonItem>
              <IonLabel position="floating">E-mail</IonLabel>
              <IonInput
                value={emailUser}
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.email}
                onIonChange={(e) => setEmailUser(e.detail.value)}
              ></IonInput>
            </IonItem>
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
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput
                value={lastNameUser}
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.lastName}
                onIonChange={(e) => setLastNameUser(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput
                value={firstNameUser}
                clearInput
                placeholder={stateAuth.currentUserLoggedIn.firstName}
                onIonChange={(e) => setFirstNameUser(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonButton
              className="ion-margin"
              type="submit"
              expand="block"
              onClick={() => {
                setUpdateBox(false);
                console.log(userToUpdate);
                actionUsers.getUpdateUser(
                  stateAuth.currentUserLoggedIn.id,
                  userToUpdate
                );
                setUsernameUser("");
                setEmailUser("");
                setLastNameUser("");
                setFirstNameUser("");
                setTimeout(() => {
                  actionRegister.whoami();
                }, "100");
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
