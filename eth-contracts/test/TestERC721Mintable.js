var PropertySellerCoin = artifacts.require('PropertySellerCoin');
const tokenBaseURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

contract('PropertySellerCoin', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const baseURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await PropertySellerCoin.new("PropertyCoin", "PST", {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1);
            await this.contract.mint(account_two, 2);
        })

        it('should return total supply', async function () { 
            let supply = await this.contract.totalSupply();
            assert.equal(supply, 2, "total supply is not properly counted");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance, 2, "total balance is not properly counted");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, tokenBaseURI+"1", "token URI not concatenated properly");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_three, 2, {from: account_two}); // transfer token 2 to accounts[2]
            let newOwner = await this.contract.ownerOf(2);
            assert.equal(newOwner, account_three, "Token 2 is not transferred to account three ");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await PropertySellerCoin.new("PropertyCoin", "PST", {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_three, 3, {from: account_two});
                throw ("Error Not Thrown");
            } catch(e) {
                assertResponse = e === "Error Not Thrown" ? false: true;
                assert(assertResponse);
            }
        });

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert(owner, account_one, "Owner is not asserted correctly to be account_one");
            await this.contract.transferOwnership(account_two);
            let newOwner = await this.contract.getOwner();
            assert(newOwner, account_two, "Owner is not switched correctly to be account_two");
        });

    });
})