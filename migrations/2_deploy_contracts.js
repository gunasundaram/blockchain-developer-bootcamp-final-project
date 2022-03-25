"use strict";

var Loyalty = artifacts.require("./Loyalty.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Loyalty, accounts[1]);
};
