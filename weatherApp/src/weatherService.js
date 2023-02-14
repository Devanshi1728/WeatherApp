const API_KEY= 'aff6cfbbb77fd9e90880f13359c22d07';
const makeIconURL = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const getWeatherData = async(city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    const data = await fetch(URL)
      .then((res) => res.json())
      .catch((data) => data);

    const { 
        main : { temp, feels_like, temp_min, temp_max, pressure, humidity }, 
        wind: { speed }, 
        weather, 
        name , 
        sys: { country }
    } = data;
    
    const { description, icon } = weather[0];
    
    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        description,
        name,
        iconURL: makeIconURL(icon)
    };
}

export { getWeatherData };