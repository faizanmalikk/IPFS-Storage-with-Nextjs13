export const API_URL = process.env.RPC_URL;
export const PRIVATE_KEY =process.env.PRIVATE_KEY;
export const WEB3_STORAGE_TOKEN =process.env.WEB3_STORAGE_TOKEN;
export const contractAddress = "0x91b90737853f036d85CE88D6A97cE9def1049073";
export const contractAbi = [{"inputs":[],"name":"IPFSStorage__FileAlreadyExists","type":"error"},{"inputs":[],"name":"IPFSStorage__FileDoesNotExists","type":"error"},{"inputs":[{"internalType":"string","name":"_filename","type":"string"}],"name":"getFiles","outputs":[{"components":[{"internalType":"string","name":"filename","type":"string"},{"internalType":"string","name":"ipfsHash","type":"string"}],"internalType":"struct IPFSStorage.File","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_filename","type":"string"}],"name":"getIpfsHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_filename","type":"string"}],"name":"isFileStored","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_filename","type":"string"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"uploadFiles","outputs":[],"stateMutability":"nonpayable","type":"function"}]