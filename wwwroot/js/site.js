// FYI: typically I delete all console logs after completion of an app but
// I left most of them in for this exercise to better demonstrate my thought process

// document.getElementById shorthand function
// ex: byId("div-id").classList.add("new-class");
var byId = function( id ) { return document.getElementById( id ); };
// document.querySelector shorthand function
var bySelector = function( selector ) { return document.querySelector( selector ); };
// ex: bySelector("div-class").classList.add("new-class");

// submit button click handling
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
        var regionsMap = new Map();
        var subRegionsMap = new Map();
        for (x in data) {
            // map regions
            const region = data[x].region;
            console.log(region);
            var mapHasRegion = regionsMap.has(region);
            console.log("has " + region, mapHasRegion);
            if(!mapHasRegion) {
                regionsMap.set(region, 1);
            } else {
                let regionCount = regionsMap.get(region);
                regionCount++;
                regionsMap.set(region, regionCount);
            }
            console.log("regionsMap", regionsMap);
            
            // map subregions
            const subRegion = data[x].subregion;
            console.log(subRegion);
            var mapHasSubRegion = subRegionsMap.has(subRegion);
            console.log("has " + subRegion, mapHasSubRegion);
            if(!mapHasSubRegion) {
                subRegionsMap.set(subRegion, 1);
            } else {
                let subRegionCount = subRegionsMap.get(subRegion);
                subRegionCount++;
                subRegionsMap.set(subRegion, subRegionCount);
            }
            console.log("subRegionsMap", subRegionsMap);

            resultsMarkup += `
                <ul><li><b><a href="?country=${data[x].cca2}">${data[x].name.common}</a></b></li>
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
        resultsMarkup += `
            <p><b>Showing:</b></p>
            <p>${resultCount} countr${resultCount > 1 ? `ies` : `y`}</p>
            <p>${regionsMap.size} region${regionsMap.size > 1 ? `s` : ``}:<ul class="no-top-margin">
        `;
        regionsMap.forEach((count, region) => {
            resultsMarkup += `<li>${region}: ${count}</li>`;
        });
        resultsMarkup += `
            </ul></p>
            <p>${subRegionsMap.size} subregion${subRegionsMap.size > 1 ? `s` : ``}:<ul class="no-top-margin">
        `;
        subRegionsMap.forEach((count, subRegion) => {
            resultsMarkup += `<li>${subRegion}: ${count}</li>`;
        });
        resultsMarkup += `</ul></p>`;
    } else {
        resultsMarkup = `<p>No results</p>`;
    }
    return resultsMarkup;
}
