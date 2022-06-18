import React, { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from "../api/firebaseConfig";
import "./graph.css";
import {Line} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


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
  let tdsList=[]
  let doList=[]
  // eslint-disable-next-line array-callback-return
  waterData.map((data) => {
    tdsList.push(data.tds);
    doList.push(data.do);
  });
  
  console.log(waterData);
  console.log(tdsList);
  console.log(doList);

  const data = {
    labels: ["1","2","3"],
    datasets: [{
      label: 'My First Dataset',
      data: doList,
      fill: false,
      borderColor: 'rgb(75, 192, 192)'
    }]
  };
  console.log(data);

  return (
  <div className='container'>
    <h1>Statistics</h1>
    <Line data={data}/>
    <Line data={data}/>
    <Line data={data}/>
    <Line data={data}/>
  </div>
  );
}

export default Graph;