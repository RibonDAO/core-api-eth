const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Ribon = require('./Ribon.json');

const ETH_NETWORK = process.env.ETH_NETWORK;
const ACCOUNT_ADDRESS = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

exports.handler = async (event) => {
    const body = event
    const user = body.user;
    const nonProfitAddress = body.nonProfit;
    const amount = body.amount;
  
    let provider = new HDWalletProvider({
        mnemonic: PRIVATE_KEY,
        providerOrUrl: ETH_NETWORK,
        addressIndex: 0
    });
    const web3 = new Web3(provider);
    const RibonContract = new web3.eth.Contract(Ribon.abi, CONTRACT_ADDRESS);

    const result = await RibonContract.methods.donateThroughIntegration(nonProfitAddress, web3.utils.keccak256(user), amount).send({from: ACCOUNT_ADDRESS});
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};
