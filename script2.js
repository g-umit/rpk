// Funktion, um eine Notiz hinzuzufügen
function addNote() {
    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Bitte gib eine Notiz ein.");
        return;
    }

    // Erstelle die Notiz und füge sie zur Liste hinzu
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `
        <span>${noteText}</span>
        <button onclick="deleteNote(this)">X</button>
    `;

    // Notiz zur Liste hinzufügen
    const notesList = document.getElementById("notesList");
    notesList.appendChild(noteElement);

    // Eingabefeld zurücksetzen
    noteInput.value = "";
}

// Funktion, um eine Notiz zu löschen
function deleteNote(button) {
    const note = button.parentElement;
    note.remove();
}
