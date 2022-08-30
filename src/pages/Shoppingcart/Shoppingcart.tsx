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
import Shoppingcart from "../../components/shoppingCart/shoppingCart";
import "./Shoppingcart.css";

const ShoppingcartPage: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle color="primary">Shoppingcart</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <Shoppingcart />
        </IonContent>
      </IonPage>
    </>
  );
};

export default ShoppingcartPage;
