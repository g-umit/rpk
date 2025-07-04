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

function saveEntries() {
  const entries = [];
  const allContents = document.querySelectorAll('.day-content');
  allContents.forEach(content => {
    const dayEntries = [];
    content.querySelectorAll('.entry-item').forEach(entryDiv => {
      const entryText = entryDiv.querySelector('span').textContent;
      dayEntries.push(entryText);
    });
    if (dayEntries.length > 0) {
      entries.push({
        day: content.previousElementSibling.textContent.trim(),
        entries: dayEntries
      });
    }
  });
  localStorage.setItem('schedule', JSON.stringify(entries));
}

function loadEntries() {
  const savedEntries = localStorage.getItem('schedule');
  if (savedEntries) {
    const entries = JSON.parse(savedEntries);
    entries.forEach(dayEntry => {
      const dayHeader = [...document.querySelectorAll(".day-header")]
        .find(header => header.textContent.startsWith(dayEntry.day));
      if (dayHeader) {
        const contentDiv = dayHeader.nextElementSibling;
        dayEntry.entries.forEach(entry => {
          addEntryToDay(contentDiv, entry);
        });
      }
    });
  }
}

function addEntryToDay(contentDiv, entry) {
  const entryDiv = document.createElement("div");
  entryDiv.classList.add("entry-item");
  entryDiv.style.display = "flex";
  entryDiv.style.justifyContent = "space-between";
  entryDiv.style.alignItems = "center";
  entryDiv.style.padding = "12px";
  entryDiv.style.gap = "10px";
  entryDiv.style.fontSize = "52px";
  entryDiv.style.color = "blue";

  const entryText = document.createElement("span");
  entryText.textContent = entry;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Löschen";
  deleteBtn.style.padding = "12px";
  deleteBtn.style.fontSize = "36px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.border = "8px solid #ccc";
  deleteBtn.onclick = () => {
    contentDiv.removeChild(entryDiv);
    saveEntries();  // Nach Löschen speichern
  };

  entryDiv.appendChild(entryText);
  entryDiv.appendChild(deleteBtn);
  contentDiv.appendChild(entryDiv);
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
      entryDiv.style.padding = "12px";
      entryDiv.style.gap = "10px";
      entryDiv.style.fontSize = "52px";
      entryDiv.style.color = "blue";

      // Termintext
      const entryText = document.createElement("span");
      entryText.textContent = entry;

      // Löschen-Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Löschen";
      deleteBtn.style.padding = "12px";
      deleteBtn.style.fontSize = "36px";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.border = "8px solid #ccc";
      deleteBtn.onclick = () => {
        contentDiv.removeChild(entryDiv);
        saveEntries();  // Nach Löschen speichern

      // Zeit extrahieren und Push-Benachrichtigung planen
      const timeMatch = entry.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        const now = new Date();
        const entryTime = new Date();
        entryTime.setHours(parseInt(timeMatch[1]));
        entryTime.setMinutes(parseInt(timeMatch[2]));
        entryTime.setSeconds(0);
        entryTime.setMilliseconds(0);

        const delay = entryTime.getTime() - now.getTime() - 5 * 60 * 1000;

        if (delay > 0) {
          schedulePushNotification(
            `Termin um ${timeMatch[0]}`,
            'In 5 Minuten beginnt dein Termin!',
               delay
          );
        }
      }
      };

      entryDiv.appendChild(entryText);
      entryDiv.appendChild(deleteBtn);
      contentDiv.appendChild(entryDiv);

      document.getElementById("new-entry").value = ""; // Eingabe leeren
      if (!contentDiv.classList.contains("open")) {
        header.click(); // Öffne automatisch den Tag
      }

      saveEntries();  // Nach Hinzufügen speichern
      return;
    }
  }
  alert("Tag nicht gefunden.");
}

document.addEventListener("DOMContentLoaded", () => {
  loadEntries();
});

// Funktion zum Öffnen und Schließen des Menüs
function toggleMenu() {
  var sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
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

// Registrierung des Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registriert'));
}

// Benachrichtigungs-Erlaubnis anfragen
if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

function schedulePushNotification(title, body, delayInMs) {
  if ('Notification' in window && Notification.permission === 'granted') {
    setTimeout(() => {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.active) {
          registration.active.postMessage({
            type: "push",
            title,
            body
          });
        }
      });
    }, delayInMs);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    function getMondayOfCurrentWeek(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    }

    function formatDate(date) {
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    function getWeekRangeAndKW() {
      const now = new Date();
      const monday = getMondayOfCurrentWeek(new Date(now));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      // ISO 8601 Kalenderwoche berechnen
      const temp = new Date(monday);
      temp.setHours(0, 0, 0, 0);
      temp.setDate(temp.getDate() + 3 - ((temp.getDay() + 6) % 7));
      const week1 = new Date(temp.getFullYear(), 0, 4);
      const kw = 1 + Math.round(((temp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);

      const formatted = `KW ${kw} – Woche vom ${formatDate(monday)} bis ${formatDate(sunday)}`;
      const weekInfoDiv = document.getElementById("week-info");
      if (weekInfoDiv) {
        weekInfoDiv.innerText = formatted;
      }
    }

    getWeekRangeAndKW();
  });
