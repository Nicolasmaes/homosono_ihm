import { setupIonicReact } from "@ionic/react";
import React from "react";

/*   setupIonicReact est utilisé pour bien rapatrier tout le style d'Ionic
https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
 */
import AppComponent from "./components/app/app";

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
import "./theme/variables.css";

setupIonicReact();
/*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
 */

const App: React.FC = () => {
  return <AppComponent />;
};

export default App;

// import { Redirect, Route } from "react-router-dom";
// import {
//   IonApp,
//   IonIcon,
//   IonLabel,
//   IonRouterOutlet,
//   IonTabBar,
//   IonTabButton,
//   IonTabs,
//   setupIonicReact,
// } from "@ionic/react";
// /*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
// https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
//  */
// import { IonReactRouter } from "@ionic/react-router";
// import { home, storefront, personCircleSharp } from "ionicons/icons";
// import Accueil from "./pages/Accueil/Accueil";
// import Categories from "./pages/Categories/Categories";
// import Categorie from "./components/categorie/categorie";
// import Users from "./pages/Users/Users";
// import User from "./components/user/user";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login";

// /* Core CSS required for Ionic components to work properly */
// import "@ionic/react/css/core.css";

// /* Basic CSS for apps built with Ionic */
// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

// /* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

// /* Theme variables */
// import "./theme/variables.css";

// setupIonicReact();
// /*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
// https://stackoverflow.com/questions/71351489/ionic-react-styles-not-rendering-even-after-importing-the-styles-in-app-js
//  */

// const App: React.FC = () => (
//   <IonApp>
//     <IonReactRouter>
//       <IonTabs>
//         <IonRouterOutlet>
//           <Route exact path="/accueil">
//             <Accueil />
//           </Route>
//           <Route exact path="/categories">
//             <Categories />
//           </Route>
//           <Route exact path="/categorie/:id">
//             <Categorie />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route exact path="/user/:id">
//             <User />
//           </Route>
//           <Route exact path="/signin">
//             <Signup />
//           </Route>
//           <Route exact path="/login">
//             <Login />
//           </Route>
//           <Route exact path="/">
//             <Redirect to="/accueil" />
//           </Route>
//         </IonRouterOutlet>

//         <IonTabBar slot="bottom">
//           <IonTabButton tab="accueil" href="/accueil">
//             <IonIcon icon={home} />
//             <IonLabel>Accueil</IonLabel>
//           </IonTabButton>
//           <IonTabButton tab="Categories" href="/categories">
//             <IonIcon icon={storefront} />
//             <IonLabel>Catégories</IonLabel>
//           </IonTabButton>
//           <IonTabButton tab="Users" href="/users">
//             <IonIcon icon={personCircleSharp} />
//             <IonLabel>Utilisateurs</IonLabel>
//           </IonTabButton>
//           <IonTabButton tab="login" href="/login">
//             <IonIcon icon={personCircleSharp} />
//             <IonLabel>Connexion</IonLabel>
//           </IonTabButton>
//         </IonTabBar>
//       </IonTabs>
//     </IonReactRouter>
//   </IonApp>
// );

// export default App;
