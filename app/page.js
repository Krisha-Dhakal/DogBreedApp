"use client"; //client component

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Home() {
  const [dogData, setDogData] = useState({});

  const APIURL = "https://dog.ceo/api/breeds/list/all";


  useEffect(()=>{
    //api le username password accessrakhera access matra dida condition chahinxa natra no
    axios.get(APIURL).then(response=>{
      //console.log(response.data)
      const breeds= response.data.message;
      setDogData(breeds);
    }) //then means promise resolve vayo
  },[]) //es6 function=> called arrow function

  
  return (
    //<p>Krisha</p>
    <main>
      <h2>DOG BREEDS</h2>
      <div>
        {Object.keys(dogData).map((breed, index)=>{
          // const image = await getDogImage(breed);
          return(
            <div key={index}>
              <DogImage breed = {breed}/>
              <h2>{breed}</h2>
            </div>
          )
        })}
      </div>
    </main>
  );
}

//Array.map((item, index)=>{}) this is general synatx
//jaba component ready hunxa call garxa useEffect le
//component banako just for photos
const DogImage = ({breed})=>{

  const [pic, setPic] = useState("");
  function getDogImage(breedName,subBread=null){
     axios.get(`https://dog.ceo/api/breed/${breedName.toLowerCase()}/images/random`).then(response=>setPic(response.data.message));
   
  }

  useEffect(()=>{
    getDogImage(breed);
  },[breed]);


  return <img src={pic} />
}