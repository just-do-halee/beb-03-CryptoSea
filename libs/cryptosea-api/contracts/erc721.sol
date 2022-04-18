//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    address contractAddress;
    mapping(uint => uint) blockRecorder;


    constructor() ERC721("CryptoSea", "CSTK"){
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal
      override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal
      override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    function tokenURI(
        uint256 tokenId
    ) public view
      override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    

    function mintNFT(address recipient, string memory tokenURI) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId); 
        _setTokenURI(newItemId, tokenURI); 
        blockRecorder[newItemId] = block.number; // 기록함

        return newItemId;

    }



    function listUserNFTs(address owner) external view returns (uint[] memory) {

        uint balance = balanceOf(owner);

        uint[] memory tokens = new uint[](balance);

        for (uint i=0; i < balance; i++) {
            tokens[i] = (tokenOfOwnerByIndex(owner, i));
        }

        return tokens;
    }

    function getBlockNumber(uint tokenId) public view returns (uint blockNumber) {
        require(
            (0 < tokenId) &&
            (tokenId <= _tokenIds.current()),
            "Token ID should be less than current Token Id"
            );

        blockNumber = blockRecorder[tokenId];
    }
   


    
}