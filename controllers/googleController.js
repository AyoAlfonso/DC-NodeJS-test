module.exports = {
    getEstimatedTime: async (customerLocation, restaurantLocation) => {

        let distance = require('google-distance-matrix');
        let origins = ['XXXXX XX', `${restaurantLocation[1]} ,${restaurantLocation[2]}`];
        let destinations = ['XXXXX XX', `${customerLocation[1]} ,${customerLocation[2]}`];

        distance.key(process.env.GOOGLE_API_KEY);
        distance.units('imperial');
        try {
            return distance.matrix(origins, destinations, function(err, distances) {
                if (err) {
                    return console.log(err);
                }
                if (!distances) {
                    return console.log('no distances');
                }
                if (distances.status == 'OK') {
                    for (var i = 0; i < origins.length; i++) {
                        for (var j = 0; j < destinations.length; j++) {
                            var origin = distances.origin_addresses[i];
                            var destination = distances.destination_addresses[j];
                            if (distances.rows[0].elements[j].status == 'OK') {
                                var distance = distances.rows[i].elements[j].distance.text;
                                console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                            } else {
                                console.log(destination + ' is not reachable by land from ' + origin);
                            }
                        }
                    }
                }
            });
        } catch (err) {
            return res.status(500).json({
                code: 500,
                error: errorResolver.resolve(err)
            });
        }
    }
}