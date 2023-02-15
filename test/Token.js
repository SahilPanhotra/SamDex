const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token,accounts,deployer;
  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("MY TOKEN", "SAM", 1000000);
    accounts = await ethers.getSigners();
    deployer= accounts[0];
  });

  describe("Deployment", () => {
    const name = "MY TOKEN";
    const symbol = "SAM";
    const decimals = 18;
    const totalSupply = tokens(1000000);

    it("has Correct name", async () => {
      expect(await token.name()).to.equal(name);
    });

    it("has Correct Symbol", async () => {
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has Correct decimals", async () => {
      expect(await token.decimals()).to.equal(decimals);
    });

    it("has correct  total Supply", async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });
    it("has assiged total supply to deployer", async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });
});
