var bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');

//Schema Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//     name: 'Test',
//     image: 'https://pixabay.com/get/eb31b70e2bf3073ed1584d05fb1d4e97e07ee3d21cac104496f0c678a6ecbdbc_340.jpg',
//     description: 'this is a huge tent farm! Stop Abusing Tents'
// },function(err, campground) {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log('CAMPGROUND ADDED')
//     }
// });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render('landing')
});

//INDEX - GET Displays all campgrounds
app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    })
});

//CREATE - POST Add new campground to db
app.post('/campgrounds', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newCreatedCampground) {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/campgrounds');
        }
    })

});

//NEW - GET Displays for to make new campground.
app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

//SHOW - GET Shows info about campground
app.get('/campgrounds/:id', function (req, res) {
    //Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err)
        } else {
            //Render Show page for that campground
            res.render('show' , {campground: foundCampground});
        }
    });
    

})
app.listen(3000, function () {
    console.log('YelpCamp Server has started on port 3000')
});