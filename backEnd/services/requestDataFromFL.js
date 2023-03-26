var express = require('express');
var router = express.Router();
const axios = require('axios')

const requestDataFromFL = async (req, res, next) => {
    try {
        const allRawData =[];
        const {data:dataZero} = await axios.get("https://atoll.floridamarine.org/arcgis/rest/services/Projects_FWC/HAB_Current/MapServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-10043214.020446243%2C%22ymin%22%3A3106400.8295117375%2C%22xmax%22%3A-9368122.186631741%2C%22ymax%22%3A3781492.6633262374%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&outSR=102100&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A1222.992452562501%2C%22extent%22%3A%7B%22xmin%22%3A-10018754.171394993%2C%22ymin%22%3A3130860.6785629876%2C%22xmax%22%3A-9392582.035682991%2C%22ymax%22%3A3757032.814274988%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D");
        allRawData.push(dataZero);

        const {data:dataOne} = await axios.get("https://atoll.floridamarine.org/arcgis/rest/services/Projects_FWC/HAB_Current/MapServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-9417041.884734241%2C%22ymin%22%3A3106400.8295117375%2C%22xmax%22%3A-8741950.050919741%2C%22ymax%22%3A3781492.6633262374%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&outSR=102100&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A1222.992452562501%2C%22extent%22%3A%7B%22xmin%22%3A-9392582.035682991%2C%22ymin%22%3A3130860.6785629876%2C%22xmax%22%3A-8766409.89997099%2C%22ymax%22%3A3757032.814274988%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D");
        allRawData.push(dataOne);

        const {data:dataTwo} = await axios.get("https://atoll.floridamarine.org/arcgis/rest/services/Projects_FWC/HAB_Current/MapServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-9417041.884734241%2C%22ymin%22%3A2480228.693799736%2C%22xmax%22%3A-8741950.050919741%2C%22ymax%22%3A3155320.5276142377%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&outSR=102100&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A1222.992452562501%2C%22extent%22%3A%7B%22xmin%22%3A-9392582.035682991%2C%22ymin%22%3A2504688.542850986%2C%22xmax%22%3A-8766409.89997099%2C%22ymax%22%3A3130860.6785629867%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D");
        allRawData.push(dataTwo);

        return(allRawData);        
        //return (data);
    } catch (err) {
        console.log("ERROR 500", err);

    }


}

module.exports = requestDataFromFL;
