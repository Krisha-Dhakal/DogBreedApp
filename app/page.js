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
    <main className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">DOG BREEDS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.keys(dogData).map((breed, index)=>{
          // const image = await getDogImage(breed);
          return(
            <div key={index} className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
              <DogImage breed = {breed}/>
              <h2 className="text-lg font-semibold text-center mt-2 capitalize">{breed}</h2>
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


  return (
    <div className="w-64 h-64 overflow-hidden rounded-md">
    <img src={pic} alt={breed} className="object-cover w-full h-full " />;
    </div>
  );
}
