const estimateEnergy = (arr) => {
    const sortedArr = arr.sort(({ timestamp: a }, { timestamp: b }) => a - b)
      const firstItem = sortedArr.shift();
  
      let currentIntensity = 0
      let lastTimestamp = firstItem.timestamp;
      
      const result = sortedArr.reduce((totalWh, curr) => {
        const { timestamp, type, delta } = curr
          
        const duration = ((timestamp - lastTimestamp) / 60) / 60
        const newTotalWh = totalWh + duration * currentIntensity * 5
        
        // Math.max(0, Math.min(1, <value>)) ensures we are between 0 and 1
        currentIntensity = type === "TurnOff" ? 0 : Math.max(0, Math.min(1, currentIntensity + delta))
        lastTimestamp = timestamp
        
        return newTotalWh
      }, 0)
  
      console.log(`Estimated energy used: ${result} Wh`);
  }
  

export { estimateEnergy }