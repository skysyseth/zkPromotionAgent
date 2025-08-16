// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 从 Primus 包里引入接口和结构体
import { IPrimusZKTLS, Attestation } from "@primuslabs/zktls-contracts/src/IPrimusZKTLS.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SocialProofRegistry
 * @notice Register mapping between a social handle and an EOA,
 *         only if a zkTLS attestation is verified on-chain via Primus contract.
 */
contract SocialProofRegistry is Ownable, ReentrancyGuard {
    /// @notice Primus zkTLS verifier contract address (network-specific)
    address public immutable primus;

    struct Record {
        address owner;
        bytes32 proofHash;      // keccak256(attestation-encoded)
        uint64 lastUpdated;     // unix seconds
    }

    /// handleHash => record
    mapping(bytes32 => Record) public records;

    event Registered(bytes32 indexed handleHash, address indexed owner, bytes32 proofHash);
    event Unregistered(bytes32 indexed handleHash, address indexed owner);

    error InvalidAttestation();
    error NotHandleOwner();
    error EmptyHandle();
    error SameOwner();

    // constructor(address primusAddr) {
    constructor() {
        // require(primusAddr != address(0), "primus=0");
        // primus = primusAddr;
        primus = 0x1Ad7fD53206fDc3979C672C0466A1c48AF47B431;
    }

    /**
     * @notice Register (or update) handle ownership after zkTLS attestation is verified.
     * @dev MVP 不解析 attestation.data 的内部字段，直接依赖 Primus 的 verifyAttestation 成功即通过；
     *      生产可在模板中把 handleHash/user 绑定进 attestation.data，再在这里 decode 校验。
     */
    function register(Attestation calldata att, string calldata handle) external nonReentrant {
        if (bytes(handle).length == 0) revert EmptyHandle();

        // 1) 调用 Primus 合约做链上校验（若无效会 revert）
        IPrimusZKTLS(primus).verifyAttestation(att);

        // 2) （可选）进一步对 att.data 做业务校验：比如解析 context/指纹与 msg.sender/handle 绑定
        //    这里留作 TODO，MVP 先跳过（依赖模板端已绑定）。
        //    // bytes32 ctxHash = abi.decode(att.data, (bytes32));
        //    // require(ctxHash == keccak256(abi.encode(msg.sender, handle)), "ctx mismatch");

        bytes32 h = keccak256(bytes(_normalize(handle)));
        Record storage r = records[h];

        if (r.owner == msg.sender) revert SameOwner();

        bytes32 ph = keccak256(abi.encode(att));
        records[h] = Record({
            owner: msg.sender,
            proofHash: ph,
            lastUpdated: uint64(block.timestamp)
        });

        emit Registered(h, msg.sender, ph);
    }

    function ownerOfHandle(string calldata handle) external view returns (address) {
        return records[keccak256(bytes(_normalize(handle)))].owner;
    }

    function unregister(string calldata handle) external {
        bytes32 h = keccak256(bytes(_normalize(handle)));
        Record memory r = records[h];
        if (r.owner != msg.sender) revert NotHandleOwner();
        delete records[h];
        emit Unregistered(h, msg.sender);
    }

    function _normalize(string memory handle) internal pure returns (string memory) {
        bytes memory b = bytes(handle);
        if (b.length == 0) return handle;
        // to lower
        for (uint i=0; i<b.length; i++) {
            uint8 c = uint8(b[i]);
            if (c >= 65 && c <= 90) b[i] = bytes1(c + 32);
        }
        // ensure leading '@'
        if (b[0] != "@") {
            return string(abi.encodePacked("@", b));
        }
        return string(b);
    }
}
