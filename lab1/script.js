function showRoutine(){

var table = document.getElementById("routineTable");

if(table.style.display === "block"){
table.style.display = "none";
}
else{
table.style.display = "block";
}

}

document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

document.getElementById("formMessage").innerText =
"Thank you! Your message has been submitted.";

});

