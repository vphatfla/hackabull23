const calculateDistance = require("./calculateDistance");

const insertDistanceToData = (lat, long, data) => {
    data.map(each => {
        const objectLat = each.LATITUDE;
        const objectLong = each.LONGITUDE;

        const distance = calculateDistance(lat, long, objectLat, objectLong);

        each.Distance = distance;
    })

    return data;
}

module.exports = insertDistanceToData;