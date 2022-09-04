require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

const API_KEY = process.env.API_KEY;
const RINKEBY_URL = process.env.RPC_URL;
const ACCOUNT = process.env.PRIVATE_KEY;
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork : "hardhat",
    networks : {
      rinkeby : {
        url : RINKEBY_URL,
        accounts : [ACCOUNT],
        chainId : 4
      },
      localhost : {
        url : "http://127.0.0.1:8545/",
        chainId : 31337
      }
    },
  etherscan : {
    apiKey :  API_KEY,
  },
  gasReporter : {
    enabled : true,
    noColors : true,
    currency : "USD",
    coinmarketcap : COINMARKET_API_KEY,
    outputFile : "gas-report.txt"
  }
};
