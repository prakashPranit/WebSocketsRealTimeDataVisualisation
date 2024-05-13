


export const formatSensorReadings = (sensorData=[])=>{
    function convertTempReadings(sensor) {
        // Initialize an empty array to store converted temp readings
        const convertedReadings = [];
    
        // Iterate over each temp reading of the sensor
        sensor.tempReadings.forEach(reading => {
            // Extract necessary information from the temp reading
            const { name, value, time } = reading;
    
            // Push the extracted data into the convertedReadings array
            convertedReadings.push({ name, TEMP: value, time: parseInt(time.split(':')[0]) });
        });
    
        // Sort the convertedReadings array based on time (if necessary)
        convertedReadings.sort((a, b) => a.time - b.time);
    
        // Return the converted readings array
        return convertedReadings;
    }
    
    // Initialize an empty array to store the final converted data for all sensors
    const finalConvertedData = [];
    
    // Iterate over each sensor and convert its temp readings
    sensorData.forEach(sensor => {
        // Convert temp readings for the current sensor
        const convertedData = convertTempReadings(sensor);
    
        // Push the converted data into the finalConvertedData array
        finalConvertedData.push({sensorData:sensor.sensorFor,data:convertedData});
    });
    
    // Log the final converted data
   return finalConvertedData
}

