const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load saved notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";

    // Reattach delete button event listeners after loading from localStorage
    const deleteBtns = notesContainer.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", deleteNote);
    });
}
showNotes();

// Function to update localStorage with the current state of the notes container
const updateStorage = () => {
    localStorage.setItem("notes", notesContainer.innerHTML);
};

// Create a new note
const createNote = () => {
    const note = document.createElement("p");
    note.className = "input-box";
    note.setAttribute("contenteditable", "true");

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "images/delete.png";
    deleteBtn.className = "delete-btn";

    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);
    
    updateStorage();

    // Reattach event listener to the new delete button
    deleteBtn.addEventListener("click", deleteNote);
};

// Handle note deletion (remove both from DOM and localStorage)
const deleteNote = (e) => {
    const note = e.target.parentElement;
    note.remove(); // Remove note from DOM
    
    updateStorage(); // Update localStorage after removal
};

// Save edits to localStorage
notesContainer.addEventListener("input", updateStorage);

// Prevent Enter from creating new paragraphs
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
});

// Add new note on button click
createBtn.addEventListener("click", createNote);
