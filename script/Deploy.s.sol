// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script } from "forge-std/Script.sol";
import { SocialProofRegistry } from "../src/SocialProofRegistry.sol";

contract Deploy is Script {
    function run() external {
        // address primus = vm.envAddress("PRIMUS_ZKTLS_ADDRESS"); // 来自 .env
        vm.startBroadcast();
        // new SocialProofRegistry(primus);
        new SocialProofRegistry();
        vm.stopBroadcast();
    }
}
