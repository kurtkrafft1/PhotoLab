import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";


const ExploreList = props => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const togglePhotoModal = () => {
    setPhotoModalOpen(!photoModalOpen);
  };

  useEffect(()=> {
   PhotographyManager.getAll(allPhotos=> 
    //    console.log(allPhotos)
    setRandomPhotos(allPhotos)

    
     
   )
  }, [])
  
  return (
      <>
      <div>
          <h1>hello</h1>
      </div>
      </>
  )
};
export default ExploreList;


// console.log(allPhotos)
// let counter = 0;
// const arr = []
// while(counter<10){
//  const random = Math.floor(Math.random()*allPhotos.length)
//  arr.push(allPhotos[random])
//  allPhotos.splice(random, 1)
//  counter++
//  setRandomPhotos(arr)
//  console.log(arr);
// }