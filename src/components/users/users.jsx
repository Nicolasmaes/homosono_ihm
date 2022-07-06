import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonButton,
  useIonAlert,
  IonAlert,
} from "@ionic/react";
import {
  eye,
  create,
  trash,
  square,
  triangle,
  home,
  storefront,
  personCircleSharp,
} from "ionicons/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import * as usersAction from "../../redux/user/userAction";
import "./users.scss";
import { act } from "@testing-library/react";

function UsersComponent({ actionUsers, stateUser }) {
  const [createAlert, setCreateAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    actionUsers.getUsers();
  }, []);

  const chooseValue = () => {
    return stateUser.users;
  };

  const dynamicLink = () => {
    return chooseValue().map((e) => {
      return (
        <div className="singleCat">
          <IonItem>
            <ion-label>{e.usrLoginUsr}</ion-label>
            <NavLink to={`user/${e.usrIdUsrPK}`}>
              <IonButton className="fancy-button" onClick={() => {}}>
                <IonIcon icon={eye} />
              </IonButton>
            </NavLink>
            <NavLink to="/users">
              <IonButton
                className="fancy-button-reverse"
                onClick={() => {
                  setLoginUser(e.usrLoginUsr);
                  setIdUser(e.usrIdUsrPK);
                  setEmailUser(e.usrEmailUsr);
                  setPasswordUser(e.usrPasswordUsr);
                  console.log(e);
                  setUpdateAlert(true);
                }}
              >
                <IonIcon icon={create} />
              </IonButton>
            </NavLink>
            <NavLink to="/users">
              <IonButton
                className="fancy-button-reverse"
                onClick={() => {
                  setLoginUser(e.usrLoginUsr);
                  setIdUser(e.usrIdUsrPK);
                  setDeleteAlert(true);
                }}
              >
                <IonIcon icon={trash} />
              </IonButton>
            </NavLink>
          </IonItem>
        </div>
      );
    });
  };

  return (
    <>
      <div className="users container">
        <div className="headingSection">
          <IonButton
            onClick={() => setCreateAlert(true)}
            expand="full"
            color="secondary"
            shape="round"
            strong="true"
          >
            Créer un nouvel utilisateur
          </IonButton>
        </div>
        <ion-list>{dynamicLink()}</ion-list>
        <IonAlert
          isOpen={createAlert}
          onDidDismiss={() => setCreateAlert(false)}
          header={"Nouvel utilisateur"}
          inputs={[
            {
              name: "usrLoginUsr",
              type: "text",
              placeholder: "nom d'utilisateur",
            },
            {
              name: "usrEmailUsr",
              type: "email",
              placeholder: "e-mail",
            },
            {
              name: "usrPasswordUsr",
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
                actionUsers.getAddUser(body);
              },
            },
          ]}
        />
        <IonAlert
          isOpen={updateAlert}
          onDidDismiss={() => setUpdateAlert(false)}
          header={"Modifier " + loginUser}
          inputs={[
            {
              name: "usrLoginUsr",
              type: "text",
              value: loginUser,
              placeholder: "nom d'utilisateur",
            },
            {
              name: "usrEmailUsr",
              type: "email",
              value: emailUser,
              placeholder: "e-mail",
            },
            {
              name: "usrPasswordUsr",
              type: "password",
              value: passwordUser,
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
              text: "Modifier",
              handler: (body) => {
                // let emojiToString = name.emoji.codePointAt(0);
                actionUsers.getUpdateUser(idUser, body);
              },
            },
          ]}
        />
        <IonAlert
          isOpen={deleteAlert}
          onDidDismiss={() => setDeleteAlert(false)}
          header={"Supprimer " + loginUser + " ?"}
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
