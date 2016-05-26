var express = require('express'),
    http = require('http'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');


module.exports.serverSettings = {};



var hostname = this.serverSettings.hostname || process.env.IP || process.env.OPENSHIFT_NODEJS_IP  || 'localhost';
var port = this.serverSettings.port || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT ||  3000;



var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + "/../dist"));
app.use(bodyParser.json());
/*app.all('*', function(req, res){
  console.log(req.body);
})*/


app.get('/', function(req, res){
  res.sendFile(__dirname + '/../dist/index.html');
});


app.get('/dishes', function(req, res){
    res.end(getRespondData('dishes'));
});

app.get('/dishes/:id', function(req, res){
    res.end(getRespondData('dishes', req.params.id));
});

app.get('/promotions/:id', function(req, res){
    res.end(getRespondData('promotions', req.params.id));
});

app.get('/leadership', function(req, res){
    res.end(getRespondData('leadership'));
});

app.get('/leadership/:id', function(req, res){
    res.end(getRespondData('leadership', req.params.id));
});

app.put('/dishes/:id', function(req, res){
    console.log(req.body.comments);
    updateComments(req.body);
    res.end('sucess');
});

app.put('/feedback', function(req, res){
    updateFeedback(req.body);
    res.end('sucess');
});

app.get('/aboutus', function(req, res){
    
    res.end(getRespondData('leadership'));
});


function getRespondData(param, id){
  
  if(arguments.length > 1){
    return JSON.stringify(db[param][id]);
  }else{
    return JSON.stringify(db[param])
  }
};


function updateComments(data){
  var id = data.id;
  db.dishes[id].comments = data.comments;
}

function updateFeedback(data){
  console.log(data);
  db.feedback.push(data);
  console.log(db.feedback);
}


var db = {
  "dishes": [
    {
      "id": 0,
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon",
          "date": "2012-10-16T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites",
          "date": "2014-09-05T17:57:28.556094Z"
        },
        {
          "rating": 3,
          "comment": "Eat it, just eat it!",
          "author": "Michael Jaikishan",
          "date": "2015-02-13T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Ultimate, Reaching for the stars!",
          "author": "Ringo Starry",
          "date": "2013-12-02T17:57:28.556094Z"
        },
        {
          "rating": 2,
          "comment": "It's your birthday, we're gonna party!",
          "author": "25 Cent",
          "date": "2011-12-02T17:57:28.556094Z"
        }
      ]
    },
    {
      "id": 1,
      "name": "Zucchipakoda",
      "image": "images/zucchipakoda.png",
      "category": "appetizer",
      "label": "",
      "price": "1.99",
      "description": "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon",
          "date": "2012-10-16T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites",
          "date": "2014-09-05T17:57:28.556094Z"
        },
        {
          "rating": 3,
          "comment": "Eat it, just eat it!",
          "author": "Michael Jaikishan",
          "date": "2015-02-13T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Ultimate, Reaching for the stars!",
          "author": "Ringo Starry",
          "date": "2013-12-02T17:57:28.556094Z"
        },
        {
          "rating": 2,
          "comment": "It's your birthday, we're gonna party!",
          "author": "25 Cent",
          "date": "2011-12-02T17:57:28.556094Z"
        }
      ]
    },
    {
      "id": 2,
      "name": "Vadonut",
      "image": "images/vadonut.png",
      "category": "appetizer",
      "label": "New",
      "price": "1.99",
      "description": "A quintessential ConFusion experience, is it a vada or is it a donut?",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon",
          "date": "2012-10-16T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites",
          "date": "2014-09-05T17:57:28.556094Z"
        },
        {
          "rating": 3,
          "comment": "Eat it, just eat it!",
          "author": "Michael Jaikishan",
          "date": "2015-02-13T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Ultimate, Reaching for the stars!",
          "author": "Ringo Starry",
          "date": "2013-12-02T17:57:28.556094Z"
        },
        {
          "rating": 2,
          "comment": "It's your birthday, we're gonna party!",
          "author": "25 Cent",
          "date": "2011-12-02T17:57:28.556094Z"
        }
      ]
    },
    {
      "id": 3,
      "name": "ElaiCheese Cake",
      "image": "images/elaicheesecake.png",
      "category": "dessert",
      "label": "",
      "price": "2.99",
      "description": "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon",
          "date": "2012-10-16T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites",
          "date": "2014-09-05T17:57:28.556094Z"
        },
        {
          "rating": 3,
          "comment": "Eat it, just eat it!",
          "author": "Michael Jaikishan",
          "date": "2015-02-13T17:57:28.556094Z"
        },
        {
          "rating": 4,
          "comment": "Ultimate, Reaching for the stars!",
          "author": "Ringo Starry",
          "date": "2013-12-02T17:57:28.556094Z"
        },
        {
          "rating": 2,
          "comment": "It's your birthday, we're gonna party!",
          "author": "25 Cent",
          "date": "2011-12-02T17:57:28.556094Z"
        }
      ]
    }
  ],
  "promotions": [
    {
      "id": 0,
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    }
  ],
  "leadership": [
    {
      "id": 0,
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
    },
    {
      "id": 1,
      "name": "Dhanasekaran Witherspoon",
      "image": "images/alberto.png",
      "designation": "Chief Food Officer",
      "abbr": "CFO",
      "description": "Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!"
    },
    {
      "id": 2,
      "name": "Agumbe Tang",
      "image": "images/alberto.png",
      "designation": "Chief Taste Officer",
      "abbr": "CTO",
      "description": "Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does not meet his exacting standards. He lives by his motto, You click only if you survive my lick."
    },
    {
      "id": 3,
      "name": "Alberto Somayya",
      "image": "images/alberto.png",
      "designation": "Executive Chef",
      "abbr": "EC",
      "description": "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
    }
  ],
  "feedback": [

  ]
};

(function startServer (){
    app.listen(port, hostname, function(){
        console.log('server running at http://'+hostname+":"+port+"/"); 
    });
})();

