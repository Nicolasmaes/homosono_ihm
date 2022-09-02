import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonList,
  IonSearchbar,
} from "@ionic/react";

import { create, trash } from "ionicons/icons";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../redux/category/categoryAction";

import "./categories.scss";

function CategoriesComponent({ stateCategory, actionCategory, stateAuth }) {
  const [createAlert, setCreateAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    actionCategory.getCategoriesList();
  }, []);

  const chooseValue = () => {
    return stateCategory.categorieList;
  };

  const categoriesList = () => {
    const AdminButton = (e) => {
      if (
        stateAuth.isLoggedIn &&
        stateAuth.currentUserLoggedIn.role === "ADMIN"
      ) {
        return (
          <>
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
          </>
        );
      }
    };

    return chooseValue().map((e) => {
      return (
        <div>
          <IonItem key={e}>
            <IonCard className="singleCat center">
              {/* <div className="center">
                  <IonImg src={image.src} className="imageReduce" />
                </div> */}
              <IonCardHeader>
                <IonCardTitle>{e.catNameCat}</IonCardTitle>
                <IonCardSubtitle>subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                IonCardContent
                <IonItem>
                  <IonButton
                    fill="outline"
                    routerLink={`categorie/${e.catIdCatPK}`}
                  >
                    voir
                  </IonButton>
                  {AdminButton(e)}
                </IonItem>
              </IonCardContent>
            </IonCard>
          </IonItem>
        </div>
      );
    });
  };
  const createCategory = () => {
    // if (stateAuth) {
    return (
      <IonButton
        className="ion-margin"
        expand="block"
        onClick={() => setCreateAlert(true)}
      >
        Créer une nouvelle catégorie
      </IonButton>
    );
    // }
  };

  return (
    <div className="categories ion-margin">
      <div className="headingSection">
        <IonSearchbar
          value={searchText}
          inputMode="search"
          showCancelButton="never"
          placeholder="Rechercher un produit"
        ></IonSearchbar>
      </div>
      {createCategory()}
      <IonList>{categoriesList()}</IonList>

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
              actionCategory.getAddCategory(body);
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
              actionCategory.getUpdateCategory(idCategory, name.name);
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
              actionCategory.getDeleteCategory(idCategory);
            },
          },
        ]}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  state: state,
  stateCategory: state.categoryReducer,
  stateAuth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actionCategory: bindActionCreators(categoryAction, dispatch),
});

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesComponent);
export default Categories;
