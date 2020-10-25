const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=9f59051413743389ad3910ae7c2fd578&query='+latitude+','+longitude

    request({ url : url , json : true } , (error , response) => {

        if(error){

            callback("Unable to reach weather stack !",undefined)
        }
        else if (response.body.error){

           callback(response.body.error.info,undefined)
        }
        
        else {
            
            callback(undefined,response.body)
        }

    })

}

module.exports = forecast