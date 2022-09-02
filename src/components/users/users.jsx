import {
  IonAlert,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { create, eye, trash } from "ionicons/icons";

import * as usersAction from "../../redux/user/userAction";
import "./users.scss";

function UsersComponent({ actionUsers, stateUser }) {
  const [presentAlert] = useIonAlert();

  const [createAlert, setCreateAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [usernameUser, setUsernameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    actionUsers.getUsers();
  }, []);

  const chooseValue = () => {
    return stateUser.users;
  };

  const usersList = () => {
    return chooseValue().map((e) => {
      return (
        <div className="singleCat">
          <IonItem>
            <IonLabel>{e.email}</IonLabel>
            <IonLabel>{e.username}</IonLabel>
            {/* <IonLabel>{e.usrRoleRolFK?.rolNameRol}</IonLabel> */}
            <IonButton routerLink={`user/${e.id}`} className="fancy-button">
              <IonIcon icon={eye} />
            </IonButton>
            <IonButton
              className="fancy-button-reverse"
              onClick={() => {
                setUsernameUser(e.username);
                setIdUser(e.id);
                setEmailUser(e.email);
                console.log(e);
                setUpdateAlert(true);
              }}
            >
              <IonIcon icon={create} />
            </IonButton>

            <IonButton
              className="fancy-button-reverse"
              onClick={() => {
                setUsernameUser(e.username);
                setIdUser(e.id);
                setDeleteAlert(true);
              }}
            >
              <IonIcon icon={trash} />
            </IonButton>
          </IonItem>
        </div>
      );
    });
  };

  return (
    <>
      <div className="users ion-margin">
        <div className="headingSection"></div>
        <IonButton
          className="ion-margin"
          expand="block"
          onClick={() => setCreateAlert(true)}
        >
          Créer un nouvel utilisateur
        </IonButton>
        <ion-list-header>
          <IonLabel color="dark">Login</IonLabel>
          <IonLabel color="dark">Mail</IonLabel>
        </ion-list-header>
        <ion-list>{usersList()}</ion-list>
        <IonAlert
          isOpen={createAlert}
          onDidDismiss={() => setCreateAlert(false)}
          header={"Nouvel utilisateur"}
          inputs={[
            {
              name: "username",
              type: "text",
              placeholder: "nom d'utilisateur",
            },
            {
              name: "email",
              type: "email",
              placeholder: "e-mail",
            },
            {
              name: "password",
              type: "password",
              placeholder: "mot de passe",
            },
          ]}
          buttons={[
            {
              text: "Annuler",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {},
            },
            {
              text: "Ajouter",
              handler: (body) => {
                console.log(body);
                actionUsers.getAddUser(body, (res) => {
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
                });
              },
            },
          ]}
        />
        <IonAlert
          isOpen={updateAlert}
          onDidDismiss={() => setUpdateAlert(false)}
          header={"Modifier " + usernameUser}
          inputs={[
            {
              name: "username",
              type: "text",
              value: usernameUser,
              placeholder: "nom d'utilisateur",
            },
            {
              name: "email",
              type: "email",
              value: emailUser,
              placeholder: "e-mail",
            },
          ]}
          buttons={[
            {
              text: "Annuler",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {},
            },
            {
              text: "Modifier",
              handler: (body) => {
                console.log(body);
                console.log(idUser);
                actionUsers.getUpdateUser(idUser, body, (res) => {
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
                });
              },
            },
          ]}
        />
        <IonAlert
          isOpen={deleteAlert}
          onDidDismiss={() => setDeleteAlert(false)}
          header={"Supprimer " + usernameUser + " ?"}
          buttons={[
            {
              text: "Annuler",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {},
            },
            {
              text: "Supprimer",
              handler: () => {
                actionUsers.getDeleteUser(idUser);
              },
            },
          ]}
        />
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

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);
export default Users;
