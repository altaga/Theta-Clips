exports.content = () =>{ return `
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
        payable(thetaClipsMarketplace).transfer(address(this).balance/50);
        payable(streamer).transfer(address(this).balance/50);
        payable(owner).transfer(address(this).balance); // send the ETH to the seller
        owner = actualAddress;
    }
}
`}

exports.abi = () => {
    return [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "activate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "actualAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "actualBid",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "bidUp",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "changePrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finish",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "flag",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "flag2",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_tokenURI",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "mintNFT",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "price",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_streamer",
                    "type": "address"
                }
            ],
            "name": "setStreamer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "streamer",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "thetaClipsMarketplace",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
  };
  
  exports.bytecode = () => {
    return("60806040526000600960146101000a81548160ff0219169083151502179055506000600d60006101000a81548160ff0219169083151502179055503480156200004757600080fd5b506040518060400160405280600381526020017f4e465400000000000000000000000000000000000000000000000000000000008152506040518060400160405280600581526020017f4d794e46540000000000000000000000000000000000000000000000000000008152508160009080519060200190620000cc9291906200012f565b508060019080519060200190620000e59291906200012f565b50505033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000244565b8280546200013d90620001df565b90600052602060002090601f016020900481019282620001615760008555620001ad565b82601f106200017c57805160ff1916838001178555620001ad565b82800160010185558215620001ad579182015b82811115620001ac5782518255916020019190600101906200018f565b5b509050620001bc9190620001c0565b5090565b5b80821115620001db576000816000905550600101620001c1565b5090565b60006002820490506001821680620001f857607f821691505b602082108114156200020f576200020e62000215565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6136d580620002546000396000f3fe6080604052600436106101b75760003560e01c80637f032c4f116100ec578063a2b40d191161008a578063c87b56dd11610064578063c87b56dd146105db578063cecf13f514610618578063d56b288914610643578063e985e9c51461064d576101b7565b8063a2b40d191461057f578063b88d4fde146105a8578063bc8e9e16146105d1576101b7565b806395d89b41116100c657806395d89b41146104d557806396af085c14610500578063a035b1fe1461052b578063a22cb46514610556576101b7565b80637f032c4f14610456578063890eba681461047f5780638da5cb5b146104aa576101b7565b80633c130d90116101595780635afa3a72116101335780635afa3a721461037457806362f9db00146103b15780636352211e146103dc57806370a0823114610419576101b7565b80633c130d90146102f557806342842e0e14610320578063449107b614610349576101b7565b8063095ea7b311610195578063095ea7b3146102615780630f15f4c01461028a57806323b872dd146102a15780633004511f146102ca576101b7565b806301ffc9a7146101bc57806306fdde03146101f9578063081812fc14610224575b600080fd5b3480156101c857600080fd5b506101e360048036038101906101de91906126d7565b61068a565b6040516101f09190612b45565b60405180910390f35b34801561020557600080fd5b5061020e61076c565b60405161021b9190612b60565b60405180910390f35b34801561023057600080fd5b5061024b6004803603810190610246919061278d565b6107fe565b6040516102589190612ade565b60405180910390f35b34801561026d57600080fd5b5061028860048036038101906102839190612697565b610883565b005b34801561029657600080fd5b5061029f61099b565b005b3480156102ad57600080fd5b506102c860048036038101906102c39190612581565b610a12565b005b3480156102d657600080fd5b506102df610a72565b6040516102ec9190612b45565b60405180910390f35b34801561030157600080fd5b5061030a610a85565b6040516103179190612b60565b60405180910390f35b34801561032c57600080fd5b5061034760048036038101906103429190612581565b610b13565b005b34801561035557600080fd5b5061035e610b33565b60405161036b9190612ade565b60405180910390f35b34801561038057600080fd5b5061039b60048036038101906103969190612731565b610b59565b6040516103a89190612d82565b60405180910390f35b3480156103bd57600080fd5b506103c6610cba565b6040516103d39190612ade565b60405180910390f35b3480156103e857600080fd5b5061040360048036038101906103fe919061278d565b610cd2565b6040516104109190612ade565b60405180910390f35b34801561042557600080fd5b50610440600480360381019061043b9190612514565b610d84565b60405161044d9190612d82565b60405180910390f35b34801561046257600080fd5b5061047d60048036038101906104789190612514565b610e3c565b005b34801561048b57600080fd5b50610494610f15565b6040516104a19190612b45565b60405180910390f35b3480156104b657600080fd5b506104bf610f28565b6040516104cc9190612ade565b60405180910390f35b3480156104e157600080fd5b506104ea610f4e565b6040516104f79190612b60565b60405180910390f35b34801561050c57600080fd5b50610515610fe0565b6040516105229190612d82565b60405180910390f35b34801561053757600080fd5b50610540610fe6565b60405161054d9190612d82565b60405180910390f35b34801561056257600080fd5b5061057d60048036038101906105789190612657565b610fec565b005b34801561058b57600080fd5b506105a660048036038101906105a1919061278d565b611002565b005b3480156105b457600080fd5b506105cf60048036038101906105ca91906125d4565b611075565b005b6105d96110d7565b005b3480156105e757600080fd5b5061060260048036038101906105fd919061278d565b6111fb565b60405161060f9190612b60565b60405180910390f35b34801561062457600080fd5b5061062d61134d565b60405161063a9190612ade565b60405180910390f35b61064b611373565b005b34801561065957600080fd5b50610674600480360381019061066f9190612541565b6115ea565b6040516106819190612b45565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061075557507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061076557506107648261167e565b5b9050919050565b60606000805461077b90612fd8565b80601f01602080910402602001604051908101604052809291908181526020018280546107a790612fd8565b80156107f45780601f106107c9576101008083540402835291602001916107f4565b820191906000526020600020905b8154815290600101906020018083116107d757829003601f168201915b5050505050905090565b6000610809826116e8565b610848576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083f90612ce2565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061088e82610cd2565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156108ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f690612d42565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661091e611754565b73ffffffffffffffffffffffffffffffffffffffff16148061094d575061094c81610947611754565b6115ea565b5b61098c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098390612c22565b60405180910390fd5b610996838361175c565b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109f557600080fd5b6001600d60006101000a81548160ff021916908315150217905550565b610a23610a1d611754565b82611815565b610a62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5990612d62565b60405180910390fd5b610a6d8383836118f3565b505050565b600960149054906101000a900460ff1681565b600c8054610a9290612fd8565b80601f0160208091040260200160405190810160405280929190818152602001828054610abe90612fd8565b8015610b0b5780601f10610ae057610100808354040283529160200191610b0b565b820191906000526020600020905b815481529060010190602001808311610aee57829003601f168201915b505050505081565b610b2e83838360405180602001604052806000815250611075565b505050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bb557600080fd5b82600c9080519060200190610bcb929190612328565b50610bf9600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166001611b4f565b610c8e6001600c8054610c0b90612fd8565b80601f0160208091040260200160405190810160405280929190818152602001828054610c3790612fd8565b8015610c845780601f10610c5957610100808354040283529160200191610c84565b820191906000526020600020905b815481529060010190602001808311610c6757829003601f168201915b5050505050611d1d565b81600a819055506001600d60006101000a81548160ff0219169083151502179055506001905092915050565b73662e332994fd6a834ed965e6ed45643108eeef1c81565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7290612c62565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610df5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dec90612c42565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e9657600080fd5b600960149054906101000a900460ff1615156000151514610eb657600080fd5b80600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600960146101000a81548160ff02191690831515021790555050565b600d60009054906101000a900460ff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060018054610f5d90612fd8565b80601f0160208091040260200160405190810160405280929190818152602001828054610f8990612fd8565b8015610fd65780601f10610fab57610100808354040283529160200191610fd6565b820191906000526020600020905b815481529060010190602001808311610fb957829003601f168201915b5050505050905090565b600b5481565b600a5481565b610ffe610ff7611754565b8383611d91565b5050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461105c57600080fd5b600b5460001461106b57600080fd5b80600a8190555050565b611086611080611754565b83611815565b6110c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110bc90612d62565b60405180910390fd5b6110d184848484611efe565b50505050565b600b5434116110e557600080fd5b600a5434116110f357600080fd5b60011515600d60009054906101000a900460ff1615151461111357600080fd5b60011515600960149054906101000a900460ff1615151461113357600080fd5b6000600b5411156111aa57600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600b549081150290604051600060405180830381858888f193505050501580156111a8573d6000803e3d6000fd5b505b33600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600b8190555034600a81905550565b6060611206826116e8565b611245576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123c90612cc2565b60405180910390fd5b600060066000848152602001908152602001600020805461126590612fd8565b80601f016020809104026020016040519081016040528092919081815260200182805461129190612fd8565b80156112de5780601f106112b3576101008083540402835291602001916112de565b820191906000526020600020905b8154815290600101906020018083116112c157829003601f168201915b5050505050905060006112ef611f5a565b9050600081511415611305578192505050611348565b60008251111561133a578082604051602001611322929190612aba565b60405160208183030381529060405292505050611348565b61134384611f71565b925050505b919050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146113cd57600080fd5b61141d600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660016118f3565b6000600b819055506000600d60006101000a81548160ff02191690831515021790555073662e332994fd6a834ed965e6ed45643108eeef1c73ffffffffffffffffffffffffffffffffffffffff166108fc60324761147b9190612ebd565b9081150290604051600060405180830381858888f193505050501580156114a6573d6000803e3d6000fd5b50600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6032476114f09190612ebd565b9081150290604051600060405180830381858888f1935050505015801561151b573d6000803e3d6000fd5b50600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015611584573d6000803e3d6000fd5b50600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166117cf83610cd2565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000611820826116e8565b61185f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161185690612c02565b60405180910390fd5b600061186a83610cd2565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806118d957508373ffffffffffffffffffffffffffffffffffffffff166118c1846107fe565b73ffffffffffffffffffffffffffffffffffffffff16145b806118ea57506118e981856115ea565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661191382610cd2565b73ffffffffffffffffffffffffffffffffffffffff1614611969576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161196090612d02565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156119d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119d090612bc2565b60405180910390fd5b6119e4838383612018565b6119ef60008261175c565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611a3f9190612eee565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611a969190612e67565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611bbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bb690612ca2565b60405180910390fd5b611bc8816116e8565b15611c08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bff90612ba2565b60405180910390fd5b611c1460008383612018565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611c649190612e67565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b611d26826116e8565b611d65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5c90612c82565b60405180910390fd5b80600660008481526020019081526020016000209080519060200190611d8c929190612328565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611e00576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df790612be2565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611ef19190612b45565b60405180910390a3505050565b611f098484846118f3565b611f158484848461201d565b611f54576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f4b90612b82565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b6060611f7c826116e8565b611fbb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fb290612d22565b60405180910390fd5b6000611fc5611f5a565b90506000815111611fe55760405180602001604052806000815250612010565b80611fef846121b4565b604051602001612000929190612aba565b6040516020818303038152906040525b915050919050565b505050565b600061203e8473ffffffffffffffffffffffffffffffffffffffff16612315565b156121a7578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02612067611754565b8786866040518563ffffffff1660e01b81526004016120899493929190612af9565b602060405180830381600087803b1580156120a357600080fd5b505af19250505080156120d457506040513d601f19601f820116820180604052508101906120d19190612704565b60015b612157573d8060008114612104576040519150601f19603f3d011682016040523d82523d6000602084013e612109565b606091505b5060008151141561214f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161214690612b82565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506121ac565b600190505b949350505050565b606060008214156121fc576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050612310565b600082905060005b6000821461222e5780806122179061303b565b915050600a826122279190612ebd565b9150612204565b60008167ffffffffffffffff81111561224a57612249613171565b5b6040519080825280601f01601f19166020018201604052801561227c5781602001600182028036833780820191505090505b5090505b60008514612309576001826122959190612eee565b9150600a856122a49190613084565b60306122b09190612e67565b60f81b8183815181106122c6576122c5613142565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856123029190612ebd565b9450612280565b8093505050505b919050565b600080823b905060008111915050919050565b82805461233490612fd8565b90600052602060002090601f016020900481019282612356576000855561239d565b82601f1061236f57805160ff191683800117855561239d565b8280016001018555821561239d579182015b8281111561239c578251825591602001919060010190612381565b5b5090506123aa91906123ae565b5090565b5b808211156123c75760008160009055506001016123af565b5090565b60006123de6123d984612dc2565b612d9d565b9050828152602081018484840111156123fa576123f96131a5565b5b612405848285612f96565b509392505050565b600061242061241b84612df3565b612d9d565b90508281526020810184848401111561243c5761243b6131a5565b5b612447848285612f96565b509392505050565b60008135905061245e81613643565b92915050565b6000813590506124738161365a565b92915050565b60008135905061248881613671565b92915050565b60008151905061249d81613671565b92915050565b600082601f8301126124b8576124b76131a0565b5b81356124c88482602086016123cb565b91505092915050565b600082601f8301126124e6576124e56131a0565b5b81356124f684826020860161240d565b91505092915050565b60008135905061250e81613688565b92915050565b60006020828403121561252a576125296131af565b5b60006125388482850161244f565b91505092915050565b60008060408385031215612558576125576131af565b5b60006125668582860161244f565b92505060206125778582860161244f565b9150509250929050565b60008060006060848603121561259a576125996131af565b5b60006125a88682870161244f565b93505060206125b98682870161244f565b92505060406125ca868287016124ff565b9150509250925092565b600080600080608085870312156125ee576125ed6131af565b5b60006125fc8782880161244f565b945050602061260d8782880161244f565b935050604061261e878288016124ff565b925050606085013567ffffffffffffffff81111561263f5761263e6131aa565b5b61264b878288016124a3565b91505092959194509250565b6000806040838503121561266e5761266d6131af565b5b600061267c8582860161244f565b925050602061268d85828601612464565b9150509250929050565b600080604083850312156126ae576126ad6131af565b5b60006126bc8582860161244f565b92505060206126cd858286016124ff565b9150509250929050565b6000602082840312156126ed576126ec6131af565b5b60006126fb84828501612479565b91505092915050565b60006020828403121561271a576127196131af565b5b60006127288482850161248e565b91505092915050565b60008060408385031215612748576127476131af565b5b600083013567ffffffffffffffff811115612766576127656131aa565b5b612772858286016124d1565b9250506020612783858286016124ff565b9150509250929050565b6000602082840312156127a3576127a26131af565b5b60006127b1848285016124ff565b91505092915050565b6127c381612f22565b82525050565b6127d281612f34565b82525050565b60006127e382612e24565b6127ed8185612e3a565b93506127fd818560208601612fa5565b612806816131b4565b840191505092915050565b600061281c82612e2f565b6128268185612e4b565b9350612836818560208601612fa5565b61283f816131b4565b840191505092915050565b600061285582612e2f565b61285f8185612e5c565b935061286f818560208601612fa5565b80840191505092915050565b6000612888603283612e4b565b9150612893826131c5565b604082019050919050565b60006128ab601c83612e4b565b91506128b682613214565b602082019050919050565b60006128ce602483612e4b565b91506128d98261323d565b604082019050919050565b60006128f1601983612e4b565b91506128fc8261328c565b602082019050919050565b6000612914602c83612e4b565b915061291f826132b5565b604082019050919050565b6000612937603883612e4b565b915061294282613304565b604082019050919050565b600061295a602a83612e4b565b915061296582613353565b604082019050919050565b600061297d602983612e4b565b9150612988826133a2565b604082019050919050565b60006129a0602e83612e4b565b91506129ab826133f1565b604082019050919050565b60006129c3602083612e4b565b91506129ce82613440565b602082019050919050565b60006129e6603183612e4b565b91506129f182613469565b604082019050919050565b6000612a09602c83612e4b565b9150612a14826134b8565b604082019050919050565b6000612a2c602983612e4b565b9150612a3782613507565b604082019050919050565b6000612a4f602f83612e4b565b9150612a5a82613556565b604082019050919050565b6000612a72602183612e4b565b9150612a7d826135a5565b604082019050919050565b6000612a95603183612e4b565b9150612aa0826135f4565b604082019050919050565b612ab481612f8c565b82525050565b6000612ac6828561284a565b9150612ad2828461284a565b91508190509392505050565b6000602082019050612af360008301846127ba565b92915050565b6000608082019050612b0e60008301876127ba565b612b1b60208301866127ba565b612b286040830185612aab565b8181036060830152612b3a81846127d8565b905095945050505050565b6000602082019050612b5a60008301846127c9565b92915050565b60006020820190508181036000830152612b7a8184612811565b905092915050565b60006020820190508181036000830152612b9b8161287b565b9050919050565b60006020820190508181036000830152612bbb8161289e565b9050919050565b60006020820190508181036000830152612bdb816128c1565b9050919050565b60006020820190508181036000830152612bfb816128e4565b9050919050565b60006020820190508181036000830152612c1b81612907565b9050919050565b60006020820190508181036000830152612c3b8161292a565b9050919050565b60006020820190508181036000830152612c5b8161294d565b9050919050565b60006020820190508181036000830152612c7b81612970565b9050919050565b60006020820190508181036000830152612c9b81612993565b9050919050565b60006020820190508181036000830152612cbb816129b6565b9050919050565b60006020820190508181036000830152612cdb816129d9565b9050919050565b60006020820190508181036000830152612cfb816129fc565b9050919050565b60006020820190508181036000830152612d1b81612a1f565b9050919050565b60006020820190508181036000830152612d3b81612a42565b9050919050565b60006020820190508181036000830152612d5b81612a65565b9050919050565b60006020820190508181036000830152612d7b81612a88565b9050919050565b6000602082019050612d976000830184612aab565b92915050565b6000612da7612db8565b9050612db3828261300a565b919050565b6000604051905090565b600067ffffffffffffffff821115612ddd57612ddc613171565b5b612de6826131b4565b9050602081019050919050565b600067ffffffffffffffff821115612e0e57612e0d613171565b5b612e17826131b4565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000612e7282612f8c565b9150612e7d83612f8c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612eb257612eb16130b5565b5b828201905092915050565b6000612ec882612f8c565b9150612ed383612f8c565b925082612ee357612ee26130e4565b5b828204905092915050565b6000612ef982612f8c565b9150612f0483612f8c565b925082821015612f1757612f166130b5565b5b828203905092915050565b6000612f2d82612f6c565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612fc3578082015181840152602081019050612fa8565b83811115612fd2576000848401525b50505050565b60006002820490506001821680612ff057607f821691505b6020821081141561300457613003613113565b5b50919050565b613013826131b4565b810181811067ffffffffffffffff8211171561303257613031613171565b5b80604052505050565b600061304682612f8c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613079576130786130b5565b5b600182019050919050565b600061308f82612f8c565b915061309a83612f8c565b9250826130aa576130a96130e4565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f45524337323155524953746f726167653a2055524920717565727920666f722060008201527f6e6f6e6578697374656e7420746f6b656e000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960008201527f73206e6f74206f776e0000000000000000000000000000000000000000000000602082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b61364c81612f22565b811461365757600080fd5b50565b61366381612f34565b811461366e57600080fd5b50565b61367a81612f40565b811461368557600080fd5b50565b61369181612f8c565b811461369c57600080fd5b5056fea264697066735822122099cf9b09980929a23b0c9024a812cc4f6b42367c4ebfe3a6e6252330b58f8c5364736f6c63430008070033")
  }