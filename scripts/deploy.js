// deploy.js

async function main() {
  // Hardhat Ethereum setup
  const { ethers } = require("hardhat");

  // Get the contract factory
  const MyContract = await ethers.getContractFactory("LazyFactory");

  // Deploy the contract

  const usdt = '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0'
  const vadeeAddress = '0x18Ae9FC06BeD0637b1D46063d6b7aF1a4F97b02C'
  const myContract = await MyContract.deploy(usdt, vadeeAddress);

  // Wait for the contract to be mined
  const tx = await myContract.deployed();
  console.log("MyContract deployed to:", myContract.address);
}

// Execute the deploy script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  0x66480630ef5bd8525987f4a34566b0c4477c6098