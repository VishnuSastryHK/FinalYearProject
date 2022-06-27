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
  let doList=[];
  let tdsList=[];
  let turbidityList=[];
  let phList=[];
  let tempList=[];
  let timestampList=[];
  // eslint-disable-next-line array-callback-return
  waterData.map((data) => {
    doList.push(data.do);
    tdsList.push(data.tds);
    turbidityList.push(data.turbidity);
    phList.push(data.ph);
    tempList.push(data.temp);
    timestampList.push(data.timestamp);
  });
  
  console.log(waterData);
  console.log(timestampList);
  console.log(turbidityList);

  const data_do = {
    labels: timestampList,
    datasets: [{
      label: 'Dissolved Oxygen(DO)',
      data: doList,
      fill: true,
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }]
  };
  const data_tds = {
    labels: timestampList,
    datasets: [{
      label: 'TDS',
      data: tdsList,
      fill: true,
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)'
    }]
  };
  const data_turbidity = {
    labels: timestampList,
    datasets: [{
      label: 'Turbidity',
      data: turbidityList,
      fill: true,
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
    }]
  };
  const data_ph = {
    labels: timestampList,
    datasets: [{
      label: 'pH',
      data: phList,
      fill: true,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
  };
  const data_temp = {
    labels: timestampList,
    datasets: [{
      label: 'Temperature',
      data: tempList,
      fill: true,
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
    }]
  };

  return (
  <div className='container'>
    <br></br>
    <center><h1>Statistics</h1></center>
    <div class="row">
      <div class="col"> 
        <Line data={data_do}/>
      </div>
      <div class="col"> 
        <Line data={data_tds}/>
      </div>
    </div>
    <div class="row">
      <div class="col"> 
        <Line data={data_turbidity}/>
      </div>
      <div class="col"> 
        <Line data={data_ph}/>
      </div>
    </div>
    <div class="row">
      <div class="col"> 
        <Line data={data_temp}/>
      </div>
      <div class="col"> 
        {/* <Line data={data_ph}/> */}
      </div>
    </div>
  </div>
  );
}

export default Graph;