document.getElementById('probleem-bezitting').addEventListener("click", function() {
    openModal('probleemModal');
  });
  
  document.getElementById('annulatie-reservatie').addEventListener("click", function() {
    openModal('annulatieModal');
  });
  
  function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  
  window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for(let modal of modals) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  //script voor het openen en sluiten van de modals
  
  