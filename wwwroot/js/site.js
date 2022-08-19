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

const getCountryByCode = (code) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getCountryByCode called");
            byId("country-results").innerHTML = buildCountry(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://localhost:7186/api/country/code/" + code, true);
    xhttp.send();
    return false;
}

// check for country querystring
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    if(key == "country") {
        console.log("country in QS", true);
        const countryCode = getCountryByCode(value);
        console.log("countryCode from QS", countryCode);
    }
    console.log(`${key}:${value}`);
}

const searchByTermConst = (searchTerm) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("searchByTermConst called");
            byId("country-results").innerHTML = buildResults(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://localhost:7186/api/country/filter/" + searchTerm, true);
    xhttp.send();
    return false;
}

const buildCountry = (data) => {
    console.log("data", data);
    let resultsMarkup = "";

    if(data.length) {
        for (x in data) {
            resultsMarkup += `
                <h3>${data[x].name.common}</h3>
                <ul><li><b>Code 2:</b> ${data[x].cca2}</li>
                <li><b>Code 3:</b> ${data[x].ccn3}</li>
                <li><b>Flag:</b> ${data[x].flag}</li>
                <li><b>Pop:</b> ${data[x].population}</li>
                <li><b>Region:</b> ${data[x].region}</li>
                <li><b>Subregion:</b> ${data[x].subregion}</li>
                <li><b>Languages:</b><ul>
            `;
            console.log("langs", Object.values(data[x].languages));
            Object.values(data[x].languages).forEach(lang => {
                console.log("lang", lang);
                resultsMarkup += `<li>${lang}</li>`;
            });
            resultsMarkup += `</li></ul></ul>`;
        }
    }
    return resultsMarkup;
}

const buildResults = (data) => {
    console.log("data", data);
    let resultsMarkup = "";

    if(data.length) {
        let resultCount = 0;
        for (x in data) {
            console.log("region", data[x].region);
            resultsMarkup += `
                <ul><li><a href="?country=${data[x].cca2}">${data[x].name.common}</a></li>
                <li><b>Code 2:</b> ${data[x].cca2}</li>
                <li><b>Code 3:</b> ${data[x].ccn3}</li>
                <li><b>Flag:</b> ${data[x].flag}</li>
                <li><b>Pop:</b> ${data[x].population}</li>
                <li><b>Region:</b> ${data[x].region}</li>
                <li><b>Subregion:</b> ${data[x].subregion}</li>
                <li><b>Languages:</b><ul>
            `;
            Object.values(data[x].languages).forEach(lang => {
                resultsMarkup += `<li>${lang}</li>`;
            });
            resultsMarkup += `</li></ul></ul>`;
            resultCount++;
        }
        console.log("resultCount", resultCount);
        resultsMarkup += `<p>Showing ${resultCount} result${resultCount > 1 ? `s` : ``}`;
    } else {
        resultsMarkup = `<p>No results</p>`;
    }
    return resultsMarkup;
}
