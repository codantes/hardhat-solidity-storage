//imports 
const {ethers, run, network} = require("hardhat");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

//main function
const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log(`contract address: ${simpleStorage.address}`)
  // console.log(network.config);
  if(network.config.chainId === 4 && process.env.API_KEY){
    console.log('waiting for the blocks...')
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentAge = await simpleStorage.retrieve();
  console.log(`cuurent age: ${currentAge}`);
  const transactionResponse = await simpleStorage.store(14);
  await transactionResponse.wait(1);
  const updatedAge = await simpleStorage.retrieve();
  console.log(`updated age: ${updatedAge}`);
}

const verify = async (contractAddress, args) => {
  console.log("verifying contract");
  try{
    await run("verify:verify", {
      address : contractAddress,
      contructorArguements : args
    })
  }catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
}

//calling main
main().then(() => process.exit(0)).catch((error) => {
  console.log(error);
  process.exit(1);
})