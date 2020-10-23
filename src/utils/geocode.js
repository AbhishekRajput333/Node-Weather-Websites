const request = require("request")

const geocode = (address,callback) => {

    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtyYWpwdXQiLCJhIjoiY2tmcHE2bGc3MGRnbzJ3cDY5ZmhibTBpMCJ9.RIBuNR--youKuwFlGt7VTg&limit=1'

    request({url : mapBoxUrl, json :true},(error,response) => {

        if(error){
           callback("Unable to get weather information",undefined)
        }
        else if (response.body.features.length === 0) {

            callback("Please provide the valid location",undefined)
        }
        else {
            callback(undefined,{

                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name

            })
        }

    })

}

module.exports = geocode