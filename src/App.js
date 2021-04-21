import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Card,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((respond) => respond.json())
      .then((data) => setcountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log("data:", data);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));
          setcountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;
    setcountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountry(countryCode);
        setcountryInfo(data);
        console.log("CountryInfo", data);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Painel covid 19</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onChangeCountry}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            title="Casos de Corona"
            cases={countryInfo && countryInfo.cases}
          ></InfoBox>
          <InfoBox
            title="Recuperados"
            cases={countryInfo && countryInfo.recovered}
          ></InfoBox>
          <InfoBox
            title="Mortes"
            cases={countryInfo && countryInfo.deaths}
          ></InfoBox>
        </div>

        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Casos por países</h3>
          {/* Table */}
          <h3>Novos casos no mundo</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
