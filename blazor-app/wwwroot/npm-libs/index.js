// index.js

var Web3 = require('web3');
var PSCArtifact = require("../artifacts/SolnSquareVerifier.json");


const App = {
  web3: null,
  account: null,
  meta: null,
  selectedProofFile: null,
  proofKey: null,

  testVar: null,

  testFun: function() {
    this.testVar = "3He";
  },
  getTestVar: function() {
    return this.testVar;
  },
  onload: async function() {
    if (window.ethereum) {
      // use MetaMask's provider
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // get permission to access accounts
    } else {
      console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
    }
    await this.start();
  },

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PSCArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        PSCArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  addSolution: async function(proof) {
    // var proof = require("./proofs/"+this.selectedProofFile.name);
    // var proof = JSON.parse(proofString);
    console.log(proof);
    const { addSolution } = this.meta.methods;
    await addSolution(
      proof.proof.a, 
      proof.proof.b, 
      proof.proof.c, 
      proof.inputs).send({from: this.account});
      let events = await this.meta.getPastEvents( 'SolutionAdded', { fromBlock: 'latest', toBlock: 'latest' } );
      if(events[0] === null) {
        return "-1";
      } else {
        return (events[0].returnValues[2]);
      }
  },

  setProofKey: function(key) {
    this.proofKey = key
  },

  mint: async function() {
    const { mintVerifiedToken } = this.meta.methods;
    console.log(this.proofKey);
    await mintVerifiedToken(this.proofKey).send({from: this.account});
  }

};

window.App = App;