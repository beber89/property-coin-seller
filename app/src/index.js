import Web3 from "web3";
import PSCArtifact from "../../eth-contracts/build/contracts/SolnSquareVerifier.json";

const App = {
  web3: null,
  account: null,
  meta: null,
  selectedProofFile: null,
  proofKey: null,

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

  addSolution: async function() {
    var proof = require("./proofs/"+this.selectedProofFile.name);
    const { addSolution } = this.meta.methods;
    await addSolution(
      proof.proof.a, 
      proof.proof.b, 
      proof.proof.c, 
      proof.inputs).send({from: this.account});
      let events = await this.meta.getPastEvents( 'SolutionAdded', { fromBlock: 'latest', toBlock: 'latest' } );
      if(events[0] === null) {
        App.setStatus("Event is not caught,\n Please find the key in etherscan emitted by SolutionAdded Event\nPaste it in input field before minting.")
      } else {
        let solutionKey = events[0].returnValues[2];
        App.setStatus("Solution Key added is\n" + solutionKey + "\nCopy it in the minting section to mint this new token");
      }
  },

  mint: async function() {
    const { mintVerifiedToken } = this.meta.methods;
    await mintVerifiedToken(this.proofKey).send({from: this.account});
    App.setStatus("New Token has been minted successfully");
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});

document.getElementById('proof-file').addEventListener('change', (event) => {
  App.selectedProofFile = event.target.files[0];
});
document.getElementById('proof-key-input').addEventListener('change', (event) => {
  var userInput = (event.target).value;
  App.proofKey = userInput.slice(0,2) != "0x"?("0x"+userInput):userInput;
});