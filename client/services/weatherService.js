import axios from "axios";
import keys from "../config/keys";


const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';

export const getWeather = async (location) => {
    const url = `${BASE_URL}?key=${keys .WEATHER_KEY}&q=${location}&days=5`;

    return await axios.get(url);
;
};