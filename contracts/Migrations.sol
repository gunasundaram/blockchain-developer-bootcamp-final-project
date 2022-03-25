// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.11;

contract Migrations {
  address payable public owner;

  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() {
    owner = payable(msg.sender);
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
