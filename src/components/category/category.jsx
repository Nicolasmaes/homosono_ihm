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
import * as categoryAction from "../../redux/category/categoryAction";

import { getCatById } from "../../redux/category/categoryReducer";
import "./category.scss";

function CategoryComponent({ stateCategory, actionCategory }) {
  const params = useParams();
  const [singleCat, setSingleCat] = useState({});

  useEffect(() => {
    console.log(singleCat);
    setSingleCat(getCatById(stateCategory, parseInt(params.id)));
    // actionCategory.getCategoryById(params.id);
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
          {/* {stateCategory.categorie.catNameCat} */}
        </IonContent>
      </IonPage>
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateCategory: state.categoryReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionCategory: bindActionCreators(categoryAction, dispatch),
});

const Categorie = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryComponent);
export default Categorie;
