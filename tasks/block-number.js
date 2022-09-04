const {task} = require("hardhat/config");

task("block-number", "gives current block number").setAction(
    async (taskArgs, hre) => {
        const blockNum = await hre.ethers.provider.getBlockNumber();
        console.log(`current block number: ${blockNum}`);
    }
)

module.exports = {};