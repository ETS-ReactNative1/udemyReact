const ipAddress = '8.8.8.8';


const getLocation = () =>{
     return fetch('https://ipinfo.io/json?token=3d7a0f8d627c81')
    .then(res => {
        if(res.status === 200){
            return res.json()
        }
        else{
            throw new Error('I cannot BELIEVE you\'ve done this')
        }
    })
}

const getCountry = (countryCode) => {
    return fetch(`https://restcountries.eu/rest/v2/all`)
    .then(res => {
        if(res.status === 200)
        {
            return res.json()
        }
        else {
            throw new Error('F to pay respects')
        }
    })
    .then(countryList => {
        const countryData= countryList.find(x => x.alpha2Code === countryCode)
        return countryData
    })
}

const getCountryByGeoData = (geoData) => {
    return getCountry(geoData.country)
    .then(res => {
        return [geoData, res]
    })
}


getLocation()
.then(data => {
    console.log(`you are in ${data.city} ${data.region}`) 
    return getCountryByGeoData(data)
})
.then(data2 => {
    console.log(`you are in ${data2[0].city} ${data2[0].region} ${data2[1].name}`) 
})
.catch(error => {
    console.log(error)
})
