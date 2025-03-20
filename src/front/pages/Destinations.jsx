import React, { useEffect, useState } from "react";


//Gathers the lattitude and longitude of the city
const Destinations = () => {

  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    city: '',
    region: '',
  });
  const [weather, setWeather] = useState(null);


  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (ev) => {
    ev.preventDefault() //Prevents page load due to default behavior of onSubmit  

    const params = new URLSearchParams({
      'geoit': 'JSON',
      'locate': formData.city,
      'region': formData.region,
      'strictmode': '1',
      'auth': '947968704678902694455x107995'
    })

    fetch(`https://geocode.xyz/?${params}`)
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Network response not OK");
        }
        return resp.json();
      })
      .then((data) => {
        setLocation(data);

        const params = new URLSearchParams({
          'latitude': parseFloat(data.latt),
          'longitude': parseFloat(data.longt),
          'daily': 'temperature_2m_max,temperature_2m_min',
          'temperature_unit': 'fahrenheit'
        })

        fetch(`https://api.open-meteo.com/v1/forecast/?${params}`)
          .then((resp) => {
            if (!resp.ok) {
              throw Error("Network response not OK");
            }
            return resp.json();
          })
          .then((data2) => {
            setWeather(data2);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });


  }


  return (
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-center">
        <h1>Your Destination!</h1>
        <h1>Your Adventure!</h1><br></br>
        <h2>Where are you headed?</h2><br></br>
        <form onSubmit={ev => handleSubmit(ev)}>
          <div class="form-group my-2">Enter city destination. ex: Orlando
            <input type="text" class="form-control" id="city" name="city" onChange={handleInputChange} placeholder="Enter city destination. ex: Orlando" />
          </div>
          <div class="form-group my-2">Enter region as a 2 character code.  ex: US
            <input type="text" class="form-control" id="region" name="region" onChange={handleInputChange} placeholder="Enter region as a 2 character code.  ex: US" />
          </div>
          <button type="submit" class="btn btn-primary my-2">Submit</button>
        </form>
        <div>Latitude: {JSON.stringify(location?.latt)}</div>
        <div>Longitude: {JSON.stringify(location?.longt)}</div>
        <div>Time: {JSON.stringify(weather?.daily.time)}</div>
        <div>Max: {JSON.stringify(weather?.daily.temperature_2m_max)}</div>
        <div>Min: {JSON.stringify(weather?.daily.temperature_2m_min)}</div>
      </div>
      <div className="row">
        <div className="col-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{weather?.daily.time[0]}</h5>
              <p class="card-text">Low: {Math.round(weather?.daily.temperature_2m_min[0])} °F</p>
              <p class="card-text">High: {Math.round(weather?.daily.temperature_2m_max[0])} °F</p>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{weather?.daily.time[1]}</h5>
              <p class="card-text">Low: {Math.round(weather?.daily.temperature_2m_min[1])} °F</p>
              <p class="card-text">High: {Math.round(weather?.daily.temperature_2m_max[1])} °F</p>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{weather?.daily.time[0]}</h5>
              <p class="card-text">Low: {Math.round(weather?.daily.temperature_2m_min[0])} °F</p>
              <p class="card-text">High: {Math.round(weather?.daily.temperature_2m_max[0])} °F</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Destinations;