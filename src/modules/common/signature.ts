import Web3 from 'web3';
import abi from 'ethereumjs-abi';
import { ApolloError } from 'apollo-server';

const web3 = new Web3(process.env.WEB3_PROVIDER_URL);
const signer = process.env.WEB3_ACCOUNT_SIGNER || '';
const chainId = process.env.WEB3_CHAIN_ID;
const akshunStoreContractAddress = process.env.WEB3_AKSHUN_STORE_CONTRACT_ADDRESS;
const seasonPassStoreContractAddress = process.env.WEB3_SEASON_PASS_STORE_CONTRACT_ADDRESS;

export async function akshunStoreSignature(walletAddress: string) {
  try {
    const instance = new web3.eth.Contract(
      [
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'nonces',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      akshunStoreContractAddress,
    );
    const nonce = await instance.methods.nonces(walletAddress).call();

    const hash = `0x${abi
      .soliditySHA3(
        ['address', 'uint256', 'uint256', 'address'],
        [walletAddress, nonce, chainId, akshunStoreContractAddress],
      )
      .toString('hex')}`;
    const result = web3.eth.accounts.sign(hash, signer);
    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('generateAkshunStoreSignature Fail', 'akshun_store_signature_failed');
  }
}

export async function seasonPassStoreSignature(walletAddress: string) {
  try {
    const instance = new web3.eth.Contract(
      [
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'nonces',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      seasonPassStoreContractAddress,
    );
    const nonce = await instance.methods.nonces(walletAddress).call();

    const hash = `0x${abi
      .soliditySHA3(
        ['address', 'uint256', 'uint256', 'address'],
        [walletAddress, nonce, chainId, seasonPassStoreContractAddress],
      )
      .toString('hex')}`;
    const result = web3.eth.accounts.sign(hash, signer);
    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('seasonPassStoreSignature Fail', 'season_pass_signature_failed');
  }
}

export function openAkshunSignature(tokenID: number) {
  try {
    const hash = `0x${abi
      .soliditySHA3(['uint256', 'uint256', 'address'], [tokenID, chainId, seasonPassStoreContractAddress])
      .toString('hex')}`;
  
    const sign = web3.eth.accounts.sign(hash, signer);
    return sign;  
  } catch (error) {
    console.log(error);
    throw new ApolloError('generateAkshunStoreSignature Fail', 'akshun_store_signature_failed');
  }
}