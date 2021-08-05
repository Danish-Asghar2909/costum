import logo from './logo.svg';
import './App.css';
import BasicTable from './Table';
import { Button, Input } from '@material-ui/core';
import React from 'react';
import axios from "axios";
import CsvDownload from 'react-json-to-csv';

function App() {
  const [startTime , setStart] = React.useState("");
  const [endTime , setEnd ]= React.useState("");
  const [responseData , setResponse ] =React.useState([]);
  const handleClick = async(e)=>{
    e.preventDefault();
    console.log("start ", startTime);
    console.log("end ", endTime);

  

  var config = {
    method: 'get',
    url: `http://api.vibconnect.io/v1/Accounts/7SZX17XNMDO3MEB325Z7/Calls?StartTime=${startTime}&EndTime=${endTime}`,
    headers: { 
      'access-control-allow-origin':"*",
      "Content-Type":"application/json",
      'Authorization': 'Basic N1NaWDE3WE5NRE8zTUVCMzI1Wjc6UVNPT1RmQmRrSW91QTZHenlaVlVQU1NOdWpSeVZMaGYyenptOEFyZA=='
    }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    setResponse(response.data)
    // <CsvDownload data={JSON.stringify(response.data)} />
  })
  .catch(function (error) {
    console.log(error);
  });
  
  
  }
  const mockData = [
    {
      color: "red",
      value: "#f00"
    },
    {
      color: "green",
      value: "#0f0"
    },
    {
      color: "blue",
      value: "#00f"
    },
    {
      color: "cyan",
      value: "#0ff"
    },
    {
      color: "magenta",
      value: "#f0f"
    },
    {
      color: "yellow",
      value: "#ff0"
    },
    {
      color: "black",
      value: "#000"
    }
  ]
  return (
    <div className="App">
      <Input value={startTime} onChange={e=> setStart(e.target.value)} placeholder="Start Time "/>
      <Input value={endTime} onChange={e=> setEnd(e.target.value)} placeholder="Endtime"/>
      <Button variant="contained" onClick={handleClick} >Download</Button>
      <CsvDownload data={responseData} />
      <BasicTable/>
    </div>
  );
}

export default App;
