const { ethers, upgrades } = require('hardhat');

async function main() {
    const nftMintAddress = "0xd341dc0dae86fa8bcfb347c82b38ade5542be5bb";
    const exchangeRateAddress = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
    //0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
    //0xAB594600376Ec9fD91F8e885dADF0CE036862dE0
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplaceUpgradable");
    console.log("Deploying NFTMarketplace...");
    const nftMarketplace = await upgrades.deployProxy(NFTMarketplace, [exchangeRateAddress], { initializer: 'initialize' });

    await nftMarketplace.deployed();

    console.log('NFTMarketplace deployed to:', nftMarketplace.address.toLowerCase());

    const transaction = await nftMarketplace.storeMintingContracts(nftMintAddress);
    transaction.wait();
    console.log(transaction);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });