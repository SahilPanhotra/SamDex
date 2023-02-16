const { expect } = require("chai");
const { ethers } = require("hardhat");
const { values } = require("lodash");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token, accounts, deployer, receiver;
  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("MY TOKEN", "SAM", 1000000);
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
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

  describe("Sending Token", () => {
    let amount, transaction, result;
    beforeEach(async () => {
      amount = tokens(100);
      transaction = await token
        .connect(deployer)
        .transfer(receiver.address, amount);
      result =await transaction.wait();
    });
    it("Transfers token balance", async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900));
      expect(await token.balanceOf(receiver.address)).to.equal(amount);
    });
    it('Emits a transfer event',async()=>{
      const event = result.events[0];
      expect(event.event).to.equal('Transfer');
      const args=event.args;
      expect(args.from).to.equal(deployer.address);
      expect(args.to).to.equal(receiver.address);
      expect(args.value).to.equal(amount);
    })
  });
});
