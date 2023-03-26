const requestDataFromFL = require("./requestDataFromFL");
const filteredData = async () => {
    const rawData = await requestDataFromFL(); 
    const resultData =[];
    rawData.map(each => {
        const features = each.features;
        features.map(each => {
            const attributes = each.attributes;
            const eachInformation = {
                "SampleDate_t": attributes.SampleDate_t,
                "LOCATION": attributes.LOCATION,
                "LATITUDE": attributes.LATITUDE,
                "LONGITUDE": attributes.LONGITUDE,
                "Abundance": attributes.Abundance,
                "Source": attributes.Source,
                "County": attributes.County,
                "Distance": -1
    
            }
            resultData.push(eachInformation);
        })
    });
    
    
    return resultData;
}

module.exports = filteredData;
