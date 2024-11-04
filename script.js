/*function calculateTiers() {
  const sunset = document.getElementById('sunset').value;
  const fajr = document.getElementById('fajr').value;

  if (!sunset || !fajr) {
    alert("Veuillez entrer les deux heures.");
    return;
  }

  const sunsetTime = new Date(`1970-01-01T${sunset}:00`);
  const fajrTime = new Date(`1970-01-02T${fajr}:00`); // Ajouter un jour si fajr est après minuit

  const nightDuration = fajrTime - sunsetTime;
  const thirdOfNight = nightDuration / 3;

  const firstThirdEnd = new Date(sunsetTime.getTime() + thirdOfNight);
  const secondThirdEnd = new Date(firstThirdEnd.getTime() + thirdOfNight);
  const lastThirdStart = secondThirdEnd; // Le dernier tiers commence à la fin du deuxième tiers

  // Sélectionne le conteneur et y ajoute la classe 'active'
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `
    <p>Le premier tiers de la nuit débute au : ${sunsetTime.toTimeString().slice(0, 5)} et se termine à : ${firstThirdEnd.toTimeString().slice(0, 5)}</p>
    <p>Le deuxième tiers de la nuit commence à : ${firstThirdEnd.toTimeString().slice(0, 5)} et se termine à : ${secondThirdEnd.toTimeString().slice(0, 5)}</p>
    <p>Le dernier tiers de la nuit commence à : ${lastThirdStart.toTimeString().slice(0, 5)} et se termine à : ${fajrTime.toTimeString().slice(0, 5)}</p>
  `;
  resultContainer.classList.add('active'); // Affiche le néon après le calcul

  saveData(sunset, fajr);
}*/



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
  const secondThird = new Date(firstThird.getTime() + thirdOfNight);
  const lastThird = new Date(fajrTime.getTime() - thirdOfNight);

  // Afficher les résultats dans les cartes
  document.getElementById('startFirstThird').textContent = sunsetTime.toTimeString().slice(0, 5);
  document.getElementById('endFirstThird').textContent = firstThird.toTimeString().slice(0, 5);

  document.getElementById('startSecondThird').textContent = firstThird.toTimeString().slice(0, 5);
  document.getElementById('endSecondThird').textContent = secondThird.toTimeString().slice(0, 5);

  document.getElementById('startLastThird').textContent = lastThird.toTimeString().slice(0, 5);
  document.getElementById('endLastThird').textContent = fajrTime.toTimeString().slice(0, 5);

  // Affiche un effet ou met à jour le conteneur si nécessaire
  const resultContainer = document.getElementById('result');
  resultContainer.classList.add('active'); // Ajoute la classe 'active' si souhaité

  saveData(sunset, fajr);
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

const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
