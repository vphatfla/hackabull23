const clearDuplicateData = (data) => {
    const n = data.length;
    for (let i = 0; i < n; i += 1) {
        for (let j = i + 1; j < n; j += 1) {
            if (data[i] !== null && data[j] !== null)
                if (data[i].LOCATION === data[j].LOCATION) {
                    //console.log("Locatiion = ", data[i].LOCATION);
                    // compare date
                    const date1 = new Date(data[i].SampleDate_t).getTime();
                    const date2 = new Date(data[j].SampleDate_t).getTime();
                    /*console.log("___________________");
                    console.log(data[i].SampleDate_t, "  vs  ", data[j].SampleDate_t);
                    console.log("Comparing date1 = ", date1, " and date2 = ", date2);*/
                    if (date1 < date2) {
                        data[i] = null;
                        //console.log("Date1<");
                        continue;
                    }
                    else if (date1 > date2) {
                        data[j] = null;
                        //console.log("Date1>");
                        continue;
                    }
                    else {
                        const Abundance1 = data[i].Abundance;
                        const Abundance2 = data[j].Abundance;

                        if (Abundance2 === "not present/background (0-1,000)" && Abundance1 == Abundance2) {
                            //console.log("OUT2");
                            data[j] = null;
                            continue;
                        }

                        data[i] = null;
                        //console.log("OUT1");
                    }
                }
        }
    }

    const clearedData = [];
    for (let i = 0; i<n; i+=1) {
        if(data[i] !== null) 
        clearedData.push(data[i]);
    }
    return clearedData;
}

module.exports = clearDuplicateData;