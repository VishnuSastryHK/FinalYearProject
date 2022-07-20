import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onSnapshot, collection } from 'firebase/firestore';
import db from "../api/firebaseConfig";
import "./graph.css";
import {Line} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Graph() {

  const [modalIsOpen,setModalIsOpen] = useState(true) ;

  const setModalIsOpenToTrue =()=>{
      setModalIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
  }

  const [waterData, setWaterData] = useState([{ name: "Loading...", id: "initial" }]);
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
  let wqiList=[];
  // eslint-disable-next-line array-callback-return
  waterData.map((data) => {
    doList.push(data.do);
    tdsList.push(data.tds);
    turbidityList.push(data.turbidity);
    phList.push(data.ph);
    tempList.push(data.temp);
    wqiList.push(data.wqi);
    timestampList.push(data.timestamp);
  });
  
  console.log(waterData);
  console.log(timestampList);
  console.log(turbidityList);

  
  const data_do = {
    labels: timestampList,
    datasets: [{
      label: 'Dissolved Oxygen(DO) [mg/l]',
      data: doList,
      fill: true,
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }],
  };
  const data_tds = {
    labels: timestampList,
    datasets: [{
      label: 'Total Dissolved Salts(TDS) [mg/l]',
      data: tdsList,
      fill: true,
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)'
    }]
  };
  const data_turbidity = {
    labels: timestampList,
    datasets: [{
      label: 'Turbidity [NTU]',
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
      label: 'Temperature [ºC]',
      data: tempList,
      fill: true,
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
    }]
  };
  const data_wqi = {
    labels: timestampList,
    datasets: [{
      label: 'Water Quality Index(WQI)',
      data: wqiList,
      fill: true,
      borderColor: 'rgba(128,128,1,1)',
      backgroundColor: 'rgba(128,128,0.2,0.2)',
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart'
      // },
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          font:{size: 18, lineHeight: 12},
        }
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'TimeStamp'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        },
        
      }
    }
      
  }

  const current = new Date();
  const todaysDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#EAEAEA',      
      //width:'50%',
      //height: '50%',
      border: 'black',
    }
};
const hrStyle={
  marginRight: '-100px;'
}

  return (
  <>
    <div className='container'>
      <br></br>
      <center><h1>Statistics</h1></center>
      <div class="row">
        <div class="col"> 
          <Line data={data_do} options={options}/>
        </div>
        <div class="col"> 
          <Line data={data_tds} options={options}/>
        </div>
      </div>
      <div class="row">
        <div class="col"> 
          <Line data={data_turbidity} options={options}/>
        </div>
        <div class="col"> 
          <Line data={data_ph} options={options}/>
        </div>
      </div>
      <div class="row">
        <div class="col"> 
          <Line data={data_temp} options={options}/>
        </div>
        <div class="col"> 
          <Line data={data_wqi}  options={options}/>
        </div>
      </div>
    </div>
    <center>
    <button id="openModalBtn" onClick={setModalIsOpenToTrue}>Click to View Latest Data</button>
    </center>

    <Modal isOpen={modalIsOpen} style={customStyles} id="modal" onRequestClose={()=> setModalIsOpen(false)}>
       <right><button className='cross' onClick={setModalIsOpenToFalse}>X</button></right>
       <div className='modal_data'>
       <center>
        <br>
        </br>
        <h2>Latest Data</h2>
        <h6>Data fetched at: {timestampList.at(-1)}, {todaysDate}</h6>
        <hr></hr>
        <table>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>DO</td>
            <td>{doList.at(-1)}  mg/l</td>
          </tr>
          <tr>
            <td>TDS</td>
            <td>{tdsList.at(-1)} mg/l</td>
          </tr>
          <tr>
            <td>Turbidity</td>
            <td>{turbidityList.at(-1)} NTU</td>
          </tr>
          <tr>
            <td>pH</td>
            <td>{phList.at(-1)}</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>{tempList.at(-1)} ºC</td>
          </tr>
          <hr style={{marginRight:'-105px'}}></hr>
          <tr>
            <td><h6>Calculated WQI</h6></td>
            <td><h6>{wqiList.at(-1)}</h6></td>
          </tr>
        </table>
        </center>
       </div>
    </Modal>
  </>
  );
}

export default Graph;