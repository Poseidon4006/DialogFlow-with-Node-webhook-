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
      if(gender === "both")
        return response.json({fulfillmentText:`The total strength is ${membersCount}`});

    
    else 
     {  
      var count = members.filter(function( v) {
        return v.gender == gender ;
      }).length;
      
      console.log(count);
      return response.json({fulfillmentText:`The total strength of ${gender} is ${count}`});
      }

    


        
      

   }
      
});
    
    
    
     
        
   

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
