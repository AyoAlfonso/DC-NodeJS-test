
Database design for this app.

![](https://www.notion.so/file/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1602f440-7996-4991-a3cb-1b6216fdfc1e%2FER.JPG)

# Food Ordering App

Requirements & Features

-   Endpoints to delete, list (with the possibility of filter by rating), edit restaurant information.
    
    1.  Add: Create restaurants; wasn't metioned but of course there should be a route to add restaurants. Requirements: name, logo, commercialName, legalName, rating across 5 ✨ , commercialEmail, adminNumber, address, Location (latLng){take cues from former Naija-Places Node project}.
    2.  Delete:
    3.  List: To get all restaurants and their Average Review Score. A weighted mean approach was used to estimate the rating of each restaurant from the reviews associated with each restaurant. You can Filter your listing by providing a minimum rating you expect the restaurants to have between 1-10.
    4.  Edit/Update Restaurants info
    5.  Admin User session Protected by a JSONWebToken mechanism.
-   Endpoint to rate each restaurant
    
-   Endpoint to:
    
-   create a order,
    
-   should have one or more meals​,
    
-   total​ ​cost,​
    
-   address​ and
    
-   a lat/Lng​ position of the place,
    
    This endpoint saves the order on a different table/document and return ETA (estimated time of arrival) based on user location and restaurant location (transport media being a motorcycle), this time should have in count traffic at the moment.
    
-   Also when a order is triggered a message needs to be created and queued in ActiveMQ server (or any messaging server you prefer) 1 message for the notification and another for the order. Now RedisMQ will be used to receive messages from our node program, in terms of failure, and successful orders.
    
    1.  For a system that processes a large amount of orders at peek times e.g lunch time, imagine a case where our backend servers can only handle requests from Flutterwave, Cchub and [hotels.ng](http://hotels.ng), Paystack's order will have to wait and than they will be thinking maybe we only like processing for Flutterwave 😅. The function called _____ , will make a separate Redis queue for this and then we can process the redis messages in here with a second server (or multiple consumer servers competing to process the queue) that basically does the work of listening to process.
    2.  The next is to have the messages sent to another system(consumer) maybe a notification on the users phone and an order message to the admin's dashboard.
    
    **_PROCESS MESSAGE_**
    
    ```
    //PROCESS THE MESSAGE & NOTIFICATION
    rsmq.receiveMessage({qname:"myqueue"}, function (err, resp) {
    	if (resp.id) {
    		console.log("Message received.", resp)	
    		function(){
    						//SEND NOTIFICATION TO USER
    }
    function(){
    //SEND ORDER TO USER
    }
    	}
    	else {
    		console.log("No messages for me...")
    	}
    });
    
    ```
    
    **_DELETE MESSAGE_**
    
    ```
    rsmq.deleteMessage({qname:"myqueue", id:"dhoiwpiirm15ce77305a5c3a3b0f230c6e20f09b55"}, function (err, resp) {
    	if (resp===1) {
    		console.logJA("Message deleted.")	
    	}
    	else {
    		console.log("Message not found.")
    	}
    });
    
    ```
    

# Usage

----------

Start this app with the code below.

```
npm install 

npm start || node start.js

```

After you've done that you should be able to use the `standard` program. Please check the .env file in the root folder for setting your environment variables; this file contains sensitive details we use in running this app.

[Routes](https://www.notion.so/59c1721074b1478c812ce6c2e7421cc2)


| Endpoint                        	| Route Type 	| Resources                     	| Result                                                                                                                                                                                                                                                                                                                                              	| Description                                                                                                                   	|
|---------------------------------	|------------:	|-------------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------	|
${URL}/api               	| API       	| 	| Welcome to the Student-Management API!",| This route is the first of the API route. It contains the security functions to check if the request has the required token and key strings.
| ${URL}/api/add-restaurant  	| API       	|               	|                                                                                                                                                                                                                                                                                   	| Adds a new restaurant                               	|
| ${URL}/api/list	| API 	|  	|                                                                                                                                                                                                      | Lists all restaurants, ranks them and lists them on the fly and    	|
|${URL}/api/restaurants/delete 	| API	|        	|                                                                                                                                                                                                                                                                                                                     	|  Remove a restaurant from the list                                                                                                                          	|
|${URL}/api/restaurants/:restaurantId/edit  	| API      	|                     	|                                                                                                                                                                                                                                                                                                                        	|Update a restaurant                                                                                                                               	|
| ${URL}/api/restaurants/:restaurantId/rate 	| API 	|                   	| 	| Rate a hotel                      	|
| ${URL}/api/new-order         	| API       	|                	|                                                                                                                           	| Make new orders                                            	


# Security

----------

**Regarding security**

Put this in your headers to be able to acesss the protected api routes.

Token: 2udbxkatifno1cs76p2ttcwm30zso

Key: 14re9owf9q2si0saaon2ebyr7519al