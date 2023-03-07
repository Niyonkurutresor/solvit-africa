let city = ''


let val = document.querySelector('input');
let button = document.querySelector('button')

document.addEventListener('keypress',(e)=>{ 
    if(e.key === "Enter"){
        city = val.value
        val.value = ''
        fetchwether(city)
    }
})

button.addEventListener('click',()=>{
    city = val.value
    val.value = ''
    fetchwether(city)

})




const locationq = document.querySelector('.location')
const temperatureq = document.querySelector('.temperature');
const minTempq = document.querySelector('.minTemp');
const maxTempq = document.querySelector('.maxTemp')
const windSpeedq = document.querySelector('.windSpeed')


async function fetchwether(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4250b2cd87dac1e3f5f6c5ca481dc10c`;

    const result = await fetch(url)
    const json = await result.json()
     console.log(json)
     let temperature = json.main.temp
     let minTemp = json.main.temp_min
     let maxTemp = json.main.temp_max
     let windSpeed = json.wind.speed
     let name = json.name

     locationq.innerHTML = name
     temperatureq.innerHTML = temperature
     minTempq.innerHTML = minTemp
     maxTempq.innerHTML = maxTemp
     windSpeedq.innerHTML = windSpeed
    
     
}

