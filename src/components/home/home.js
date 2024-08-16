import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';


function Home() {
  const [data, setData] = useState({ total: 0, male: 0, female: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fcosrecruit.rf.gd/api/count.php')
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
      <div className='stat'>
        <center>
        Total: <h1>{data.total}</h1>
        </center> </div>
      <div className='stat'>
        <center>
        Male: <h1>{data.male}</h1> <br/>Female: <h1>{data.female}</h1>
        </center> </div>
      <div className='stat'></div>
      <div className='stat'></div>
      <div className='stat'></div>
    </div>
  );
}

export default Home;
