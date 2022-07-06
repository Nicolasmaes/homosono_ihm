import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Users from "../components/users/users";
import "./Users.css";
import React, { useState } from "react";

const Tab3: React.FC = () => {
  const [searchText, setSearchText] = useState("");

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

export default Tab3;
