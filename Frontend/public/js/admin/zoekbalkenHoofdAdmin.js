// Functie: Filteren van reservaties op naam en productID
// Deze functie filtert de reservaties op naam en productID.
// De gebruiker kan zoeken op naam en productID.
// De functie wordt uitgevoerd wanneer de gebruiker iets typt in de zoekbalken.

document.addEventListener("DOMContentLoaded", () => {
  const zoekbalkNaam = document.getElementById("zoekbalkNaam");
  const zoekbalkID = document.getElementById("zoekbalkID");

  zoekbalkNaam.addEventListener("input", () => {
    const zoekTermNaam = zoekbalkNaam.value.toLowerCase();
    filterReservaties(zoekTermNaam, "naam");
  });

  zoekbalkID.addEventListener("input", () => {
    const zoekTermID = zoekbalkID.value.toLowerCase();
    filterReservaties(zoekTermID, "id");
  });

  function filterReservaties(zoekTerm, type) {
    const reservaties = document.querySelectorAll(".reservations li");

    reservaties.forEach(reservatie => {
      const naam = reservatie.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
      const productID = reservatie.querySelector("p:nth-of-type(3)").textContent.toLowerCase();

      if (type === "naam") {
        if (naam.includes(zoekTerm)) {
          reservatie.style.display = "";
        } else {
          reservatie.style.display = "none";
        }
      }
      if (type === "id") {
        if (productID.includes(zoekTerm)) {
          reservatie.style.display = "";
        } else {
          reservatie.style.display = "none";
        }
      }
    });
  }
});
