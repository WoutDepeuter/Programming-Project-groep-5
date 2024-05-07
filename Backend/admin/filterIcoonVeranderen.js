console.log("Script loaded")

let filterIcoon = document.getElementById("filter-icoon");
let prodNavigatie = document.getElementById("jklfmdjfs");

filterIcoon.addEventListener("mouseover", function(){
    filterIcoon.setAttribute("src", "../../Frontend/pictures/filter_hover.png")
})

prodNavigatie.addEventListener("mouseover", function(){
    filterIcoon.setAttribute("src", "../../Frontend/pictures/filter.png")
    console.log("test")
})