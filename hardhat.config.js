require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: process.env.ALCHEMY_RPC, //process.env.ALCHEMY_URL,
      accounts: [`0x993b8c757c63f876a3e55f0103fdb7704b10af1865f0a79b1345541521473b7a`, `0x${process.env.PRIVATE_KEY}`]
    },
    polygon_mainnet: {
      url: process.env.ALCHEMY_RPC_MAINNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`, `0x${process.env.PRIVATE_KEY_2}`],
      gasPrice: 100000000000
    }
  },
  external: {
    contracts: [
      {
        artifacts: "./artifacts",
        importPath: "@openzeppelin/contracts-upgradeable",
      },
      {
        artifacts: "./artifacts",
        importPath: "@chainlink/contracts/v0.8",
      },
      {
        artifacts: "./artifacts",
        importPath: "@openzeppelin/contracts",
      }
    ],
  },
};
