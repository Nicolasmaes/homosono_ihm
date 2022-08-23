import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as categorieAction from "../../redux/categorie/categorieAction";

import { getCatById } from "../../redux/categorie/categorieReducer";
import "./categorie.scss";

function CategorieComponent({ stateCategorie, actionCategorie }) {
  const params = useParams();
  const [singleCat, setSingleCat] = useState({});

  useEffect(() => {
    setSingleCat(getCatById(stateCategorie, parseInt(params.id)));
  }, [params]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle color="primary">Catégorie</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonButton
            color="primary"
            routerLink="/categories"
            className="ion-margin"
          >
            <IonLabel color="light">Retour aux catégories</IonLabel>
          </IonButton>
          <p>{singleCat.catNameCat}</p>
          {/* <p>{stateCategorie.selectedCategory.catNameCat}</p> */}
        </IonContent>
      </IonPage>
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateCategorie: state.categorieReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionCategorie: bindActionCreators(categorieAction, dispatch),
});

const Categorie = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorieComponent);
export default Categorie;
