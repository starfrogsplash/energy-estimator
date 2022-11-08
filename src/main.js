import readline from 'readline';
import {estimateEnergy} from './energy-estimator.js';

import {VALID_COMMANDS} from './constants.js';

// const {estimateEnergy} = require('./energy-estimator.js')
// const {VALID_COMMANDS} = require('./constants');

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  const arr = []

  const validateInput = (line) => {
    if (!line) exit('Line is empty.')
    const split = line.split(' ')
    if (split.length < 2) exit('Line does not have enough args')
    const command = split[1]
    const validCommand = VALID_COMMANDS.includes(command)
    if (!validCommand) exit(`Unrecognised command: ${command}`)
  }

  const exit = (reason) => {
    console.error(reason)
    process.exit(9)
  }

  rl.on('line', (line) => {
    validateInput(line)
    const split = line.split(' ')
    arr.push({
      timestamp: parseInt(split[0]),
      type: split[1],
      delta: split.length === 3 ? parseFloat(split[2]) : 0
    })
  });

  rl.once('close', () => estimateEnergy(arr));

}

export { main }