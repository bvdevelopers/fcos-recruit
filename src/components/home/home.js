import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import banner from './img1.jpg';
import ceo from '../../img/ceo.jpg';

function Home() {
  const [data, setData] = useState({ total: 0, male: 0, female: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fcos-recruitment.000webhostapp.com/api/count.php')
      .then(response => {
        if (response.data) {
          setData({
            total: response.data.total.count,
            male: response.data.male.count,
            female: response.data.female.count
          });
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='home'>
      <div className='total'>
        <center>
        Total: <h1>{data.total}</h1>
        </center> </div>
      <div className='total'>
        <center>
        Male: <h1>{data.male}</h1> <br/>Female: <h1>{data.female}</h1>
        </center> </div>
      <div className='category'></div>
      <div className='status'></div>
      <div className='districts'></div>
    </div>
  );
}

export default Home;
