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
          temperature_unit: 'fahrenheit',
          timezone: 'auto'
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

  const formatDateShort = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`; // MM/DD
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
        <div className="w-100 mt-5 text-center">
          <h3 className="mb-4">7 Day Weather Forecast</h3>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {weather.daily.time.map((date, index) => (
              <div className="card shadow-sm" style={{ width: "150px" }} key={index}>
                <div className="card-body">
                  <h6 className="card-title">{formatDateShort(date)}</h6>
                  <hr />
                  <p className="card-text mb-1"><strong>Low:</strong> {weather.daily.temperature_2m_min[index]}°F</p>
                  <p className="card-text"><strong>High:</strong> {weather.daily.temperature_2m_max[index]}°F</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;