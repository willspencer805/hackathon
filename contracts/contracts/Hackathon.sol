// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Hackathon is ERC1155, Ownable {
    constructor(string memory uri) ERC1155(uri) {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address[] memory addresses,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        for (uint8 i = 0; i < addresses.length; i++) {
            _mint(addresses[i], id, amount, "0x");
        }
    }
}
