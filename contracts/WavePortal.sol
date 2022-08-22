pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;
    mapping(address => uint256) lastWavedAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart af. Come wave at me :)");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    function wave(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 15m"
        );
        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        console.log("%s just waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed < 50){
            console.log("%s won", msg.sender);
            uint256 prizeMoney = 0.0001 ether;
            require(
                prizeMoney <= address(this).balance,
                "Trying to withdraw more than the contract has"
            );
            (bool success, ) = (msg.sender).call{value : prizeMoney}("");
            require(
                success, "Failed to withdraw money from contract"
            );
        }

        emit NewWave(msg.sender, block.timestamp, _message);

    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}