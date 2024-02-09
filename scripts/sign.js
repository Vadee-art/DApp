
const ethers = require('ethers');
const { signTypedData, SignTypedDataVersion } = require('@metamask/eth-sig-util');

// Your Ethereum private key
const privateKey = process.env.PRIVATE_KEY;

// Connect to Ethereum network
const chainId = 11155111

const voucher = {
    title: 'TITLE',
    artist: '0x18Ae9FC06BeD0637b1D46063d6b7aF1a4F97b02C',
    artworkId: 1230000000000, // artworkId as uint256
    editionNumber: '1',
    edition: '1',
    priceDollar: 100, // priceDollar as uint256
    tokenUri: 'TOKEN_URI',
    vadeeFee: 1, // vadeeFee as uint96
    royaltyFee: 12, // royaltyFee as uint96
    signature: '0xafad46f138332d9c41268d806f3b1e8b2bc81a2ff162ecd63eb60b6bfbbe42a212e9d2501035eaf32f27b6cb31ed5d420fabdd02a7d3bf8f91742ab5417cacc11c'
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
      { name: "title", type: "string" },
      { name: "artist", type: "address" },
      { name: "artworkId", type: "uint256" },
      { name: "editionNumber", type: "string" },
      { name: "edition", type: "string" },
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
    verifyingContract: '0xDf72e278425C179b075F9114d436db57Cf126DA4'
  },
  primaryType: "Voucher",
  voucher,
};

const signature = signTypedData({
  privateKey: privateKey,
  data,
  version: SignTypedDataVersion.V4,
});
console.log(signature);
