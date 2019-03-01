const fs = require('fs')

const { promisify } = require('util')

const read = promisify(fs.readFile);

read('./21_promisify.js').then(data => {
  console.log(data.toString())
}).catch(ex => {
  console.log(ex)
})

async function test () {
  try {
    const content = await read('./21_promisify.js')
    console.log(content.toString())
  } catch (ex) {
    console.log(ex)
  }
}

test()