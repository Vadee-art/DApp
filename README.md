# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

## Install Contract Deppendencies

```shell
yarn install
```

## Install Contract + Front Deppendencies

```shell
yarn install:all
```

## Build Contract

```shell
yarn compile
```

## Build Contract + Front

```shell
yarn build:all
```

## Try running some of the following tasks

```shell
npx hardhat accounts
yarn compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

```shell
 npx hardhat verify --network sepolia CONTRACT_ADDRESS USDT_ADDRESS VADEE_VAULT
```
