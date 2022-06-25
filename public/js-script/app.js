




const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msgOne = document.querySelector("#msg1")
const msgTwo = document.querySelector("#msg2")

// msgOne.textContent = "From Javascript"

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = search.value 
    
    msgOne.textContent = "Loading....."
    msgTwo.textContent = ""
    fetch("http://localhost:3000/weather?address=" + location).then((response)=>{    
        response.json().then((data)=>{
            if(data.error){
                msgOne.textContent =  data.error
                // console.log(data.error)
            }
            else{
                msgOne.textContent = "Weather update: " + data.forecast.weatherUpdate + ". " + "It is currently " + data.forecast.temperature + " degrees celcuis"
                msgTwo.textContent = "Location: " +data.location
                // console.log(data)
            }           
        })   
})


})