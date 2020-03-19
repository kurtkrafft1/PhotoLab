import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import "./Explore.css"
import ExplorePhotoCard from "./ExplorePhotoCard"

const ExploreList = props => {
  const [randomPhotos, setRandomPhotos] = useState([]);

  useEffect( ()=> {
    const arr = []
   PhotographyManager.getAll().then(allPhotos=> {
let counter = 0;

while(counter<9){
 const random = Math.floor(Math.random()*allPhotos.length)
 arr.push(allPhotos[random])
 allPhotos.splice(random, 1)
 counter++



}
   }).then(()=> {
     setRandomPhotos(arr)
   })
   
   
  }, [])

  return (
      <>
      <div className="explore-container">
         <div className="explore-photos-card-container">
           {randomPhotos.map(photo=> {
            return  <ExplorePhotoCard key={photo.id} photo={photo} {...props}/>
           })}
         </div>

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