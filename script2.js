document.addEventListener('DOMContentLoaded', loadNotes);

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

    // Speichere die Notizen im LocalStorage
    saveNotes();

    // Eingabefeld zurücksetzen
    noteInput.value = "";
}

// Funktion, um eine Notiz zu löschen
function deleteNote(button) {
    const note = button.parentElement;
    note.remove();

    // Speichere die Notizen im LocalStorage
    saveNotes();
}

// Funktion, um alle Notizen im LocalStorage zu speichern
function saveNotes() {
    const notesList = document.getElementById("notesList");
    const notes = [];

    // Durch alle Notizen iterieren und speichern
    for (let noteElement of notesList.children) {
        const noteText = noteElement.querySelector("span").textContent;
        notes.push(noteText);
    }

    // Notizen im LocalStorage speichern
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Funktion, um die Notizen aus dem LocalStorage zu laden
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    
    if (savedNotes) {
        const notesList = document.getElementById("notesList");

        // Alle gespeicherten Notizen anzeigen
        savedNotes.forEach(noteText => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.innerHTML = `
                <span>${noteText}</span>
                <button onclick="deleteNote(this)">X</button>
            `;
            notesList.appendChild(noteElement);
        });
    }
}
