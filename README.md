# Udacity Blockchain Capstone

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

# OpenSea

Tokens can be found listed in opensea `https://rinkeby.opensea.io/assets/propertycoin`

`NB: Tokens are not listed successfully despite it is shown minted on etherscan !!`

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
