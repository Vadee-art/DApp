// deploy.js

async function main() {
  // Hardhat Ethereum setup
  const { ethers } = require("hardhat");

  // Get the contract factory
  const MyContract = await ethers.getContractFactory("LazyFactory");

  // Deploy the contract

  const usdt = '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06'
  const myContract = await MyContract.deploy(usdt);

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