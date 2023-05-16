import React, { useEffect, useState } from "react";
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

 


  

function ChartMonth  () {

     const data = {
   
        labels : ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        datasets: [
          {
           
            data: [
                0.0,
                0.0,
                0.0,
                400000.0,
                200000.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
            ],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
           
          },
          
        ],
      }
        
    const [dataRevenue, setDataRevenue] = useState({})

    const getData = async()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/getRevenueMonthChart',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
           

             
          })

          .catch((error) => {
            console.log(error);
          });
  }
   useEffect(() => {
     getData()
  }, [])




   
    return (
        <div>
         
               <Line  data={data} />
         
        </div>
    )
    }
export default ChartMonth