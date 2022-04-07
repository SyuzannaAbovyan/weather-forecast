const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57';  
const ICON_URL = 'http://openweathermap.org/img/w';

// BOM
// https://learn.javascript.ru/browser-environment

const tagSetValue = (tagId, value = '') => {
    document.getElementById(tagId).innerHTML = value;
}

const setImgSrc = (tagId, src) => {
    document.getElementById(tagId).src = src;
}

const renderData = (data) => {
    const { 
        name, 
        main: { temp }, 
        sys: { country },
        weather:[{icon}] // const icon = data.weather[0].icon
    } = data;

    
    console.log(icon, 'data');
    tagSetValue('city', name);
    tagSetValue('country', country);
    tagSetValue('temp', Math.round(temp));
    setImgSrc('tempIcon', `${ICON_URL}/${icon}.png`)
}

const gettingWeather = () => { 
    const inputValue = document.getElementById('input').value;
    if (inputValue) {
        fetch(`${API_URL}/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
        .then(resp => {
            return resp.json();
        })
        .then(result => {
            tagSetValue('errorMessage', '')
            renderData(result);
        })
    } else {
        tagSetValue('errorMessage', 'Please enter the city name')
    }
  
}

const handleKeyUpInput = (event) => {
    if (event.keyCode === 13) {
        gettingWeather();
    }
}