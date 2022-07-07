import { IonAlert, IonButton, IonIcon, IonItem } from "@ionic/react";
import { create, eye, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as categorieAction from "../../redux/categorie/categorieAction";
import "./categories.scss";

function CategoriesComponent({ stateCategorie, actionCategorie }) {
  const [createAlert, setCreateAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [emojiCategory, setEmojiCategory] = useState("");

  // const [text, setText] = useState<string>();

  useEffect(() => {
    actionCategorie.getCategorieList();
  }, []);

  const chooseValue = () => {
    return stateCategorie.categorieList;
  };

  /*   const displayEmoji = (e) => {
    if (e.catEmojiCat !== "undefined") {
      // return <ion-label>{String.fromCodePoint(e.catEmojiCat)}</ion-label>;
      return <ion-label>{e.catEmojiCat}</ion-label>;
    } else {
      return <ion-label></ion-label>;
    }
  }; */

  const dynamicLink = () => {
    return chooseValue().map((e) => {
      return (
        <div className="singleCat">
          <IonItem>
            <ion-label>{e.catNameCat}</ion-label>
            <NavLink to={`categorie/${e.catIdCatPK}`}>
              <IonButton className="fancy-button" onClick={() => {}}>
                <IonIcon icon={eye} />
              </IonButton>
            </NavLink>
            <NavLink to="/categories">
              <IonButton
                className="fancy-button-reverse"
                onClick={() => {
                  setNameCategory(e.catNameCat);
                  setIdCategory(e.catIdCatPK);
                  setEmojiCategory(e.catEmojiPK);
                  console.log(e);
                  console.log(emojiCategory);
                  setUpdateAlert(true);
                }}
              >
                <IonIcon icon={create} />
              </IonButton>
            </NavLink>
            <NavLink to="/categories">
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
            </NavLink>
          </IonItem>
        </div>
      );
    });
  };

  return (
    <div className="categories container">
      <div className="headingSection">
        {/* <h1 className="heading">Catégories</h1> */}
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
              /*               let emojiToString = name.emoji.codePointAt           */
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
          // {
          //   name: "emoji",
          //   type: "text",
          //   value: emojiCategory,
          //   placeholder: "emoji",
          // },
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
              // let emojiToString = name.emoji.codePointAt(0);
              actionCategorie.getUpdateCategorie(
                idCategory,
                name.name
                // emojiToString
              );
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
              // let emojiToString = name.emoji.codePointAt(0);
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
