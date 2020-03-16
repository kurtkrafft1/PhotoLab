import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";

const ExploreList = props => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const togglePhotoModal = () => {
    setPhotoModalOpen(!photoModalOpen);
  };

  useEffect(()=> {
   PhotographyManager.getRandomPhotos(photosFromApi=> {
       console.log(photosFromApi)
   })
  }, [])
};
