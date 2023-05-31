import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartMonth() {
  const [data, setData] = useState({});

  const getData = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://server.realestatevn.xyz/api/getRevenueMonthChart',
      headers: {}
    };

    try {
      const response = await axios.request(config);
      setData({
        labels: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12'
        ],
        datasets: [
          {
            label: 'Doanh thu 2023',
            data: response.data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ]
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const options = {
  //   plugins:{
  //     legend:false
  //   }, 
  //   scales:{
  //     x:{

  //     }
  //   }
  // }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    {data.datasets && data.labels ? <Line data={data} /> : null}
  </div>
  );
}

export default ChartMonth;
