//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CryptoLogos is ERC721 {
    address private immutable _owner;

    constructor(string memory name, string memory symbol) ERC721(name, symbol)  {
        _owner = msg.sender;
    }

    function mint(address to, uint256 tokenId) public {
        require(_owner == msg.sender, "Not an owner");
        _safeMint(to, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return "http://127.0.0.1:3001/getmetadata&id=";
    }
}
