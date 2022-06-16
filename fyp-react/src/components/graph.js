import React, { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
//import {line} from "react-chartjs-2";
import db from "../api/firebaseConfig";

function Graph() {

  const [waterData, setWaterData] = useState([{ name: "Loading...", id: "initial" }]);
  //const [dox, setDox] = useState([]);
  console.log(db);
  useEffect(
    () =>
      onSnapshot(collection(db, "WaterData"), (snapshot) =>
      // console.log(snapshot);
        setWaterData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  
  console.log(waterData);

  return <div>
            <h1>Graph</h1>
            {waterData.map((data) =>(
              <li key={data.tds}>
              {
              console.log(data.tds)}
            </li>
            ))}
        </div>;
}

export default Graph;