import { IonAlert, IonButton, IonIcon, IonItem } from "@ionic/react";
import { create, eye, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categorieAction from "../../redux/categorie/categorieAction";
import "./categories.scss";

function CategoriesComponent({ stateCategorie, actionCategorie }) {
  const [createAlert, setCreateAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");

  useEffect(() => {
    actionCategorie.getCategorieList();
  }, []);

  const chooseValue = () => {
    return stateCategorie.categorieList;
  };

  const dynamicLink = () => {
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

  return (
    <div className="categories container">
      <div className="headingSection">
        <IonButton
          onClick={() => setCreateAlert(true)}
          expand="full"
          color="primary"
          shape="round"
          strong="true"
        >
          Créer une nouvelle catégorie
        </IonButton>
      </div>
      <ion-list>{dynamicLink()}</ion-list>
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
});

const mapDispatchToProps = (dispatch) => ({
  actionCategorie: bindActionCreators(categorieAction, dispatch),
});

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesComponent);
export default Categories;
