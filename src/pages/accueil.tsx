import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Categories from "../components/categories/categories";
import "./accueil.css";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large" color="primary">
            Accueil
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large" color="primary">
            Accueil
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Bienvenue sur HomeSono</h1>
        <h2>Phrase d'accroche</h2>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
