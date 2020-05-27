// pragma solidity >=0.4.21 <0.6.0;
pragma solidity ^0.5.0;
import '../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {
  function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public returns (bool r);
}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is PropertySellerCoin {
using SafeMath for uint256;

Verifier verifierContract;

constructor(address verifierAddress, string memory name, string memory symbol)
PropertySellerCoin(name, symbol)
public  {
        verifierContract = Verifier(verifierAddress);
    }

// TODO define a solutions struct that can hold an index & an address
struct Solution {
  uint256 index;
  address prover;
  bool minted;
}

// TODO define an array of the above struct\
Solution[]  private _solutionList;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solution) public  solutions;


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 solutionIndex, address solutionProver, bytes32 key);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(
  uint[2] memory a,
  uint[2][2]  memory b,
  uint[2]  memory c,
  uint[2]  memory input
  ) public {
    require(verifierContract.verifyTx(a, b, c, input), "zkSNARKS: Proof Not Valid !!!");
  bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
  // verify key does not exist in solutions
  require(solutions[key].index == 0 && solutions[key].prover == address(0), "Proof already exists");
  uint256 tokenId = super.totalSupply().add(1);
  _solutionList.push(Solution(tokenId, msg.sender, false));
  solutions[key] = Solution(tokenId, msg.sender, false);

  emit SolutionAdded(tokenId, msg.sender, key);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mintVerifiedToken(bytes32 key) public payable {
  require(solutions[key].index != 0 && solutions[key].prover != address(0), "Solution does not exist");
    require(!solutions[key].minted, "Token has been priorly minted by this proof");
    super.mint(solutions[key].prover, solutions[key].index);
    solutions[key] = Solution(solutions[key].index, solutions[key].prover, true);
    _solutionList[solutions[key].index-1].minted = true;
}

}