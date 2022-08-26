import {
  IonAlert,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonItem,
  IonToolbar,
} from "@ionic/react";
import { create, eye, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categorieAction from "../../redux/categorie/categorieAction";
import * as authAction from "../../redux/authorization/actions/auth";

import "./categories.scss";

function CategoriesComponent({ stateCategorie, actionCategorie, stateAuth }) {
  const [createAlert, setCreateAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    actionCategorie.getCategorieList();
  }, []);

  const chooseValue = () => {
    return stateCategorie.categorieList;
  };

  const categoryList = () => {
    return chooseValue().map((e) => {
      return (
        <div className="singleCat">
          <IonItem>
            <ion-label>{e.catNameCat}</ion-label>
            <IonButton
              className="fancy-button"
              routerLink={`categorie/${e.catIdCatPK}`}
            >
              <IonIcon icon={eye} />
            </IonButton>
            <IonButton
              className="fancy-button-reverse"
              onClick={() => {
                setNameCategory(e.catNameCat);
                setIdCategory(e.catIdCatPK);
                console.log(e);
                setUpdateAlert(true);
              }}
            >
              <IonIcon icon={create} />
            </IonButton>
            <IonButton
              className="fancy-button-reverse"
              onClick={() => {
                setNameCategory(e.catNameCat);
                setIdCategory(e.catIdCatPK);
                setDeleteAlert(true);
              }}
            >
              <IonIcon icon={trash} />
            </IonButton>
          </IonItem>
        </div>
      );
    });
  };
  const createCategory = () => {
    // if (stateAuth) {
    return (
      <IonButton
        onClick={() => setCreateAlert(true)}
        expand="full"
        color="primary"
        shape="round"
        strong="true"
      >
        Créer une nouvelle catégorie
      </IonButton>
    );
    // }
  };

  return (
    <div className="categories container">
      <div className="headingSection">
        <IonSearchbar
          value={searchText}
          inputMode="search"
          showCancelButton="never"
          placeholder="Rechercher un produit"
        ></IonSearchbar>
      </div>
      {createCategory()}
      <ion-list>{categoryList()}</ion-list>
      <IonAlert
        isOpen={createAlert}
        onDidDismiss={() => setCreateAlert(false)}
        header={"Nouvelle catégorie"}
        inputs={[
          {
            name: "catNameCat",
            type: "text",
            placeholder: "nom",
          },
        ]}
        buttons={[
          {
            text: "Annuler",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Ajouter",
            handler: (body) => {
              console.log(body);
              actionCategorie.getAddCategorie(body);
            },
          },
        ]}
      />
      <IonAlert
        isOpen={updateAlert}
        onDidDismiss={() => setUpdateAlert(false)}
        header={"Modifier " + nameCategory}
        inputs={[
          {
            name: "name",
            type: "text",
            value: nameCategory,
            placeholder: "écrivez ici",
          },
        ]}
        buttons={[
          {
            text: "Annuler",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Modifier",
            handler: (name) => {
              actionCategorie.getUpdateCategorie(idCategory, name.name);
            },
          },
        ]}
      />
      <IonAlert
        isOpen={deleteAlert}
        onDidDismiss={() => setDeleteAlert(false)}
        header={"Supprimer " + nameCategory + " ?"}
        buttons={[
          {
            text: "Annuler",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Supprimer",
            handler: () => {
              actionCategorie.getDeleteCategorie(idCategory);
            },
          },
        ]}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateCategorie: state.categorieReducer,
  stateAuth: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  actionCategorie: bindActionCreators(categorieAction, dispatch),
});

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesComponent);
export default Categories;
