import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  // Fetch all the countries
  const fetchCountry = async () => {
    try {
      const res = await axios.get(`https://crio-location-selector.onrender.com/countries`);
      console.log("country list =>",res);
      setCountries(res.data);
    } catch (e) {
      console.log("Error fetching data: ", e);
    }
  };

  // Fetch all states of selected country
  const fetchState = async () => {
    if (selectedCountry) {
      try {
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        console.log("State list =>", res);
        setStates(res.data);
        // Reset the state and city based on country value
        setSelectedState("");
        setCities([]);
        setSelectedCity("");
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    }
  };

  // Fetch the city of selected state of a country
  const fetchCity = async () => {
    if (selectedCountry && selectedState) {
      try {
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        console.log("city list =>", res);
        setCities(res.data);
        setSelectedCity("");
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    }
  };


  // Initial render
  useEffect(() => {
    fetchCountry();
  }, []);


  // Render after chosse the country
  useEffect(() => {
    fetchState();
  }, [selectedCountry]);


  // Render after chosse the country and state
  useEffect(() => {
    fetchCity()
  }, [selectedCountry, selectedState]);



  return (
    <div className="city-selector" role="presentation">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry && !selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity},</span>
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
