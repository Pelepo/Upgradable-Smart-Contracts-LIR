const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Testing Contract Interactions", function () {
    let nftMint;
    let nftMarketplace;
    let nftMintAddress;
    let nftMarketplaceAddress;
    let owner;
    let secondAccount;
    let tokenId;
    const URI = "kmdeka";
    const supply = 10;
    const royalties = 10;
    const price = 0.00001;
    const amount = 10;
    const firstSalesFees = 10;

    before(async function () {
        this.timeout(180000);
        const signers = await ethers.getSigners();
        owner = signers[0];
        secondAccount = signers[1];

        const NFTMint = await ethers.getContractFactory("NFTMintUpgradable");
        nftMint = await upgrades.deployProxy(NFTMint, [], { initializer: "initialize" });
        await nftMint.waitForDeployment();
        nftMintAddress = await nftMint.getAddress();
        console.log("nftMint deployed to:", nftMintAddress);

        const NFTMarketplace = await ethers.getContractFactory("NFTMarketplaceUpgradable");
        nftMarketplace = await upgrades.deployProxy(NFTMarketplace, ["0xAB594600376Ec9fD91F8e885dADF0CE036862dE0"], { initializer: "initialize" });
        await nftMarketplace.waitForDeployment();
        nftMarketplaceAddress = await nftMarketplace.getAddress();
        console.log("nftMarketplace deployed to:", nftMarketplaceAddress);
    });


    it("Set Minting Contract in NFTMarketplace", async function () {
        this.timeout(60000);
        const transaction = await nftMarketplace.storeMintingContracts(nftMintAddress);
        await transaction.wait();

        console.log(await nftMarketplace.contractsAllowed(0));
        expect(await nftMarketplace.contractsAllowed(0)).to.equal(await nftMintAddress);
    });

    it("Create the first token", async function () {
        this.timeout(60000);
        const transaction = await nftMint.connect(owner).createToken(URI, supply, royalties);
        await transaction.wait();

        expect(await nftMint.getLastTokenId()).to.equal(1);
    });

    it("List first token", async function () {
        this.timeout(60000);
        tokenId = await nftMint.getLastTokenId();
        const valueInWei = ethers.parseEther(price.toString());
        const transaction = await nftMint.connect(owner).firstListing(tokenId, valueInWei, supply, amount, royalties, firstSalesFees, nftMarketplaceAddress);
        await transaction.wait();
    });

    it("Purchase token", async function () {
        this.timeout(60000);
        /* const valueInWei = ethers.parseEther(price.toString());
        console.log(valueInWei); */
        const [roundId,] = await nftMarketplace.getLatestPrice();
        console.log(roundId);
        const valueInWei = ethers.parseEther(price.toString());
        console.log("Value in Wei: ", valueInWei);
        const MaticPrice = await nftMarketplace.getLatestPriceGivenRound(roundId, valueInWei);
        console.log(typeof MaticPrice);
        console.log(MaticPrice);
        console.log("Matic Price: ", MaticPrice.toString());
        /* const value2 = ethers.parseUnits(MaticPrice.toString(), 0);
        console.log(typeof value2);
        console.log(value2); */
        const transaction = await nftMarketplace.connect(secondAccount).createMarketSaleMatic(
            tokenId, nftMintAddress, owner.getAddress(), roundId,
            { value: MaticPrice }
        );
        await transaction.wait();
        console.log(transaction);
    });
})
