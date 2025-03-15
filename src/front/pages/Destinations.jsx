import React, { useEffect, useState } from "react";

const Destinations = () => {

  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    city: '',
    region: '',
  });


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
      'strictmode': '1'
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
        <div>Lattitude: {JSON.stringify(location?.latt)}</div>
        <div>Longitude: {JSON.stringify(location?.longt)}</div>
      </div>
    </div>
  );
};

export default Destinations;