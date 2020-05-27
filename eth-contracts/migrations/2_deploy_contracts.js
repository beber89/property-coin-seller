// // migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
// module.exports = function(deployer) {
//   deployer.deploy(SquareVerifier);
//   deployer.deploy(SolnSquareVerifier);
// };


// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
module.exports = function(deployer) {
  deployer.deploy(SquareVerifier).then((instance) => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address, "PropertyCoin", "PSC");
  });
};


// var Temp = artifacts.require("./ERC721MintableComplete.sol");

// module.exports = function(deployer) {
//   deployer.deploy(Temp);
// };
