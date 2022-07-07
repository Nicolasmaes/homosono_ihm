import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as usersAction from "../../redux/user/userAction";

import { NavLink } from "react-router-dom";
import { getUserById } from "../../redux/user/userReducer";
import "./user.scss";

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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              Utilisateur
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large" color="primary">
              Utilisateur
            </IonTitle>
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
          <p>{singleUser.usrEmailUsr}</p>
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
