document.addEventListener('DOMContentLoaded', function() {
    function setNextWorkday(date) {
      let dayOfWeek = date.getDay();
      
      if (dayOfWeek === 6) {
        date.setDate(date.getDate() + 2);
      } else if (dayOfWeek === 0) {
        date.setDate(date.getDate() + 1);
      }
    }

    let today = new Date();
    setNextWorkday(today);

    let nextWorkday = today.toISOString().split('T')[0];
    document.getElementById('van-tijd').setAttribute('min', nextWorkday);

    document.getElementById('van-tijd').addEventListener('change', function() {
      let vanTijd = new Date(this.value);
      let totTijd = new Date(vanTijd);
      totTijd.setDate(totTijd.getDate() + 7);

      setNextWorkday(totTijd);

      let formattedTotTijd = totTijd.toISOString().split('T')[0];
      let totTijdInput = document.getElementById('tot-tijd');
      totTijdInput.disabled = false;
      totTijdInput.value = formattedTotTijd;
      totTijdInput.setAttribute('min', formattedTotTijd);
      totTijdInput.disabled = true;
    });
  }); 

