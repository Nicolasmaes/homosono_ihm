import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Accueil.css";

const AccueilPage: React.FC = () => {
  const [presentAlert] = useIonAlert();

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

export default AccueilPage;
