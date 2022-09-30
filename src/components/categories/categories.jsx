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
  useIonToast,
  IonInput,
  IonLabel,
  useIonAlert,
  IonImg,
} from "@ionic/react";
import { create, trash, close, sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../redux/category/categoryAction";
import * as authAction from "../../redux/authorization/actions/auth";

import "./categories.scss";

function CategoriesComponent({
  stateCategory,
  actionCategory,
  stateAuth,
  actionRegister,
}) {
  const history = useHistory();
  const [createAlert, setCreateAlert] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [selectedFile, setSelectedFile] = useState(undefined);

  useEffect(() => {
    // actionRegister.whoami((response) => {
    //   if (response.status === 403) {
    //     console.log("token expiré");
    //     actionRegister.logout();
    //     present({
    //       message: "Vous êtes déconnecté.",
    //       duration: 2000,
    //       position: "top",
    //     });
    //   }
    // });
    actionCategory.getCategoriesList();
  }, []);

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const chooseValue = () => {
    return stateCategory.categorieList;
  };

  const AdminButton = (e) => {
    if (
      stateAuth.isLoggedIn &&
      stateAuth.currentUserLoggedIn?.role === "ADMIN"
    ) {
      return (
        <>
          <IonButton
            className="ion-margin"
            type="submit"
            onClick={() => {
              setNameCategory(e.catNameCat);
              setIdCategory(e.catIdCatPK);
              setUpdateBox(true);
            }}
          >
            <IonIcon icon={create} />
          </IonButton>
          <IonButton
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

  const categoriesList = () => {
    return chooseValue().map((e) => {
      return (
        <div key={e.catIdCatPK}>
          <IonItem routerLink={`categorie/${e.catIdCatPK}`}>
            <IonCard className="singleCat center">
              <IonCardHeader>
                <IonCardTitle>
                  <p className="test"> {e.catNameCat}</p>
                </IonCardTitle>
                <IonCardSubtitle>subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonImg className="imageReduce" src={e.fileDB?.path} alt="" />
              </IonCardContent>
            </IonCard>
          </IonItem>
          {AdminButton(e)}
        </div>
      );
    });
  };
  const createCategory = () => {
    if (stateAuth.currentUserLoggedIn?.role === "ADMIN") {
      return (
        <IonButton
          className="ion-margin"
          expand="block"
          onClick={() => setCreateAlert(true)}
        >
          Créer une nouvelle catégorie
        </IonButton>
      );
    }
  };

  const updateForm = (e) => {
    if (updateBox) {
      return (
        <>
          <IonList className="ion-padding">
            <div className="test">
              <IonButton
                type="submit"
                slot="icon-only"
                onClick={() => {
                  setUpdateBox(false);
                }}
              >
                <IonIcon icon={close} size="large" slot="icon-only" />
              </IonButton>
            </div>
            <IonItem>
              <IonLabel position="floating">Nom</IonLabel>
              <IonInput
                value={nameCategory}
                clearInput
                placeholder={nameCategory}
                onIonChange={(e) => setNameCategory(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel className="ion-margin" position="stacked">
                Image (2mo maximum au format JPG ou PNG)
              </IonLabel>
              <input type="file" onChange={selectFile} />
            </IonItem>
            <IonButton
              className="ion-margin"
              type="submit"
              expand="block"
              onClick={() => {
                actionCategory.getUpdateCategory(idCategory, nameCategory);
                if (selectedFile !== undefined) {
                  console.log(selectedFile);
                  console.log(selectedFile.type);
                  console.log(selectedFile.type !== "image/png");
                  console.log(selectedFile.type !== "image/jpeg");
                  if (
                    selectedFile.type !== "image/png" &&
                    selectedFile.type !== "image/jpeg"
                  ) {
                    presentAlert({
                      header: "Mauvias format de fichier",
                      message:
                        "Merci d'envoyer un fichier au format .jpeg .jpg ou .png.",
                      buttons: ["OK"],
                    });
                  } else {
                    actionCategory.getUploadCategoryPicture(
                      selectedFile,
                      idCategory,
                      (res) => {
                        console.log(res.status);
                        if (res.status === 417) {
                          console.log("NOT OK");
                          presentAlert({
                            header: "Fichier trop volumineux",
                            message: "Merci de respecter la limite de 2mo.",
                            buttons: ["OK"],
                          });
                        } else if (res.status === 200) {
                          console.log("OK");
                        }
                      }
                    );
                  }
                }
                setIdCategory("");
                setNameCategory("");
                setSelectedFile(undefined);
                setUpdateBox(false);
              }}
            >
              <IonIcon icon={sendSharp} />
            </IonButton>
          </IonList>
        </>
      );
    }
    return <></>;
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
      <IonList className="listWrap">{categoriesList()}</IonList>
      {updateForm()}
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
              actionCategory.getAddCategory(body);
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
              setUpdateBox(false);
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
  actionRegister: bindActionCreators(authAction, dispatch),
});

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesComponent);
export default Categories;
