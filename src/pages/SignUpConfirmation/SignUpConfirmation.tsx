import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./SignUpConfirmation.css";

const SignUpConfirmationPage: React.FC = () => {
  const history = useHistory();

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
      <IonContent fullscreen className="ion-padding">
        <h1>Vous êtes bien inscrits</h1>
        <IonButton
          className="ion-margin-top"
          type="submit"
          expand="block"
          onClick={() => {
            history.push("/accueil");
          }}
        >
          Retour à l'accueil
        </IonButton>
        <IonButton
          className="ion-margin-top"
          type="submit"
          expand="block"
          onClick={() => {
            history.push("/login");
          }}
        >
          Page de connexion
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignUpConfirmationPage;
