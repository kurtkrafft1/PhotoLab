import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import MyPhotoCard from "./MyPhotoCard";
import NewPhotoModal from "./NewPhotoModal";
import "./MyPhotos.css";

const MyPhotoList = props => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshPhotos, setRefreshPhotos] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("credentials"));
  // const user = { id: 1 };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setRefreshPhotos(!refreshPhotos);
  };
  const getAllPhotos = () => {
    setIsLoading(true);
    PhotographyManager.getAllWithId(user.id).then(photosFromApi => {
      setPhotos(photosFromApi);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllPhotos();
    setRefreshPhotos(false);
  }, [refreshPhotos]);

  return (
    <>
      <div className="container-header">
      </div>

      <div className="icon-container">
        {" "}
        <div className="button-container">
          {/* <i id="icons"className=" big plus square outline icon" onClick={()=> props.history.push("myphotos/new")}></i> */}
          <NewPhotoModal
            toggleModal={toggleModal}
            modalOpen={modalOpen}
            {...props}
            refreshPhotos={refreshPhotos}
            setPhotos={setPhotos}
          />
          <div className="left-or-right-buttons">
            <div className="ui left attached button" role="button" tabindex="0" style={{opacity:0.8}}>
              My Photos
            </div>
            <div className="ui right attached button" role="button" tabindex="0" onClick={()=> {props.history.push('/starred')}}>
              Starred Photos
            </div>
          </div>
        </div>
        <div className="card-container">
          {photos.map(photo => (
            <MyPhotoCard
              key={photo.id}
              photo={photo}
              setRefreshPhotos={setRefreshPhotos}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPhotoList;
