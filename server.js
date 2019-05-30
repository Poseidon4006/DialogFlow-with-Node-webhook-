var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var googleSpreadsheet = require('./googleSpreadsheet');
var dialogflow = require('./dialogflow');

var members = require('./eschool');
const membersCount = members.length;
app.use(express.static('public'));
app.use(bodyParser.json());

// To give out some informations on the current project
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// the DialogFlow fulfillment endpoint
app.post('/webhook/', function(request, response) {
  const dialogflowRequest = request.body;
  // An intent's action serves as a mapping mechanism between your intent and a function living in your app.
   const action = dialogflowRequest.queryResult.action;


   if ( action === "totalStudent.action") 
   {
      let gender = dialogflowRequest.queryResult.parameters.gender;
      if(gender === "both" | "total")
        return response.json({fulfillmentText:`The total strength is ${membersCount}`});

    
    else if(gender ==="male")
     {  
      var count = members.filter(function( v) {
        return v.gender == gender ;
      }).length;
      
      console.log(count);
      return response.json({fulfillmentText:`The total strength of ${gender} is ${count}`});
      }

      else if(gender ==="female"){
        
        var count = members.filter(function(v) {
          return v.gender == gender;
        }).length;

        return response.json({fulfillmentText:`The total number of female students is ${count}`});
      }

      else 
        return response.json({fulfillmentText:`Sorry, I did not get what you meant by ${gender}`});
        
      

   }
      
});
    
    
    
     
        
   

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
