import { ethers } from "ethers";
import { NextResponse } from "next/server";
import * as Constants from "../../config/config";
import { Web3Storage } from 'web3.storage';


export async function POST(request: any) {
    try {
        let formData = await request.formData();
        let { filename, file } = Object.fromEntries(formData);

        const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
        const signer = new ethers.Wallet(Constants.PRIVATE_KEY as string, provider);
        const StorageContract = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

        const isStored = await StorageContract.isFileStored(filename);

        if (isStored == false) {
            const token = Constants.WEB3_STORAGE_TOKEN as string;
            const storage = new Web3Storage({ token: token });
            const cid = await storage.put([file]);
            let hash = cid.toString();
            console.log("Storing the data in IPFS");

            const tx = await StorageContract.uploadFiles(filename, hash);
            await tx.wait();
            const storedhash = await StorageContract.getIpfsHash(filename);
            return NextResponse.json({
                message: `IPFS hash is stored in the smart contract: ${storedhash}`
            });
        } else {
            console.log("Data is already stored for this file name");
            const IPFShash = await StorageContract.getIpfsHash(filename);
            return NextResponse.json({
                message: `IPFS hash is already stored in the smart contract: ${IPFShash}`
            });
        }
    }
    catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}
