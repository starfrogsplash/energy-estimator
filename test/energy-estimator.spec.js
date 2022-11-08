import { estimateEnergy } from '../src/energy-estimator.js'

describe('energy-estimator.js', () => {

  const consoleSpy = jest.spyOn(console, 'log')

  it('should output correct value for given input', () => {
    const input = [
      { timestamp: 1544206562, type: 'TurnOff', delta: 0 },
      { timestamp: 1544206563, type: 'Delta', delta: +0.5 },
      { timestamp: 1544210163, type: 'TurnOff', delta: 0 }
    ]
    estimateEnergy(input)
    expect(consoleSpy).toHaveBeenCalledWith('Estimated energy used: 2.5 Wh')
  })

  it('should handle non-chronological entries', () => {
    const input = [
      { timestamp: 1544206562, type: 'TurnOff', delta: 0 },
      { timestamp: 1544210163, type: 'TurnOff', delta: 0 },
      { timestamp: 1544206563, type: 'Delta', delta: +0.5 },
     
    ]
    estimateEnergy(input)
    expect(consoleSpy).toHaveBeenCalledWith('Estimated energy used: 2.5 Wh')
  })
  
  it('should output correct value for given input with duplicates', () => {
    const input = [
      { timestamp: 1544206562, type: 'TurnOff', delta: 0 },
      { timestamp: 1544206563, type: 'Delta', delta: +0.5 },
      { timestamp: 1544210163, type: 'Delta', delta: -0.25 },
      { timestamp: 1544211963, type: 'Delta', delta: +0.75 },
      { timestamp: 1544211963, type: 'Delta', delta: +0.75 },
      { timestamp: 1544213763, type: 'TurnOff', delta: 0 }
    ]
    estimateEnergy(input)
    expect(consoleSpy).toHaveBeenCalledWith('Estimated energy used: 5.625 Wh')
  })

})
