import '../css/styles.css'
let tr = document.querySelectorAll("tr");
let td = document.querySelectorAll("td");
const searchButton = document.querySelector("button");
const searchText = document.querySelector("input");

searchButton.addEventListener("click", searchFunction);

const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};


function searchFunction(e) {

    if(td.length != 0 ) {
        td.forEach(item => {item.remove()});
        tr.forEach(item => {item.rowIndex != 0 ? item.remove() : item});
        td = document.querySelectorAll("td");
    } 

    const response = fetch('http://localhost:3000/postURL', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ message: searchText.value.toString()})
    });

    response.then(res => res.json())
    .then(data => receiveData(data))
    .catch(e => console.error(e));

    response.then((statusCode) => {
        if (statusCode.status == 200) {
            console.log("data received");
        }
    })
}


async function receiveData(data) {

    let firstTable = document.createElement("td");
    let secondTable = document.createElement("td");

    for(let index = 0; index < Object.keys(data).length; index++) {
        tr.forEach((item) => {

            let box = document.createElement("tr");
            firstTable = document.createElement("td");
            secondTable = document.createElement("td");

            item.after(box);
            box.append(firstTable);
            firstTable.textContent = data[index]["username"];
            
            firstTable.after(secondTable);
            secondTable.textContent = data[index]["comment"];
        })
    }

    tr = document.querySelectorAll("tr");
    td = document.querySelectorAll("td");
} 




