export function mode(array: any[]) {
    const count: Record<any, number> = {}
    let maxCount = 0
    let modeValue = array[0]
    
    array.forEach(value => {
      if (!count[value]) {
        count[value] = 0
      }
      count[value]++
      
      if (count[value] > maxCount) {
        maxCount = count[value]
        modeValue = value
      }
    })
    
    return modeValue
  }
  
  export function convertTemp(temp: number, unit: 'metric' | 'imperial') {
    return unit === 'metric' ? temp : (temp * 9/5) + 32
  }