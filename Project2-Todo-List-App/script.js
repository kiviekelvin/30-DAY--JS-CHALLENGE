const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Create a span for the "remove" button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // '×' character
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    // Handle checking/unchecking task
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    // Handle task removal via the span
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save the list data to localStorage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load and display saved tasks from localStorage
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
