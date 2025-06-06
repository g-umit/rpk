function toggleContent(clickedHeader) {
  const allContents = document.querySelectorAll('.day-content');
  allContents.forEach(content => {
    if (content.previousElementSibling !== clickedHeader) {
      content.classList.remove('open');
    }
  });
  const currentContent = clickedHeader.nextElementSibling;
  currentContent.classList.toggle('open');
}

function toggleContent(clickedHeader) {
  const allContents = document.querySelectorAll('.day-content');
  allContents.forEach(content => {
    if (content.previousElementSibling !== clickedHeader) {
      content.classList.remove('open');
    }
  });
  const currentContent = clickedHeader.nextElementSibling;
  const isOpen = currentContent.classList.contains('open');
  currentContent.classList.toggle('open');
  if (!isOpen) {
    clickedHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function addEntry() {
  const day = document.getElementById("day-select").value;
  const entry = document.getElementById("new-entry").value.trim();
  if (!entry) {
    alert("Bitte gib einen Termin ein.");
    return;
  }

  // Passenden Tag finden
  const headers = document.querySelectorAll(".day-header");
  for (const header of headers) {
    if (header.textContent.startsWith(day)) {
      const contentDiv = header.nextElementSibling;

      // Termin-Container
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry-item");
      entryDiv.style.display = "flex";
      entryDiv.style.justifyContent = "space-between";
      entryDiv.style.alignItems = "center";
      entryDiv.style.marginBottom = "5px";
      entryDiv.style.gap = "10px";
      entryDiv.style.fontSize = "52px";
      entryDiv.style.color = "blue";

      // Termintext
      const entryText = document.createElement("span");
      entryText.textContent = entry;

      // Löschen-Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Löschen";
      deleteBtn.style.padding = "8px";
      deleteBtn.style.fontSize = "36px";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.border = "8px solid #ccc";
      deleteBtn.onclick = () => {
        contentDiv.removeChild(entryDiv);
      };

      entryDiv.appendChild(entryText);
      entryDiv.appendChild(deleteBtn);
      contentDiv.appendChild(entryDiv);

      document.getElementById("new-entry").value = ""; // Eingabe leeren
      if (!contentDiv.classList.contains("open")) {
        header.click(); // Öffne automatisch den Tag
      }
      return;
    }
  }
  alert("Tag nicht gefunden.");
}

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = (sidebar.style.width === "600px") ? "0" : "600px";
}

function showAdventskalender() {
  // Bereich anzeigen
  document.getElementById("adventskalender-bereich").style.display = "block";

  // Menü schließen
  document.getElementById("sidebar").style.width = "0";

  // Optional: sanft scrollen zum Bereich
  document.getElementById("adventskalender-bereich").scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
