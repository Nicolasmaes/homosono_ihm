import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Categories from "../../components/categories/categories";
import "./Categories.css";
import React, { useRef } from "react";

const CategoriesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Catégories</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton menu="main-menu"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Categories />
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
