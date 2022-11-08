import { stdin as _stdin } from 'mock-stdin'
import { main } from '../src/main.js'

console.log = jest.fn()

describe('main.ts', () => {
  let stdin

  const execute = (input) => {
    main()
    stdin.send(input)
    stdin.end()
  }

  beforeEach(() => {
    stdin = _stdin()
  })

  it('should push the correct data to the array', () => {
    const pushSpy = jest.spyOn(Array.prototype, 'push')
    const input = '1544206562 TurnOff'
    const expectedResult = { timestamp: 1544206562, type: 'TurnOff', delta: 0 }
    execute(input)
    expect(pushSpy).toHaveBeenCalledWith(expectedResult)
  })

  
  it('should handle incorrect command inputs', () => {
    const errorSpy = jest.spyOn(console, 'error')
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error('process.exit: ' + code)
    })
    
    const input = [
      '1544206562 random',
      '1544206563 Detla +0.5',
      '544210163 TurnOff'
    ]
    const t = () => {
      execute(input)
    }
    expect(t).toThrow()
    expect(exitSpy).toHaveBeenCalledWith(9)
    expect(errorSpy).toHaveBeenCalledWith('Unrecognised command: random')
  })

})
