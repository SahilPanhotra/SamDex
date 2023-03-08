require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const { ALCHEMY_API_KEY_URL } = process.env;

const { MUMBAI_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    mumbai: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
};
