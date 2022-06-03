
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f4c1f81bb1b6d93ad3a0f1c548c7fd30&units=imperial';
const button = document.querySelector('#generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();


button.addEventListener('click', () => {
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    getTemp(baseURL, zipCode, apiKey)
    .then((data) => {
        console.log(data);
        postData('/postData', {
            date: newDate,
            temp: data.main.temp,
            content: feelings
        })
        retrieveData();
    })
});


const getTemp = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}



const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
             return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}



const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }