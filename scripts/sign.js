
const ethers = require('ethers');
const { signTypedData, SignTypedDataVersion, recoverTypedSignature } = require('@metamask/eth-sig-util');

// Your Ethereum private key
const privateKey = process.env.PRIVATE_KEY;

// Connect to Ethereum network
const chainId = 11155111
const verifyingContract = '0xFdfB5CC85C387A0625153f633F0D846F6383DE39'

const voucher = {
    artist: '0x18Ae9FC06BeD0637b1D46063d6b7aF1a4F97b02C',
    artworkId: 1230000000000, // artworkId as uint256
    priceDollar: 100, // priceDollar as uint256
    tokenUri: 'TOKEN_URI',
    vadeeFee: 1, // vadeeFee as uint96
    royaltyFee: 12 // royaltyFee as uint96
  };


const data = {
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Voucher: [
    //   { name: "title", type: "string" },
      { name: "artist", type: "address" },
      { name: "artworkId", type: "uint256" },
    //   { name: "editionNumber", type: "string" },
    //   { name: "edition", type: "string" },
      { name: "priceDollar", type: "uint256" },
      { name: "tokenUri", type: "string" },
      { name: "vadeeFee", type: "uint96" },
      { name: "royaltyFee", type: "uint96" },
    ],
  },
  domain: {
    name: "VADEE",
    version: "1",
    chainId,
    verifyingContract,
  },
  primaryType: "Voucher",
  message: voucher,
};
const signature = signTypedData({
  privateKey: Buffer.from(privateKey.slice(2), "hex"),
  data,
  version: SignTypedDataVersion.V4,
});
console.log(signature);

const recoveredSigner = recoverTypedSignature({
    data,
    signature,
    version: SignTypedDataVersion.V4,

})

console.log(recoveredSigner);
