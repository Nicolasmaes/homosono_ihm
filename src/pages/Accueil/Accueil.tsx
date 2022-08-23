import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from /*   useIonAlert,
 */ "@ionic/react";
import Accueil from "../../components/accueil/accueil";
import "./Accueil.css";

const AccueilPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Accueil</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton menu="main-menu"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <Accueil />
      </IonContent>
    </IonPage>
  );
};

export default AccueilPage;
