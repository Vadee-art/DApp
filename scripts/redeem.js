const { ethers } = require('ethers');

// Your account private key
const privateKey = process.env.PRIVATE_KEY;
const provider = ethers.getDefaultProvider('sepolia'); // Replace 'ropsten' with your desired network

// The contract address
const contractAddress = '0x9773Ad836547D544Dc0dFc5b4Ef4D63ff9857D4D';

// The contract ABI
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "artist",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "artworkId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "editionNumber",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "edition",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "priceDollar",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "uint96",
            "name": "vadeeFee",
            "type": "uint96"
          },
          {
            "internalType": "uint96",
            "name": "royaltyFee",
            "type": "uint96"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct LazyFactory.Voucher",
        "name": "voucher",
        "type": "tuple"
      }
    ],
    "name": "redeem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


// Prepare parameters for the function call
const buyer = '0x18Ae9FC06BeD0637b1D46063d6b7aF1a4F97b02C';
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

// Your Ethereum wallet instance
const wallet = new ethers.Wallet(privateKey, provider);

// The contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function sendTransaction() {
  try {
    const tx = await contract.redeem(buyer, voucher);
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

sendTransaction();