import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import React from "react";
import MyAccount from "../../components/myAccount/myAccount";
import * as authAction from "../../redux/authorization/actions/auth";
import { RefresherEventDetail } from "@ionic/core";
import "./MyAccount.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dispatch } from "redux";

const MyAccountPage: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle color="primary">Mon compte</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <MyAccount />
        </IonContent>
      </IonPage>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  stateAuth: state.authReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actionRegister: bindActionCreators(authAction, dispatch),
  };
};

const MyAccountPageFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccountPage);

export default MyAccountPage;
