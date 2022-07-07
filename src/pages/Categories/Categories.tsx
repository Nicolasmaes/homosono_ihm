import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Categories from "../../components/categories/categories";

import "./Categories.css";

const CategoriesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large" color="primary">
            Catégories
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large" color="primary">
            Catégories
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Categories />
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
