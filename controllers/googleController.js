module.exports = {
    getEstimatedTime:  async (customerLocation, restaurantLocation) => {
    
   let originLat =  customerLocation[1]
   let originLng =  customerLocation[2]

   let destinationLat =  restaurantLocation[1]
   let destinationLng =  restaurantLocation[2]


    try {
    var service = new google.maps.DistanceMatrixService();
    return  service.getDistanceMatrix(
        {
            origins: [{lat: originLat, lng: originLng}, originlocation],
            destinations: [destinationLocation, {lat: destinationLat, lng: destinationLng }],
            travelMode: 'DRIVING',
            drivingOptions: {
            departureTime: new Date(Date.now() + N),  // for the time N milliseconds from now.
            trafficModel: 'optimistic'
            }
        }
        )

    } catch (err) {
        return res.status(500).send({code: 500, error: errorResolver.resolve(err)});
     } 
   }
}