import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
    developmentChains, networkConfig,

} from "../helper-hardhat-config"
import verify from "../utils/verify";

const deployipfsStorageContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()


    log("----------------------------------------------------")
    log("Deploying ipfsStorageContract and waiting for confirmations...")
    const ipfsStorageContract = await deploy("IPFSStorage", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`ipfsStorageContract at ${ipfsStorageContract.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_PRIVATE_KEY) {
        await verify(ipfsStorageContract.address, [])
    }
}

export default deployipfsStorageContract
deployipfsStorageContract.tags = ["all", "ipfs"]