// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// document.getElementById shorthand function
// ex: byId("div-id").classList.add("new-class");
var byId = function( id ) { return document.getElementById( id ); };
// document.querySelector shorthand function
var bySelector = function( selector ) { return document.querySelector( selector ); };
// ex: bySelector("div-class").classList.add("new-class");


byId("search-button").addEventListener('click', function(){
    const searchTerm = byId("search-box").value;
    console.log("searchTerm", searchTerm);
    searchByTerm(searchTerm);
    console.log("called searchByTerm()", "true");
});

function searchByTerm(searchTerm) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            byId("search-results").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "https://localhost:7186/api/country/filter/" + searchTerm, true);
    xhttp.send();
}

function buildResults(results) {
    
}