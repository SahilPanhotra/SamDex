const hre = require("hardhat");

async function main() {
  console.log(`Preparing deployment...\n`);

  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");

  // Fetch accounts
  const accounts = await hre.ethers.getSigners();

  console.log(
    `Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`
  );

  // Deploy contracts
  const sam = await Token.deploy("MY TOKEN", "SAM", "1000000");
  await sam.deployed();
  console.log(`SAM Deployed to: ${sam.address}`);

  const mETH = await Token.deploy("mETH", "mETH", "1000000");
  await mETH.deployed();
  console.log(`mETH Deployed to: ${mETH.address}`);

  const mDAI = await Token.deploy("mDAI", "mDAI", "1000000");
  await mDAI.deployed();
  console.log(`mDAI Deployed to: ${mDAI.address}`);

  const exchange = await Exchange.deploy(accounts[1].address, 10);
  await exchange.deployed();
  console.log(`Exchange Deployed to: ${exchange.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
