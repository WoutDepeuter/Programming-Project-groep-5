console.log("test")

let voegProductToeButton = document.getElementById("search");
let elements = document.getElementsByTagName("main")

voegProductToeButton.addEventListener("click", function(){
    console.log(elements.childNodes())
})