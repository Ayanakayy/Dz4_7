const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');


const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.onclick = () =>{
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = "OK"
        phoneResult.style.color = "green"
    }else{
        phoneResult.innerHTML = "NOT OK"
        phoneResult.style.color = "red"
    }
}
//
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = "none"
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = "block"
    tabs[id].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

let showIndex = 0
setInterval(() => {
    hideTabContent();
    showIndex = (showIndex + 1) % tabs.length;
    showTabContent(showIndex);
}, 3000);

tabsParent.onclick = (event) =>{
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tab,tabIndex) => {
            if (event.target === tab){
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}

//


const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const krwInput = document.querySelector('#krw');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2, targetElement3) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/convertor.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.id === "som") {
                targetElement1.value = (element.value / data.usd).toFixed(2); // в USD
                targetElement2.value = (element.value / data.eur).toFixed(2); // в EUR
                targetElement3.value = (element.value * data.krw).toFixed(2); // в KRW
            }

            if (element.id === "usd") {
                targetElement1.value = (element.value * data.usd).toFixed(2); // в СОМ
                targetElement2.value = (element.value * data.usd / data.eur).toFixed(2); // в EUR
                targetElement3.value = (element.value * data.usd / data.krw).toFixed(2); // в KRW
            }

            if (element.id === "eur") {
                targetElement1.value = (element.value * data.eur).toFixed(2); // в СОМ
                targetElement2.value = (element.value * data.eur / data.usd).toFixed(2); // в USD
                targetElement3.value = (element.value * data.eur / data.krw).toFixed(2); // в KRW
            }

            if (element.id === "krw") {
                targetElement1.value = (element.value / data.krw).toFixed(2); // в СОМ
                targetElement2.value = (element.value * data.krw / data.usd).toFixed(2); // в USD
                targetElement3.value = (element.value * data.krw / data.eur).toFixed(2); // в EUR
            }
        }
    }
}

converter(somInput, usdInput, eurInput, krwInput);
converter(usdInput, somInput, eurInput, krwInput);
converter(eurInput, somInput, usdInput, krwInput);
converter(krwInput, somInput, usdInput, eurInput);

//

const nextButton = document.querySelector("#btn-next")
const prevButton = document.querySelector("#btn-prev")
const cardBlock = document.querySelector(".card")

let cardIndex = 0

function updateCard(cardIndex) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
        .then((response) => response.json())
        .then((data) => {
            const { title, completed, id } = data
            cardBlock.innerHTML =
                `<p>${title}</p>
                <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
                <span>${id}</span>`
        })
}

nextButton.onclick = () => {
    cardIndex++
    if (cardIndex > 200){
        cardIndex = 1
    }
    updateCard(cardIndex);
}

prevButton.onclick = () => {
    cardIndex--;
    if(cardIndex < 1) {
        cardIndex = 200
    }
    updateCard(cardIndex);
}
const postsFetch = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        const posts = await response.json();
        console.log(posts);
    } catch (e) {
        console.log(e)
    }
}

//
const searchInput = document.querySelector('.cityName')
const searchBtn = document.querySelector('#search');
const cityName = document.querySelector('.city');
const cityTemp = document.querySelector('.temp');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

searchBtn.onclick = async () => {
    try {
        if (searchInput.value !== '') {
            const responseWeather = await fetch(`${API_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric&lang=ru`)
            const dataWeather = await responseWeather.json();
            if (dataWeather.cod === '404') {
                cityName.innerHTML = 'Введите корректное название';
                cityTemp.innerHTML = '';
            } else {
                cityName.innerHTML = dataWeather.name;
                cityTemp.innerHTML = Math.round(dataWeather.main.temp) + 'ºC';
            }
            searchInput.value = ''
        } else {
            cityName.innerHTML = 'Введите название города';
            cityTemp.innerHTML = '';
        }
    } catch (error) {
        console.log(error);
    }

}