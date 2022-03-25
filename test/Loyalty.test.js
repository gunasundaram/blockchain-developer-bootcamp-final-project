//let BN = web3.utils.BN;
let Loyalty = artifacts.require("Loyalty");
//let { catchRevert } = require("./exception-helper.js");

const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const { items: ItemStruct, customers: CustomerStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("Loyalty", function(accounts) {
  const [_owner, buyerAddress] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  const itemId = 1;
  const itemName = "Television";
  const price = "1000";
  const points = "10";
  const orderId = 1;
  //const excessAmount = "2000";

  let instance;

  beforeEach(async () => {
    instance = await Loyalty.new(buyerAddress);
  });

  it('has an owner', async function () {
    assert.equal(await instance.owner(), _owner);
  });

  it('should be able to enroll as a customer.', async() => {
    await instance.enroll(buyerAddress);
    const result = await instance.getCustomer(buyerAddress);
    assert.equal(result[1], true, "Customer not enrolled");
  });

  it('should revert if a customer has already enrolled.', async() => {
    await instance.enroll(buyerAddress);
    await catchRevert(instance.enroll(buyerAddress), "customer already enrolled")
  });

  it("should add an item with the provided name, price and points.", async () => {
    await instance.addItem(itemName, price, points);
    const result = await instance.getItem(itemId);
    assert.equal(result[1],"Television", "Item not added");
  });

  it("should allow a customer to buy an item.", async () => {
    await instance.addItem(itemName, price, points);
    await instance.enroll(buyerAddress);
    const result = await instance.buyItem(itemId, {from: buyerAddress});
    //await catchRevert(instance.buyItem(itemId), "Issue with buyItem")
    assert.equal(result[0], undefined, "buyItem not successful");
  });

/*
  it("should transfer", async () => {
    const bal = await instance.getBalance(_owner);
    console.log(bal);
    const bal1 = await instance.getBalance(buyerAddress);
    console.log(bal1);
    const result = await instance.transferFunds({from: buyerAddress});
    const bal2 = await instance.getBalance(buyerAddress);
    console.log(bal2);
  });
*/
  //var supplierBalanceBefore = await web3.eth.getBalance(_owner);
    //var customerBalanceBefore = await web3.eth.getBalance(buyerAddress);
    //var supplierBalanceAfter = await web3.eth.getBalance(_owner);
    //var customerBalanceAfter = await web3.eth.getBalance(buyerAddress);

    /*
    assert.equal(
      new BN(supplierBalanceAfter).toString(),
      new BN(supplierBalanceBefore).add(new BN(price)).toString(),
      "supplier_a balance should be increased by the price of the item",
    );

    assert.isBelow(
      Number(customerBalanceAfter),
      Number(new BN(customerBalanceBefore).sub(new BN(price))),
      "customer_b balance should be reduced by more than the price of the item (including gas costs)",
    );
    */
    


  
});