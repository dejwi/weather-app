document.querySelector("input[type='submit']")
.addEventListener('click',main);

function main(){
    console.log('jd');
    const city = 'Szczecin';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8af3743a78aebba48bef14e59ea7651c`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

