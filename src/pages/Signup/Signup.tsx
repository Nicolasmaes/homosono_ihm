import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Signup from "../../components/signup/signup";
import "./Signup.css";

const SignupPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Inscription</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton menu="main-menu"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Signup />
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
