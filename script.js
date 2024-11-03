function calculateTiers() {
  const sunset = document.getElementById('sunset').value;
  const fajr = document.getElementById('fajr').value;

  if (!sunset || !fajr) {
    alert("Veuillez entrer les deux heures.");
    return;
  }

  const sunsetTime = new Date(`1970-01-01T${sunset}:00`);
  const fajrTime = new Date(`1970-01-01T${fajr}:00`);
  if (fajrTime < sunsetTime) {
    fajrTime.setDate(fajrTime.getDate() + 1);
  }

  const nightDuration = fajrTime - sunsetTime;
  const thirdOfNight = nightDuration / 3;
  const firstThird = new Date(sunsetTime.getTime() + thirdOfNight);
  const lastThird = new Date(fajrTime.getTime() - thirdOfNight);

  // Sélectionne le conteneur et y ajoute la classe 'active'
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `
    <p>Premier tiers : ${firstThird.toTimeString().slice(0, 5)}</p>
    <p>Début du Dernier tiers : ${lastThird.toTimeString().slice(0, 5)}</p>
  `;
  resultContainer.classList.add('active'); // Affiche le néon après le calcul

  saveData(sunset, fajr);
  requestNotification(firstThird, lastThird);
}

function resetFields() {
  document.getElementById('sunset').value = '';
  document.getElementById('fajr').value = '';
  
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = ''; // Efface le contenu du résultat
  resultContainer.classList.remove('active'); // Supprime l'effet néon au reset
  localStorage.removeItem("sunset");
  localStorage.removeItem("fajr");
}

function saveData(sunset, fajr) {
  localStorage.setItem("sunset", sunset);
  localStorage.setItem("fajr", fajr);
}

function loadStoredData() {
  const storedSunset = localStorage.getItem("sunset");
  const storedFajr = localStorage.getItem("fajr");
  if (storedSunset) document.getElementById('sunset').value = storedSunset;
  if (storedFajr) document.getElementById('fajr').value = storedFajr;
}

function requestNotification(firstThird, lastThird) {
  if (Notification.permission === "granted") {
    new Notification("Premier Tiers", { body: `Débute à ${firstThird.toTimeString().slice(0, 5)}` });
    new Notification("Dernier Tiers", { body: `Débute à ${lastThird.toTimeString().slice(0, 5)}` });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        requestNotification(firstThird, lastThird);
      }
    });
  }
}

// Vérifie et demande la permission de notification
function checkNotificationPermission() {
  if (Notification.permission === "granted") {
    console.log("Permission de notification déjà accordée.");
  } else if (Notification.permission === "denied") {
    console.log("Permission de notification refusée par l'utilisateur.");
    alert("Les notifications sont désactivées dans votre navigateur. Activez-les pour tester.");
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Permission de notification accordée.");
      } else {
        console.log("Permission de notification non accordée.");
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.accordion-item-header');

  accordions.forEach(header => {
    header.addEventListener('click', function () {
      // Ferme tous les autres éléments
      accordions.forEach(item => {
        if (item !== this && item.classList.contains('active')) {
          item.classList.remove('active');
          item.nextElementSibling.style.maxHeight = null;
        }
      });

      // Active/désactive l'élément cliqué
      this.classList.toggle('active');
      const body = this.nextElementSibling;
      if (this.classList.contains('active')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = null;
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const timeInputs = document.querySelectorAll('input[type="time"]');

  timeInputs.forEach(input => {
    if (!input.value) {
      input.setAttribute('placeholder', 'HH:MM'); // Affiche un format type placeholder
    }

    input.addEventListener('focus', function() {
      this.removeAttribute('placeholder');
    });

    input.addEventListener('blur', function() {
      if (!this.value) {
        this.setAttribute('placeholder', 'HH:MM');
      }
    });
  });
});
