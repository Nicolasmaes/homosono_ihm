import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as categorieAction from "../../redux/categorie/categorieAction";

import { NavLink } from "react-router-dom";
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
            <IonTitle>Catégorie</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <NavLink to="/categories">
            <IonButton
              shape="round"
              color="primary"
              onClick={() => {
                actionCategorie.selectCategory("");
              }}
            >
              <ion-label color="light">Retour aux catégories</ion-label>
            </IonButton>
          </NavLink>
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
