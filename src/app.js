const path = require('path')
const express = require('express')
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(viewsPath)
const app = express()

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

debugger

app.get('' , (req,res) => {

    res.render('index' , {

        title : 'Weather',
        name : 'Abhishek'
    })
}) 

app.get('/about' , (req,res) => {

    res.render('about' , {

        title : 'About me',
        name : 'Abhishek Rajput'

    })

})

app.get('/help' , (req,res) => {

    res.render('help', {

       message : 'This is some helpful text !' ,
       title: 'Help',
        name : 'Abhiraj'
    })

})

app.get('/weather', (request , response) => {

    if(!request.query.address){

        return response.send({

            error : "You must provide a address"
        })

    }
    const address = request.query.address
    geocode(address,(error,{latitude,longitude,location}={}) => {

        if(error){
         console.log('Error :',error)
        
        return response.send({

            error : error

        })

        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
            console.log('Error', error)

            return response.send({

                error : error
    
            })
            }
            response.send({

                location,
                forecasteData : forecastData.current.weather_descriptions.join(),
                address: address
           
          })
    
    })
    

})
})
app.get('/products' , (req,res) => {

    console.log(req.query.search)

    if(!req.query.search){

     return res.send({

            error : "You must provide a search term"
        })

    }

    res.send({

        "products" : []

    })

})


app.get('/help/*' , (req,res) => {

    res.render('error',{
        title : '404',
        name : 'abhi',
        message : 'Help article not found'
    })
})

app.get("*", (req , res) => {

    res.render('error', {
        title : '404',
        name : 'Abhi1',
        message : 'Page not found'

    })

})


app.listen('3001' , () => {

    console.log('Server is up and running on 3001 port')
}) 
