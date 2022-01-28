const searchInput = document.querySelector('#search');

document.querySelector("input[type='submit']")
.addEventListener('click',main);

function main(){
    const city = searchInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8af3743a78aebba48bef14e59ea7651c`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.cod === '404')
            throw new Error('city not found');

        displayData(data);
    })
    .catch(error=>{
        console.log(error);
        searchInput.classList.add('error');
        setTimeout(()=>searchInput.classList.remove('error'),1200);
    });
}

const tempdiv = document.querySelector('span[data-temp]');
const humdiv = document.querySelector('span[data-humidity]');
const winddiv = document.querySelector('span[data-wind]');
const pressurediv = document.querySelector('span[data-pressure]');
const weathertype = document.querySelector('span[data-weathertype]');
const infoArr = [tempdiv, humdiv, pressurediv,winddiv,weathertype];

const displayData = data =>{
    searchInput.value = data.name;

    infoArr.forEach(e=>{
        e.classList.add('changeStart');
    });
    setTimeout(() =>{
        tempdiv.textContent = data.main.temp.toFixed() + '°C';
        humdiv.textContent = data.main.humidity + '%';
        winddiv.textContent = data.wind.speed.toFixed(1) + ' m/s';
        pressurediv.textContent = data.main.pressure + ' hPa';
        weathertype.textContent = capitalize(data.weather[0].description);
        setTimeout(()=>infoArr.forEach(e=>{
            e.classList.remove('changeStart');
        }),250);
    },150);
};

const capitalize = (str) => {
    return str.replace(/^\w/, c => c.toUpperCase());
};