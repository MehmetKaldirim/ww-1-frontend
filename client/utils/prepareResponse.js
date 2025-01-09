import moment from 'moment';

const timeDictionary = {
    Morning: '06:00',
    Day: '12:00',
    Evening: '18:00',
    Night: '23:00'
};

const prepareResponse = (response) => {
    const currentDayWeather = response.forecast.forecastday[0];
    const currentDayWeatherHourly = response.forecast.forecastday[0].hour;

    const weatherReduce = (dataArr) => {
       return dataArr.reduce((acc, el) => {
            const time = el.time.split(' ')[1];
    
            for (const timeLabel in timeDictionary) {
                if (timeDictionary[timeLabel] === time) {
                    const iconCode = el.condition.icon.match(/(\d+)\.png$/)[1];
                    acc.push({
                        time: timeLabel,
                        temp: el.temp_c,
                        icon: iconCode,
                        wind: el.wind_kph,
                    });
                    break;
                }
            }
            return acc;
        }, []);
    };

    const weatherData = weatherReduce(currentDayWeatherHourly)

    const details = {
        Location: response.location.name,
        Sunrise: currentDayWeather.astro.sunrise,
        Sunset: currentDayWeather.astro.sunset,
        Pressure: response.current.pressure_mb,
    };

    const recordData = {
        mintemp: currentDayWeather.day.maxtemp_c,
        maxtemp: currentDayWeather.day.mintemp_c,
        wind: response.current.wind_kph,
    };

    const forecast = response.forecast.forecastday.reduce((acc, el)  => {
        const day = {};
        day.date = moment(el.date).format("MMM Do");
        day.data = weatherReduce(el.hour);

        acc.push(day);
        return acc;
    }, []);

    forecast.shift();
    

    return {
        currentDay: {
            weatherData,
            details,
            recordData,
        },
        forecast
    };
};

export default prepareResponse;