// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EpicWars is ERC721 {
    address private watcher;
    string private baseURI;
    mapping(uint256 => Character) private IdToCharacter;
    uint256 private totalCharacters;
    bool[] private status = new bool[](31);
    mapping(address => uint256) private addressToID;

    struct Character {
        uint256 elementalMagic;
        uint256 lightningStealth;
        uint256 elementalControl;
        uint256 timeAndSpace;
        uint256 celestialSpace;
        uint256 chaosEnergy;
        uint256 quantumEnigma;
    }

    constructor() ERC721("Inter-Planetary Gambling", "GIP") {
        watcher = msg.sender;
    }

    function setBaseURI(string calldata _baseURI) external watcherOnly {
        baseURI = _baseURI;
    }

    function setCharacter(uint256 characterID, Character calldata character) external watcherOnly {
        IdToCharacter[characterID] = character;
        totalCharacters += 1;
    }

    function mintCharacter(uint256 characterID) external {
        require(addressToID[msg.sender] == 0, "Error: The Address already owns one NFT");
        require(!_exists(characterID), "Error: Character is already minted");
        _mint(msg.sender, characterID);
        status[characterID] = true; // true means the character is minted to some player
        addressToID[msg.sender] = characterID;
    }

    function characterWar(uint256 characterID1, uint256 characterID2, uint256 attribute) external view returns (address winner) {
        address player1 = ownerOf(characterID1);
        address player2 = ownerOf(characterID2);

        // Issue with Oasis Sapphire Chain -> it changes the msg.sender 
        // require(msg.sender==player1 || msg.sender == player2,"Error : Not the owner of NFT"); 
        
        require(attribute < 7, "Error: Attribute index is wrong");

        Character memory character1 = IdToCharacter[characterID1];
        Character memory character2 = IdToCharacter[characterID2];

        if(attribute == 0) {
            return character1.elementalMagic > character2.elementalMagic? player1: player2;
        } else if (attribute == 1) {
            return character1.lightningStealth > character2.lightningStealth? player1: player2;
        } else if (attribute == 2) {
            return character1.elementalControl > character2.elementalControl? player1: player2;
        } else if (attribute == 3) {
            return character1.timeAndSpace > character2.timeAndSpace? player1: player2;
        } else if (attribute == 4) {
            return character1.celestialSpace > character2.celestialSpace? player1: player2;
        } else if (attribute == 5) {
            return character1.chaosEnergy > character2.chaosEnergy? player1: player2;
        }
        return character1.quantumEnigma > character2.quantumEnigma? player1: player2;
    }

    // modifiers

    modifier watcherOnly {
        require(msg.sender == watcher, "Error: Not allowed to carry out this operation");
        _;
    }

    // getters

    function getStatus() external view returns (bool[] memory) {
        return status;
    }

    function getIDFromAddress(address playerAddress) external view returns (uint256) {
        return addressToID[playerAddress];
    }

    function getBaseURI() external view returns (string memory) {
        return baseURI;
    }

    function getCharacterFromID(uint256 characterID) external view returns (Character memory) {
        // Issue with Oasis Sapphire Chain -> it changes the msg.sender 
        // address _owner = _ownerOf(characterID);
        // require(msg.sender == _owner, "Error: Not allowed to get attribute");
        
        return IdToCharacter[characterID];
    }
}