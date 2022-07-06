import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, home, storefront, personCircleSharp } from "ionicons/icons";
import Accueil from "./pages/accueil";
import Categories from "./pages/Categories";
import Categorie from "./components/categorie/categorie";
import Users from "./pages/Users";
import User from "./components/user/user";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
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
          <Route exact path="/">
            <Redirect to="/accueil" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="top">
          <IonTabButton tab="accueil" href="/accueil">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/categories">
            <IonIcon icon={storefront} />
            <IonLabel>Catégories</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Users" href="/users">
            <IonIcon icon={personCircleSharp} />
            <IonLabel>Utilisateurs</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
