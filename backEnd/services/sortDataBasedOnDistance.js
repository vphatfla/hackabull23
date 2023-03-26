const sortDataBasedOnDistance = async(inputData) => {
    const data = inputData;
    const length = data.length;

    for (let i =0; i<length-1; i+=1) {
        for (let j =i+1; j<length; j+=1) {
            if (data[i].Distance > data[j].Distance) {
                const temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }

    return data;
}

module.exports = sortDataBasedOnDistance;