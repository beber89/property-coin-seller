
const SolnSquareVerifierContract = artifacts.require('SolnSquareVerifier');
const VerifierContract = artifacts.require('Verifier');

const proof = require('./proof.json');
var solutionKey = "";

contract('SolnSquareVerifier', accounts => {
  describe('Initialize Soln Square Verifier Contract', function () {
    it("Contract deployment", async function() {
      this.verifierContract = await VerifierContract.new({from: accounts[0]});
      this.contract = await SolnSquareVerifierContract.new(
        this.verifierContract.address, 
        "Tokeny",
        "TKY",
        {from: accounts[0]});
  });
    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added', async function () { 
      await this.contract.addSolution(
        proof.proof.a,
        proof.proof.b,
        proof.proof.c,
        proof.inputs,
        {from: accounts[0], gas: 1000000}  // block limit 100000 causes revert !!
      );

      
      let events = await this.contract.getPastEvents( 'SolutionAdded', { fromBlock: 'latest', toBlock: 'latest' } );
      let key = events[0].returnValues.key;
      let soln = await this.contract.solutions(key);
      assert.equal(soln.prover, accounts[0], "Solution not pushed properly");
      assert.equal(soln.index, 1, "Solution not pushed properly");
      assert.equal(soln.minted, false, "Solution not pushed properly");
      solutionKey = key;
    });

    it('Ensuring that contract reverts when adding an existing proof', async function () { 
      try {
        await this.contract.addSolution(
          proof.proof.a,
          proof.proof.b,
          proof.proof.c,
          proof.inputs,
          {from: accounts[0], gas: 1000000}
        );
        throw ("Error should have been thrown");
      } catch(e) {
        let toAssert = e === "Error should have been thrown"?false:true;
        assert(toAssert, "Proof should have been rejected (not added to solutions) !!");
      }
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Test if an ERC721 token can be minted', async function () { 
      console.log("key\n", solutionKey);
      await this.contract.mintVerifiedToken(
        solutionKey,
        {from: accounts[0], gas: 1000000}
      );
      let mintedSoln = await this.contract.solutions(solutionKey);
      assert.equal(mintedSoln.minted, true, "Solution not minted properly");
    });

    it('Test that solution can not be used again', async function () { 
      try {
        await this.contract.mintVerifiedToken(
          solutionKey,
          {from: accounts[0], gas: 1000000}
        );
        throw ("Error should have been thrown");
      } catch(e) {
        let toAssert = e === "Error should have been thrown"?false:true;
        assert(toAssert, "Solution was not declined minting in the second time !!");
      }
    });

    it('Ensuring that contract reverts when key for non-existing solution is used', async function () { 
      try {
        await this.contract.mintVerifiedToken(
          // arbitrary non-existing key
          "0x7770555fd31263b2b509f06cd19522bd6dbdedd7325abf17dd1187cb18d29555",
          {from: accounts[0], gas: 1000000}
        );
        throw ("Error should have been thrown");
      } catch(e) {
        let toAssert = e === "Error should have been thrown"?false:true;
        assert(toAssert, "Token should have not been minted because key does not exist in solutions !!");
      }
    });
  });
});
