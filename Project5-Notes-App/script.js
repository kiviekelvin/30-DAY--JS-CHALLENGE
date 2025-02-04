const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load saved notes from localStorage
function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}
showNotes();

// Function to update localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Save content on keyup
    inputBox.addEventListener("keyup", updateStorage);
    updateStorage();
});

// Delete note when clicking the delete icon
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Prevent Enter key from creating a new paragraph
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
