let ethers = require('ethers')
let abi = new ethers.utils.AbiCoder()


let types = ['address[][]', 'address[][]', 'address[][]']

let params = [[
  [
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c2',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c2'
  ],
  [
    '0x407d73d8a49eeb85d32cf465507dd71d507100c3',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c4'
  ]
], [
  [
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c2'
  ],
  [
    '0x407d73d8a49eeb85d32cf465507dd71d507100c3',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c4'
  ]
], [
  [
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c2'
  ],
  [
    '0x407d73d8a49eeb85d32cf465507dd71d507100c3',
    '0x407d73d8a49eeb85d32cf465507dd71d507100c4'
  ]
]]

let encoded = abi.encode(types, params)

//
// show the output in a column of 64 bytes per row
//
console.log('encoded:')
console.log('-------')
encoded = encoded.replace('0x', '')
let buf = ''

for (let i = 0; i < encoded.length; i += 1) {
  if (i > 0 && i % 64 === 0) {
    console.log(buf)
    buf = ''
  }

  buf += encoded[i]
}

if (buf.length > 0) {
  console.log(buf)
}


// now decode it
console.log()
console.log('decoded:')
console.log('-------')
console.log(abi.decode(types, '0x' + encoded))
