require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      // 本地测试网络
    },
    hashkey_testnet: {
      url: "https://testnet.hsk.xyz",
      chainId: 133,
      accounts: process.env.PRIVATE_KEY 
        ? [process.env.PRIVATE_KEY]
        : []
    }
  },
  etherscan: {
    apiKey: {
      hashkey_testnet: "no-api-key-needed"
    },
    customChains: [
      {
        network: "hashkey_testnet",
        chainId: 133,
        urls: {
          apiURL: "https://testnet-explorer.hsk.xyz/api",
          browserURL: "https://testnet-explorer.hsk.xyz"
        }
      }
    ]
  }
};
