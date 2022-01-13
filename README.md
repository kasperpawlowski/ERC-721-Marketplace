# ERC-721-Marketplace

The software is a basic implementation of NFT (ERC-721 based) marketplace for the most popular cryptocurrencies logos. The project consists of front-end, back-end (that implements IPFS-like functionalities) and appropriate smart contract.

How to use:
1. Clone the repository from github and change the directory
```
git clone https://github.com/kasperpawlowski/ERC-721-Marketplace.git
cd ERC-721-Marketplace
```
2. Execute the following commands to start the backend that will store appropriate NFT metadata 
```
cd backend
npm install
npm start
```
3. Open new terminal window and execute the following commands to start hardhat local node
```
cd hardhat
npm install
npx hardhat node
```
4. Open new terminal window and execute the following commands to deploy the contract and mint NFTs
```
cd hardhat
npx hardhat run --network localhost scripts/deployAndMint.js
```
5. Using the same terminal window and execute the following commands to run the UI
```
cd ../frontend
npm install
npm start
```
6. Open the browser and go to http://127.0.0.1:3000