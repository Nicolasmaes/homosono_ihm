import { setupIonicReact } from "@ionic/react";
import React from "react";

/*   setupIonicReact est utilisé pour bien raptrier tout le style d'Ionic
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
