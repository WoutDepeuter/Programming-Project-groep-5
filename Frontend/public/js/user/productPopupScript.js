document.addEventListener("DOMContentLoaded", () => {
  const reserveButtons = document.querySelectorAll(".reserveren");
  const productPopup = document.getElementById("productPopup");
  const closePopupButton = document.getElementById("closePopup");
  const productDetails = document.getElementById("productDetails");

  reserveButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const productId = button.getAttribute("data-product-id");

      try {
        const response = await fetch(`/getproducteninfo/${productId}`);
        if (!response.ok) {
          throw new Error("Error fetching product information");
        }
        const productInfo = await response.json();
        const MERK = productInfo.product.MERK;
        const productnaam = productInfo.product.naam;
        const productDescription = productInfo.product.Beschrijving;
        const reservationLinks = productInfo.relatedProducts
          .map(
            (product) =>
              `<a href="/reservatie-van-producten/${product.product_ID}">${product.product_ID}</a>`
          )
          .join("<br>");

        productDetails.innerHTML = `
            <div class="popup-box">
                <h1 style="font-size: 20px;">Merk: ${MERK}</h1>
                <h1 style="font-size: 20px;">Naam: ${productnaam}</h1 >
                <hr>
                <h2 style="font-size: 20px;">Artikels:<br> ${reservationLinks}</h2>
                </div>
                <style>
                .popup-box a {
                  text-decoration: none;
                  color: #333; 
                  padding: 6px 12px;
                  border-radius: 4px;
                  transition: all 0.3s ease; 
                  display: inline-block;                  
                  background-color: #fff;
              }
              
              .popup-box a:hover {
                  color: #fff; 
                  background-color: #ff4444;
                  border-color: #333; 
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);  
              }
              
  </style>
          `;

        productPopup.style.display = "flex";
      } catch (error) {
        console.error("Error:", error);
      }
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
