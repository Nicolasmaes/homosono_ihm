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
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonAlert,
  useIonToast,
} from "@ionic/react";

import { connect } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";

import { bindActionCreators } from "redux";
import * as authAction from "../../redux/authorization/actions/auth";

/*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
 */
import { IonReactRouter } from "@ionic/react-router";
import {
  cart,
  close,
  home,
  logIn,
  logOut,
  peopleCircle,
  personCircle,
  storefront,
  pricetags,
  person,
  documentText,
  help,
  mailUnread,
} from "ionicons/icons";
import Accueil from "../../pages/Accueil/Accueil";
import Categories from "../../pages/Categories/Categories";
import Login from "../../pages/Login/Login";
import MyAccount from "../../pages/MyAccount/MyAccount";
import Shoppingcart from "../../pages/Shoppingcart/Shoppingcart";
import Signup from "../../pages/Signup/Signup";
import Users from "../../pages/Users/Users";
import Categorie from "../category/category";
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

function AppComponent({ state, stateAuth, actionRegister }) {
  const history = useHistory();
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  const AdminMenu = () => {
    if (
      stateAuth.isLoggedIn &&
      stateAuth.currentUserLoggedIn?.role === "ADMIN"
    ) {
      return (
        <>
          <IonMenuToggle>
            <IonItem routerLink="/users">
              <IonIcon icon={peopleCircle} />
              <IonLabel className="ion-margin">Utilisateurs</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </>
      );
    }
  };

  const AdminTabUsers = () => {
    if (
      stateAuth.isLoggedIn &&
      stateAuth.currentUserLoggedIn?.role === "ADMIN"
    ) {
      return (
        <IonTabButton tab="users" href="/users">
          <IonIcon icon={peopleCircle} />
          <IonLabel>Users</IonLabel>
        </IonTabButton>
      );
    }
  };

  const LoggedInTab = () => {
    if (stateAuth.isLoggedIn) {
      return (
        <IonTabButton tab="myaccount" href="/myaccount">
          <IonIcon icon={personCircle} />
          <IonLabel>Mon compte</IonLabel>
        </IonTabButton>
      );
    }
    return (
      <IonTabButton tab="login" href="/login">
        <IonIcon icon={personCircle} />
        <IonLabel>Mon compte</IonLabel>
      </IonTabButton>
    );
  };

  const LogInLogOutButton = () => {
    if (stateAuth.isLoggedIn) {
      return (
        <IonMenuToggle>
          <IonButton
            className="ion-margin"
            type="submit"
            expand="block"
            routerLink="/accueil"
            onClick={() => {
              actionRegister.logout();
              present({
                message: "Vous êtes déconnecté",
                duration: 1000,
                position: "top",
              });
            }}
          >
            <IonIcon slot="start" icon={logOut} />
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
            <IonIcon slot="start" icon={logIn} />
            Connexion
          </IonButton>
        </IonMenuToggle>
      );
    }
  };

  return (
    <IonReactRouter>
      <IonMenu menuId="main-menu" contentId="main">
        <IonHeader>
          <IonMenuToggle>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
              <IonIcon
                icon={close}
                size="large"
                slot="end"
                className="ion-margin"
                color="primary"
              />
            </IonToolbar>
          </IonMenuToggle>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink="/accueil">
                <IonIcon icon={home} />
                <IonLabel className="ion-margin">Accueil</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/categories">
                <IonIcon icon={storefront} />
                <IonLabel className="ion-margin">Catégories</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/categories">
                <IonIcon icon={person} />
                <IonLabel className="ion-margin">Mes infos</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/categories">
                <IonIcon icon={pricetags} />
                <IonLabel className="ion-margin">Mes commandes</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/shoppingcart">
                <IonIcon icon={cart} />
                <IonLabel className="ion-margin">Panier</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/categories">
                <IonIcon icon={documentText} />
                <IonLabel className="ion-margin">Mentions légales</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/categories">
                <IonIcon icon={help} />
                <IonLabel className="ion-margin">FAQ</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/categories">
                <IonIcon icon={mailUnread} />
                <IonLabel className="ion-margin">Nous contacter</IonLabel>
              </IonItem>
            </IonMenuToggle>
            {AdminMenu()}
            {LogInLogOutButton()}
          </IonList>
        </IonContent>
      </IonMenu>
      <IonTabs>
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
          <Route exact path="/myaccount">
            <MyAccount />
          </Route>
          <Route exact path="/shoppingcart">
            <Shoppingcart />
          </Route>
          <Route exact path="/">
            <Redirect to="/accueil" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="accueil" href="/accueil">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Categories" href="/categories">
            <IonIcon icon={storefront} />
            <IonLabel>Catégories</IonLabel>
          </IonTabButton>
          {AdminTabUsers()}
          {LoggedInTab()}
          <IonTabButton tab="shoppingcart" href="/shoppingcart">
            <IonIcon icon={cart} />
            <IonLabel>Panier</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateAuth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionRegister: bindActionCreators(authAction, dispatch),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
