const { ethers, upgrades } = require('hardhat');

async function main() {
  const NFTMint = await ethers.getContractFactory("NFTMintUpgradable");
  console.log("Deploying NFTMint...");
  const nftMint = await upgrades.deployProxy(NFTMint, { initializer: 'initialize' });

  await nftMint.deployed();

  console.log('NFTMint deployed to:', nftMint.address.toLowerCase());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });