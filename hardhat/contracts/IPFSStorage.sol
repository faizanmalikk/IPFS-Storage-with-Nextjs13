// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

error IPFSStorage__FileAlreadyExists();
error IPFSStorage__FileDoesNotExists();

contract IPFSStorage {
    struct File {
        string filename;
        string ipfsHash;
    }

    mapping(string => File) private files;

    function uploadFiles(
        string memory _filename,
        string memory _ipfsHash
    ) public {
        if (bytes(files[_filename].ipfsHash).length > 0) {
            revert IPFSStorage__FileAlreadyExists();
        }
        files[_filename] = File({filename: _filename, ipfsHash: _ipfsHash});
    }

    function getIpfsHash(
        string memory _filename
    ) public view returns (string memory) {
        if (bytes(files[_filename].ipfsHash).length == 0) {
            revert IPFSStorage__FileDoesNotExists();
        }
        return files[_filename].ipfsHash;
    }

    function isFileStored(string memory _filename) public view returns (bool) {
        return bytes(files[_filename].ipfsHash).length > 0;
    }

    function getFiles(string memory _filename) public view returns (File memory) {
        return files[_filename];
    }
}
