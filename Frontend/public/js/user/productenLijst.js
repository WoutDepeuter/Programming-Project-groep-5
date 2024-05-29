document.addEventListener("DOMContentLoaded", () => {
  const reserveButtons = document.querySelectorAll(".reserveren");
  const productPopup = document.getElementById("productPopup");
  const closePopupButton = document.getElementById("closePopup");
  const productDetails = document.getElementById("productDetails");

  reserveButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = button.getAttribute("data-product-id");
      const productName = document.getElementById(
        `naam${productId}`
      ).textContent;
      const productDescription = button
        .closest(".box")
        .querySelector(".naam-en-besch p").textContent;

      console.log(productId);
      productDetails.innerHTML = `
          <div class="popup-box">
            <h2>${productName}</h2>
            <p>${productDescription}</p>
          </div>
        `;

      productPopup.style.display = "flex";
    });
  });

  closePopupButton.addEventListener("click", () => {
    productPopup.style.display = "none";
  });

  productPopup.addEventListener("click", (e) => {
    if (e.target === productPopup) {
      productPopup.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

  function toggleScrollToTopButton() {
      if (window.scrollY > 150) {
          scrollToTopBtn.classList.add("show");
      } else {
          scrollToTopBtn.classList.remove("show");
      }
  }

  window.addEventListener("scroll", function() {
      toggleScrollToTopButton();
  });

  scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });

  toggleScrollToTopButton();
});
