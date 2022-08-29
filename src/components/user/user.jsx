import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as usersAction from "../../redux/user/userAction";

import { getUserById } from "../../redux/user/userReducer";
import "./user.scss";

function UserComponent({ actionUsers, stateUser }) {
  const params = useParams();
  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    console.log(singleUser);
    setSingleUser(getUserById(stateUser, parseInt(params.id)));
  }, [params]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle color="primary">Utilisateur</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonButton color="primary" routerLink="/users" className="ion-margin">
            <IonLabel color="light">Retour aux utilisateurs</IonLabel>
          </IonButton>
          <p>{singleUser.email}</p>
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
