import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as usersAction from "../../redux/user/userAction";
import {
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
} from "@ionic/react";

import { NavLink } from "react-router-dom";
import "./user.scss";
import { getUserById } from "../../redux/user/userReducer";

function UserComponent({ actionUsers, stateUser }) {
  const params = useParams();
  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    console.log("page affichée");
    setSingleUser(getUserById(stateUser, parseInt(params.id)));
  }, [params]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Utilisateur</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <NavLink to="/users">
            <IonButton
              shape="round"
              color="primary"
              onClick={() => {
                actionUsers.selectCategory("");
              }}
            >
              <ion-label color="light">Retour aux utilisateurs</ion-label>
            </IonButton>
          </NavLink>
          <p>{singleUser.usrLoginUsr}</p>
        </IonContent>
      </IonPage>
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

const User = connect(mapStateToProps, mapDispatchToProps)(UserComponent);
export default User;
