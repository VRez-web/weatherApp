const searchForm = document.querySelector('.search-form')

class DBService {
    constructor() {
        this.API_KEY = '48d422acdb70fe5223a7b14816fc2651'
        this.SERVER = 'http://api.openweathermap.org/data/2.5/'
    }

    getData = async url => {
        const response = await fetch(url)

        if (response.ok) {
            return response.json()
        } else {
            throw new Error(`Не удалось получить данные по адрессу ${url}`)
        }
    }

    getSearchResults = query => {
        this.temp = `${this.SERVER}weather?q=${query}&units=metric&appid=${this.API_KEY}&lang=ru`
        return this.getData(this.temp)
    }

}
const dbserice = new DBService()



const displayResults = response => {
    const city = document.querySelector('.city')
    let date = document.querySelector('.location .date')
    const currentTemp = document.querySelector('.current .temp')
    const descriptionWeather = document.querySelector('.current .weather')
    const hiLow = document.querySelector('.current .hi-low')


    let now = new Date()





    city.innerText = response.name
    date.innerText = dateBuilder(now)
    currentTemp.innerHTML = `${Math.round(response.main.temp)} <span>°c</span>`
    descriptionWeather.innerText = response.weather[0].description
    hiLow.innerHTML = `${Math.round(response.main.temp_min)}°c / ${Math.round(response.main.temp_max)}°c`
}


function dateBuilder(d) {

    let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    let date = d.getDate()

    return `${day} ${date} ${month} ${year}`
}


searchForm.addEventListener('submit', event => {
    event.preventDefault()

    const searchFormInput=document.querySelector('.search-box')
    const value = searchFormInput.value.trim()
    searchFormInput.value = ''

    if(value){
        dbserice.getSearchResults(value).then(displayResults)
    }
})