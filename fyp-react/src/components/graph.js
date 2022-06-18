import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    labels: tdsList,
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
    <div class="row">
      <div class="col"> 
        <Line data={data}/>
      </div>
      <div class="col"> 
        <Line data={data}/>
      </div>
    </div>
    <div class="row">
      <div class="col"> 
        <Line data={data}/>
      </div>
      <div class="col"> 
        <Line data={data}/>
      </div>
    </div>
  </div>
  );
}

export default Graph;