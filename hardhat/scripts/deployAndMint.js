const hre = require('hardhat');
const axios = require('axios');

const BACKEND_API_URL = endpoint => `http://127.0.0.1:3001/${endpoint}`;
const COINGECKO_API_URL = endpoint => `https://api.coingecko.com/api/v3${endpoint}`;

const getCoingeckoCoinsList = (count) => {
  return axios.get(COINGECKO_API_URL('/coins/markets'), {params: 
              {
                vs_currency: 'usd', 
                order: 'market_cap_desc', 
                sparkline: false, 
                page: 1, 
                per_page: count
              }}).then(result => result.data.map(coin => ({
                symbol: coin.symbol,
                name: coin.name,
                image: coin.image
              })));
}

async function main() {
  const Logos = await hre.ethers.getContractFactory('CryptoLogos');
  const logos = await Logos.deploy('CryptoLogos', 'CPL');

  await logos.deployed();
  console.log('CryptoLogos contract deployed to:', logos.address);

  const coins = await getCoingeckoCoinsList(50);
  const contract = await hre.ethers.getContractAt("CryptoLogos", logos.address);
  const nftOwner = (await ethers.getSigner(0)).address;

  await axios.post(BACKEND_API_URL('savecontract'), {address: logos.address})
    .catch(_ => console.log('Backend server unavailable: savecontract'));

  for(let coin of coins) {
    // ERC-721 based metadata record
    const metadata = {
      title: 'Asset Metadata',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Crypto Logos'
        },
        description: {
          type: 'string',
          description: `${coin.name} (${coin.symbol.toUpperCase()})`
        },
        image: {
          type: 'string',
          description: coin.image
        }
      }
    }

    await axios.post(BACKEND_API_URL('savemetadata'), metadata).then(async result => {
      if(!result.data.success) {
        console.log(`Error: minting logo NFT for ${coin.name} was unsuccessful`)
      }

      await contract.mint(nftOwner, result.data.id);
      console.log(`Minted logo NFT for ${coin.name.padEnd(15, ' ')} | id=${result.data.id}`);
    }).catch(_ => console.log('Backend server unavailable: savemetadata'));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
