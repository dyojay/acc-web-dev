Rules  for consuming an API

1. Theyu decide the endpoints
2.THEy decide how data is sent JSOn or Xml
3. They decide how much data- everything or one thing
4. They decied what data looks like

1. We decide the endpoints
2.  We decide how data is sent
3. We decide how muuch data - everything or one thing
4. Thy decide what data looks like



Restrictions 
Routes must be
/api/items
app.read/api/items
app.get/api/items
app.post/api/items
app.delete/api/items
app.read/api/items



/api/items/<unique identifier>

DATA
{
id: Number, 
description: String
is_complete : Boolean( flag for change)
}

MUST BE CRUD Functional 

Read

Route-/ api/items, GET method
Get data from db
using JSON 
We want all data to comebback EVERYTHING  back
We will send it back in an array objects 


Create-/ api/items, POST method 
Get data from client
db sends something back
json -> client
send back one thing( which is what was done witht the db)
-  The object sent back wil be data / receipt from db 

Whenwe send data from the client server we generally send a sa post req through the body



Delete-/ api/items/<unique>, DELETE method
JSON
SEND BAK RECEIPT OF WHAT WAS ACTUALLY DELETED- ONE OBJECT


UPDATE- /apit/items/<unique>, PUT method
- what are we updating
JSON
Send back data one thing- updated is complete
send bacl an object or just the is_complete




Partial UPDATE- /apit/items/<unique>, Patch method




