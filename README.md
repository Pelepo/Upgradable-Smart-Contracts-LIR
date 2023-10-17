# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell

//To compile the contract
npx hardhat compile


//For the first deployment of the contracts
npx hardhat run scripts/firstDeploy.js --network polygon_mumbai
npx hardhat run scripts/firstDeploy.js --network polygon_mainnet

npx hardhat run scripts/deployNFTMint.js --network polygon_mumbai
npx hardhat run scripts/deployNFTMint.js --network polygon_mainnet

npx hardhat run scripts/deployNFTMarketplace.js --network polygon_mumbai
npx hardhat run scripts/deployNFTMarketplace.js --network polygon_mainnet

//To verify the contract and the Implementation-Proxy link 
npx hardhat verify --contract "contracts/NFTMint.sol:NFTMintUpgradable" contract.address --network polygon_mumbai
npx hardhat verify --contract "contracts/NFTMint.sol:NFTMintUpgradable" contract.address --network polygon_mainnet


npx hardhat verify --contract "contracts/NFTMarketplace.sol:NFTMarketplaceUpgradable" contract.address --network polygon_mumbai
npx hardhat verify --contract "contracts/NFTMarketplace.sol:NFTMarketplaceUpgradable" contract.address --network polygon_mainnet

//To update the contract that can interact with NFTMarketplace
npx hardhat run scripts/addNewContract.js --network polygon_mumbai "contractAddress"
npx hardhat run scripts/addNewContract.js --network polygon_mainnet "contractAddress"