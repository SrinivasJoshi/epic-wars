// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GalacticaCore is ERC721 {
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
        require(characterID>0 && characterID<31, "Error: No such character");
        require(addressToID[msg.sender]==0,"Error: 1 NFT per address only");
        status[characterID] = true; // true means the character is minted to some player
        addressToID[msg.sender] = characterID;
        _mint(msg.sender, characterID);
    }

    function characterWar(address player1, address player2, uint256 characterID1, uint256 characterID2, uint256 attribute) external view watcherOnly returns (address winner) {
        require(ownerOf(characterID1) == player1,"Error: Mint the Character first");
        require(ownerOf(characterID2) == player2, "Error: Mint the Character first");
        require(player1 != address(0) && player2 != address(0) && (characterID1 > 0 && characterID1 <= totalCharacters) && (characterID2 > 0 && characterID2 <= totalCharacters), "Error: Invalid Player details");
        require(attribute < 7, "Error: Attribute index is wrong");

        Character memory character1 = IdToCharacter[characterID1];
        Character memory character2 = IdToCharacter[characterID2];

        if(characterID1 == characterID2) {
            return address(0); // both players chose the same NFT
        }

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
}