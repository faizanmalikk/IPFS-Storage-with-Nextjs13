import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { assert, expect } from "chai"
import { IPFSStorage } from "../typechain-types"
import { FILENAME, IPFSHASH } from "../helper-hardhat-config"


describe("IPFSStorage work flow", async () => {

    let IPFSContract: IPFSStorage
    let deployer: string

    beforeEach(async () => {

        deployer = (await getNamedAccounts()).deployer

        await deployments.fixture(['all'])
        IPFSContract = await ethers.getContract('IPFSStorage', deployer)
    })

    describe("uploadFiles", async () => {
        it("should revert if file already exists", async () => {
            await IPFSContract.uploadFiles(FILENAME, IPFSHASH)
            await expect(IPFSContract.uploadFiles(FILENAME, IPFSHASH)).to.be.revertedWithCustomError(IPFSContract, 'IPFSStorage__FileAlreadyExists')
        })
        it("should save properly in contract", async () => {
            await IPFSContract.uploadFiles(FILENAME, IPFSHASH)
            const presentFiles = await IPFSContract.getFiles(FILENAME)

            assert.equal(presentFiles.filename, FILENAME)
            assert.equal(presentFiles.ipfsHash, IPFSHASH)
        })
    })

    describe("getIpfsHash", async () => {
        it("should revert if file does not exists", async () => {
            await expect(IPFSContract.getIpfsHash('hehe.jpg')).to.be.revertedWithCustomError(IPFSContract, 'IPFSStorage__FileDoesNotExists')
        })
        it("should return correct Hash", async () => {
            await IPFSContract.uploadFiles(FILENAME, IPFSHASH)
            const hash = await IPFSContract.getIpfsHash(FILENAME)

            assert.equal(hash, IPFSHASH)
        })
    })

    describe("isFileStored", async () => {
        it("should return true if file exits", async () => {
            await IPFSContract.uploadFiles(FILENAME, IPFSHASH)
            const isFileExists = await IPFSContract.isFileStored(FILENAME)
            assert.equal(isFileExists, true)
        })
        it("should return false if file does not exists", async () => {
            const isFileExists = await IPFSContract.isFileStored('hehe.jpg')
            assert.equal(isFileExists, false)
        })
    })
})