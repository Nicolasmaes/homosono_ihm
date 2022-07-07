import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Users from "../../components/users/users";
import "./Users.css";
import React from "react";

const UsersPage: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              Utilisateurs
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large" color="primary">
              Utilisateurs
            </IonTitle>
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
