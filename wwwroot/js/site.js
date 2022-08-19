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
    // const response = searchByTerm(searchTerm);
    const response = searchByTermConst(searchTerm);
    console.log("response", response);
});

// check for country querystring
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    if(key == "country") {
        console.log("country in QS", true);
        // ajax call to load single country results
    }
    console.log(`${key}:${value}`);
}

const searchByTermConst = (searchTerm) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("func const called");
            byId("search-results").innerHTML = buildResults(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://localhost:7186/api/country/filter/" + searchTerm, true);
    xhttp.send();
    return false;
}

const buildResults = (data) => {
    console.log("data", data);
    let resultsMarkup = `<ul>`;

    if(data.length) {
        let resultCount = 0;
        for (x in data) {
            console.log("region", data[x].region);
            resultsMarkup += `
                <li><a href="?country=${data[x].cca2}">${data[x].name.common}</a></li>
            `;
            resultCount++;
        }
        console.log("resultCount", resultCount);
        resultsMarkup += `</ul><p>Showing ${resultCount} result${resultCount > 1 ? `s` : ``}`;
    } else {
        resultsMarkup = `<p>No results</p>`;
    }
    return resultsMarkup;
}
