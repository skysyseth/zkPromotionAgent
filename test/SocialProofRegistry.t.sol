// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import {SocialProofRegistry} from "../src/SocialProofRegistry.sol";
import { IPrimusZKTLS, Attestation } from "@primuslabs/zktls-contracts/src/IPrimusZKTLS.sol";


// 本地 Mock：签名与数据不校验，只按开关决定是否通过
contract MockPrimus is IPrimusZKTLS {
    bool public ok = true;
    function setOk(bool v) external { ok = v; }

    // 关键：这里的参数类型要写成 IPrimusZKTLS.Attestation
    function verifyAttestation(Attestation calldata) external view override {
        require(ok, "primus verify failed");
    }
}

contract SocialProofRegistryTest is Test {
    SocialProofRegistry reg;
    MockPrimus mock;

    function setUp() public {
        // 读取环境变量；没设置则使用本地 Mock
        // address primusAddr = vm.envOr("PRIMUS_ZKTLS_ADDRESS", address(0));
        // if (primusAddr == address(0)) {
        //     mock = new MockPrimus();
        //     primusAddr = address(mock);
        // }
        // reg = new SocialProofRegistry(primusAddr);
        address primusAddr = 0x1Ad7fD53206fDc3979C672C0466A1c48AF47B431; // 本地测试地址
    }

    // function test_Register_Success_WithMock() public {
    //     // 仅当使用 Mock 时才跑
    //     if (address(mock) == address(0)) return;

    //     Attestation memory att = Attestation({
    //         data: hex"1234",
    //         user: address(this),
    //         signature: hex"deadbeef",
    //         timestamp: block.timestamp
    //     });

    //     reg.register(att, "@alice");
    //     assertEq(reg.ownerOfHandle("@alice"), address(this));
    // }

    // function test_Register_Revert_When_PrimusFails() public {
    //     if (address(mock) == address(0)) return;

    //     mock.setOk(false);
    //     Attestation memory att = Attestation({
    //         data: "",
    //         user: address(this),
    //         signature: "",
    //         timestamp: block.timestamp
    //     });

    //     vm.expectRevert(); // "primus verify failed"
    //     reg.register(att, "@bob");
    // }
}
