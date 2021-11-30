// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract MyToken is ERC721URIStorage {
    
    address public owner;
    address public streamer;
    address public actualAddress;
    bool public flag2 = false;
    uint256 public price;
    uint256 public actualBid;
    string public tokenURI;
    bool public flag = false;
    address constant public thetaClipsMarketplace = 0x662e332994Fd6a834eD965E6ED45643108eEef1c;
    
    modifier onlyOwner{
        require(msg.sender == owner);
        _; // Close Modifier
    }
    
    constructor() ERC721('NFT', 'MyNFT') {
        owner = msg.sender;
    }

    function setStreamer(address _streamer) public onlyOwner {
        require(false == flag2);
        streamer = _streamer;
        flag2=true;
    }
    
    function mintNFT(string memory _tokenURI, uint256 _price) public onlyOwner returns (uint256)
    {
        tokenURI = _tokenURI;
        _mint(owner, 1);
        _setTokenURI(1, tokenURI);
        price = _price;
        flag = true;
        return 1;
    }
    
    function bidUp() public payable {
        require(msg.value > actualBid);
        require(msg.value > price);
        require(flag == true);
        require(flag2 == true);
        if(actualBid>0){
          payable(actualAddress).transfer(actualBid);  
        }
        actualAddress = msg.sender;
        actualBid = msg.value;
        price = msg.value;
    }
    
    function changePrice(uint256 _price) public onlyOwner {
        require(0 == actualBid);
        price = _price;
    }
    
    function activate() public onlyOwner{
        flag = true;
    }
    
    function finish() public onlyOwner payable {
        _transfer(owner, actualAddress, 1);
        actualBid = 0;
        flag = false;
        payable(thetaClipsMarketplace).transfer(address(this).balance/50); // send % Theta to the Marketplace
        payable(streamer).transfer(address(this).balance/50); // send % Theta to the streamer
        payable(owner).transfer(address(this).balance); // send contract Theta to the seller
        owner = actualAddress;
    }
}