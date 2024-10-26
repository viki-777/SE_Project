import countries from 'world-countries';


const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;

// import { City } from 'country-state-city';

// interface CityData {
//   value: string;
//   label: string;
//   countryCode: string;
//   stateCode: string;
//   latlng: [number, number];
// }

// const formattedCities = (countryCode: string, stateCode: string): CityData[] => {
//   return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
//     value: city.name,
//     label: city.name,
//     countryCode: city.countryCode,
//     stateCode: city.stateCode,
//     // @ts-ignore
//     latlng: [parseFloat(city.latitude), parseFloat(city.longitude)],
//   }));
// };

// const useCountries= (countryCode: string, stateCode: string) => {
//   const getAll = () => formattedCities(countryCode, stateCode);

//   const getByValue = (value: string) => {
//     return formattedCities(countryCode, stateCode).find((city) => city.value === value);
//   };

//   return {
//     getAll,
//     getByValue,
//   };
// };

// export default useCountries;

