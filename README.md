# Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Let's Run
Navigate to folder `app` to run the frontend
```
yarn run dev
```
Open the app from chrome browser (as tested) by typing `http://localhost:8080/` in the url.

Click on `Choose File` then pick one of the already generated proofs in the `proofs` folder.

Click on `Add Solution` to add that proof to the smart contract. Note that the account adding that proof shall be the owner of the token provided it is minted successfully.

The hash of the added solution is shown in the footer of the page
```
Solution Key added is <HASH_OF_CHOSEN_PROOF> Copy it in the minting section to mint this new token
```
Copy `<HASH_OF_CHOSEN_PROOF>` and paste it into the input field before minting the token. Note that the owner of the smart contract is the only account address allowed to mint tokens.

# Test Before Infura Deployment
Contract is required to be tested before deploying into the infura network

First, navigate to `eth-contracts` to create a local blockchain network, 
in the terminal, type
```
truffle develop
```
then test the compiled contracts artifacts by typing
```
truffle test
```
which shows all the tests running successfully without issues
```
truffle(develop)> truffle test
Using network 'develop'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: PropertySellerCoin
    match erc721 spec
      ✓ should return total supply (48ms)
      ✓ should get token balance
      ✓ should return token uri
      ✓ should transfer token from one owner to another (113ms)
    have ownership properties
      ✓ should fail when minting when address is not contract owner (73ms)
      ✓ should return contract owner (146ms)

  Contract: SolnSquareVerifier
    Initialize Soln Square Verifier Contract
      ✓ Contract deployment (188ms)
      ✓ Test if a new solution can be added (2186ms)
      ✓ Ensuring that contract reverts when adding an existing proof (1735ms)
key
 0x16621c518ef438ef6ce0dba157c2e287cc57d21eaeaf141596c65571471cb5d0
      ✓ Test if an ERC721 token can be minted (208ms)
      ✓ Test that solution can not be used again (62ms)
      ✓ Ensuring that contract reverts when key for non-existing solution is used (57ms)

  Contract: Verifier
    Initialize Verifier Contract
      ✓ Test verification with correct proof (875ms)
      ✓ Test verification with incorrect proof (863ms)


  14 passing (12s)
```

# Deploying Contracts
In the terminal, in the `eth-contracts` local directory type
```
truffle migrate --network rinkeby
```
From which contracts are deployed from the infura node registered, then returns the addresses and the abis of the deployed contracts `SolnSquareVerifier` and `Verifier`

### Contract addresses: 

SolnSquareVerifier: `"0x19Fd90328831A37475601F50b1080226A3079916"`

Verifier: `0x84C313734Cb55313620736b4AD3BD062475C4386`

### Contract abis:

```
/eth-contracts/build/contracts/SolnSquareVerifier.json
/eth-contracts/build/contracts/Verifier.json
```

`NB: It is preferred to delete the content of the eth-contracts/build directory before initiating this step`

# OpenSea

Tokens can be found listed in opensea `https://rinkeby.opensea.io/assets/propertycoin-v3`.

Ten tokens have been minted by account0 who is also the owner of the contract.

The following  shows the steps being carried out to sell tokens to account1.

### 1. List token for sale
First, token is listed for sale by `account0`. Click on `sell` then choose price

![Alt docs/1-token-owned-by-account0.png](docs/list-token-for-sell/1-token-owned-by-account0.png?raw=true "account0 list token for sale")
### 2. Token is being Bought
At this step `account1` goes on to buy the token

![Alt docs/3-account1-buying-token.png](docs/list-token-for-sell/3-account1-buying-token.png?raw=true "account1 buys token")

### 3. Five Tokens transferred to account1
Finally, `account1` is shown to own 5 tokens after redoing the previous steps for the other tokens
![Alt docs/other/account1-own-5-tokens.png](docs/other/account1-own-5-tokens.png?raw=true "account1 owns 5 tokens")

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
