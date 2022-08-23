import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonToast,
} from "@ionic/react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";

/*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
 */
import { IonReactRouter } from "@ionic/react-router";
import { home, personCircleSharp, storefront } from "ionicons/icons";
import Accueil from "../../pages/Accueil/Accueil";
import Categories from "../../pages/Categories/Categories";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Users from "../../pages/Users/Users";
import Categorie from "../categorie/categorie";
import User from "../user/user";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./app.scss";

setupIonicReact();
/*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
 */

function AppComponent({ actionRegister, stateAuth, state }) {
  useEffect(() => {
    console.log(stateAuth);
  }, []);

  const [present] = useIonToast();

  const UsersTab = () => {
    if (stateAuth) {
      return (
        <>
          <IonMenuToggle>
            <IonItem routerLink="/users">
              <IonIcon icon={personCircleSharp} />
              <IonLabel className="ion-padding">Utilisateurs</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/signupLogin">
              <IonIcon icon={personCircleSharp} />
              <IonLabel className="ion-padding">Mon compte</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </>
      );
    }
  };
  const LogInLogOutButton = () => {
    if (stateAuth) {
      return (
        <IonMenuToggle>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            routerLink="/accueil"
            onClick={() => {
              actionRegister.logout();
              present("Vous êtes déconnecté.", 3000);
            }}
          >
            Déconnexion
          </IonButton>
        </IonMenuToggle>
      );
    } else {
      return (
        <IonMenuToggle>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            routerLink="/login"
          >
            Connexion
          </IonButton>
        </IonMenuToggle>
      );
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu menuId="main-menu" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/accueil">
                  <IonIcon icon={home} />
                  <IonLabel className="ion-padding">Accueil</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/categories">
                  <IonIcon icon={storefront} />
                  <IonLabel className="ion-padding">Catégories</IonLabel>
                </IonItem>
              </IonMenuToggle>
              {UsersTab()}
              {LogInLogOutButton()}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route exact path="/accueil">
            <Accueil />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/categorie/:id">
            <Categorie />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route exact path="/user/:id">
            <User />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/accueil" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateAuth: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
