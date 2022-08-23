import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Users from "../../components/users/users";
import "./Users.css";

const UsersPage: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle color="primary">Utilisateurs</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <Users />
        </IonContent>
      </IonPage>
    </>
  );
};

export default UsersPage;
