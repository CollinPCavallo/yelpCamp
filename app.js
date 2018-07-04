var express = require('express');
var bodyParser = require('body-parser')
var app = express();

    var campgrounds = [{
            name: 'Salmon Creek',
            image: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5403963.jpg'
        },
        {
            name: 'Buffalo Valley',
            image: 'http://www.kalyumet.com/_upload/images/amenities/spacious-shaded-sites.jpg'
        },
        {
            name: 'Buffalo Valley',
            image: 'http://www.kalyumet.com/_upload/images/amenities/spacious-shaded-sites.jpg'
        },
        {
            name: 'Buffalo Valley',
            image: 'http://www.kalyumet.com/_upload/images/amenities/spacious-shaded-sites.jpg'
        },
        {
            name: 'Buffalo Valley',
            image: 'http://www.kalyumet.com/_upload/images/amenities/spacious-shaded-sites.jpg'
        },
        {
            name: 'Buffalo Valley',
            image: 'http://www.kalyumet.com/_upload/images/amenities/spacious-shaded-sites.jpg'
        },
        {
            name: 'Galena Park',
            image: 'https://www.arrivares.com/Image_Rep/Room_images/18412.jpg'
        }
    ];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.render('landing')
});

app.get('/campgrounds', function (req, res) {

    
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect('/campgrounds');

});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.listen(3000, function () {
    console.log('YelpCamp Server has started on port 3000')
});