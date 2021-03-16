//Js file for website
window.onload = function() {
    openTab(null, "Main");
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if(tabName === "Admin"){
        if(prompt("Enter password.").toLowerCase() !== ""){
            alert("Wrong password. The password can be found at the top of the welcome message when you click 'edit'.");
            return;
        }
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function show(name) {
    var popup = document.getElementById(name);
    popup.classList.toggle("show");
}