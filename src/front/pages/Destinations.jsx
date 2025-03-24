import React, { useState } from "react";

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
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const params = new URLSearchParams({
      geoit: 'JSON',
      locate: formData.city,
      region: formData.region,
      strictmode: '1'
    });

    fetch(`https://geocode.xyz/?${params}`)
      .then((resp) => {
        if (!resp.ok) throw Error("Network response not OK");
        return resp.json();
      })
      .then((data) => {
        setLocation(data);

        const weatherParams = new URLSearchParams({
          latitude: parseFloat(data.latt),
          longitude: parseFloat(data.longt),
          daily: 'temperature_2m_max,temperature_2m_min',
          temperature_unit: 'fahrenheit'
        });

        fetch(`https://api.open-meteo.com/v1/forecast/?${weatherParams}`)
          .then((resp) => {
            if (!resp.ok) throw Error("Network response not OK");
            return resp.json();
          })
          .then((data2) => {
            setWeather(data2);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-start flex-column px-3 py-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="text-center w-100 mb-4">
        <div className="card shadow p-3 mb-3">
          <h2 className="mb-0">Your Destination!</h2>
          <h4 className="mb-0">Your Adventure!</h4>
        </div>
        <h5 className="mb-4">Where are you headed?</h5>
      </div>

      <form onSubmit={handleSubmit} className="w-100">
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            onChange={handleInputChange}
            placeholder="Enter city destination. ex: Orlando"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="region" className="form-label">Region (2-letter code)</label>
          <input
            type="text"
            className="form-control"
            id="region"
            name="region"
            onChange={handleInputChange}
            placeholder="Enter region as a 2 character code. ex: US"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>

      {location && weather && (
        <div className="card p-4 shadow mt-5 w-100">
          <h5 className="text-center mb-3">Weather & Location Info</h5>
          <div className="mb-2">Latitude: {location?.latt}</div>
          <div className="mb-2">Longitude: {location?.longt}</div>

          <table className="table table-bordered text-center mt-4">
  <thead className="table-light">
    <tr>
      <th></th>
      {weather.daily.time.map((_, idx) => (
        <th key={idx}>Day {idx + 1}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Dates</th>
      {weather.daily.time.map((date, idx) => (
        <td key={idx}>{date}</td>
      ))}
    </tr>
    <tr>
      <th scope="row">Max Temps (°F)</th>
      {weather.daily.temperature_2m_max.map((temp, idx) => (
        <td key={idx}>{temp}</td>
      ))}
    </tr>
    <tr>
      <th scope="row">Min Temps (°F)</th>
      {weather.daily.temperature_2m_min.map((temp, idx) => (
        <td key={idx}>{temp}</td>
      ))}
    </tr>
  </tbody>
</table>

        </div>
      )}
    </div>
  );
};

export default Destinations;