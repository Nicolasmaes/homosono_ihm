import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from /*   useIonAlert,
 */ "@ionic/react";
import Accueil from "../../components/accueil/accueil";
import "./Accueil.css";

const AccueilPage: React.FC = () => {
  /*   const [presentAlert] = useIonAlert();
   */
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
        <Accueil />
      </IonContent>
    </IonPage>
  );
};

export default AccueilPage;
