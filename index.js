const express = require('express')
const mustacheExpress = require('mustache-express')
const index = express()
const bodyParser = require('body-parser')
let trips = [
    {place:'Barcelona',image:'https://i.ytimg.com/vi/IbmrqYjyBnU/maxresdefault.jpg', departure: 'June 21, 2019', returnDate: 'June 30, 2019'},
    {place:'Netherlands', image:'https://i-h2.pinimg.com/564x/3c/58/bb/3c58bbdaad2768c97515a84d61f68a0a.jpg', departure: 'October 18, 2020', returnDate: 
    'October 25, 2020'},
    {place:"Hawaii", image:'https://www.gohawaii.com/sites/default/files/styles/wide_carousel_large/public/content-carousel-images/10231_mauichantv2.jpg?itok=3f5DUaAT', departure:'July 1, 2022', returnDate: 'July 9, 2022'}
]


index.use(bodyParser.urlencoded({ extended: false }))
index.use('/css/version-1/',express.static('css'));

//tell express to use mustache templating engine 
index.engine('mustache', mustacheExpress())
index.set('views','./views')
index.set('view engine', 'mustache')

index.get('/trips',(req, res)=> {
    res.render('mustachePages',{tripsList: trips})
})

//to add a new destination
index.post('/add-trip',(req,res) =>{
    let place = req.body.destination
    let image = req.body.image
    let departure = req.body.departure 
    let returnDate = req.body.return

    let trip = {place:place, image:image, departure:departure, returnDate:returnDate}
    trips.push(trip)

    res.redirect('/trips')
})

//Note to self: We didn't actually delete the trip we just displayed a new array that doesn't have that trip! For the filter function returns a new array. 
index.post('/remove-trip',(req,res) =>{
    
    let trip = req.body.removeContainer
    
    trips = trips.filter(function(r){
    return r.place != trip
   })

    res.redirect('/trips')
})


index.listen(3000,() => {
    console.log("Server is running....")
})