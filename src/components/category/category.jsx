import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonList,
  IonInput,
  useIonAlert,
} from "@ionic/react";
import { create, trash, close, sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../redux/category/categoryAction";
import * as authAction from "../../redux/authorization/actions/auth";

import { getCatById } from "../../redux/category/categoryReducer";

import "./category.scss";

function CategoryComponent({
  stateCategory,
  actionCategory,
  stateAuth,
  actionRegister,
}) {
  const params = useParams();
  const history = useHistory();

  const [updateBox, setUpdateBox] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [presentAlert] = useIonAlert();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(false);

  useEffect(() => {
    actionCategory.getCategorieById(params.id);
    setCurrentCategory(stateCategory.categorie);
  }, [params]);

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
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
              setNameCategory(currentCategory.catNameCat);
              setIdCategory(currentCategory.catIdCatPK);
              setUpdateBox(true);
            }}
          >
            <IonIcon icon={create} />
          </IonButton>
          <IonButton
            onClick={() => {
              setNameCategory(currentCategory.catNameCat);
              setIdCategory(currentCategory.catIdCatPK);
              setDeleteAlert(true);
            }}
          >
            <IonIcon icon={trash} />
          </IonButton>
        </>
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
          <p>{stateCategory.categorie.catNameCat}</p>
          <p>{stateCategory.categorie.catIdCatPK}</p>
          <p>currentCategory</p>
          <p>{currentCategory.catNameCat}</p>
          <img
            className="imageReduce"
            src={stateCategory.categorie.fileDB?.path}
            alt=""
          />
          {AdminButton()}
          {updateForm()}
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
                  history.push("/categories");
                },
              },
            ]}
          />
        </IonContent>
      </IonPage>
    </>
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

const Categorie = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryComponent);
export default Categorie;
