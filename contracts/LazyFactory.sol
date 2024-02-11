//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract LazyFactory is
    EIP712,
    ERC721URIStorage,
    ERC721Royalty,
    AccessControl,
    ReentrancyGuard,
    Pausable
{
    uint8 usdtDecimals = 6;
    string private constant SIGNING_DOMAIN_NAME = "VADEE";
    string private constant SIGNING_DOMAIN_VERSION = "1";
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");
    bytes32 constant VOUCHER_TYPEHASH =
        keccak256(
            "Voucher(address artist,uint256 artworkId,uint256 priceDollar,string tokenUri,uint96 vadeeFee,uint96 royaltyFee)"
        );

    address usdt;
    address payable vadeeVaultAddress;

    struct Voucher {
        address artist;
        uint256 artworkId;
        uint256 priceDollar;
        string tokenUri;
        uint96 vadeeFee;
        uint96 royaltyFee;
        bytes signature;
    }

    event RedeemedAndMinted(address indexed artist, uint256 indexed tokenId, address minter, uint256 priceDollar);

    mapping(address => uint256) private balanceByAddress;

    constructor(address _usdt, address payable vadee) ERC721("Vadee", "Vadee") EIP712(SIGNING_DOMAIN_NAME, SIGNING_DOMAIN_VERSION) {
        _setupRole(SIGNER_ROLE, vadee);
        _grantRole(DEFAULT_ADMIN_ROLE, vadee);

        usdt = _usdt;
        vadeeVaultAddress = vadee;
    }

    function redeem(
        address buyer,
        Voucher calldata voucher
    ) external nonReentrant whenNotPaused {
        address signer = _verify(voucher);

        require(hasRole(SIGNER_ROLE, signer), Strings.toHexString(uint256(uint160(signer)), 20));


        uint256 amount = voucher.priceDollar * 10 ** usdtDecimals;
        uint256 vadeeAmount = amount * voucher.vadeeFee / 100;

        IERC20(usdt).transferFrom(msg.sender, vadeeVaultAddress, vadeeAmount);
        IERC20(usdt).transferFrom(msg.sender, voucher.artist, amount - vadeeAmount);

        _safeMint(voucher.artist, voucher.artworkId);
        _setTokenURI(voucher.artworkId, voucher.tokenUri);
        _setTokenRoyalty(voucher.artworkId, voucher.artist, voucher.royaltyFee);

        // transfer the token to the buyer
        _transfer(voucher.artist, buyer, voucher.artworkId);
        emit RedeemedAndMinted(voucher.artist, voucher.artworkId, buyer, amount);
    }

    function _hash(Voucher calldata voucher) internal view returns (bytes32) {
        return
            // _hashTypedDataV4(bytes32 structHash) → bytes32
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        VOUCHER_TYPEHASH,
                        voucher.artist,
                        voucher.artworkId,
                        voucher.priceDollar,
                        keccak256(bytes(voucher.tokenUri)),
                        voucher.vadeeFee,
                        voucher.royaltyFee
                    )
                )
            );
    }

    // returns signer address
    function _verify(Voucher calldata voucher) internal view returns (address) {
        bytes32 digest = _hash(voucher);

        return ECDSA.recover(digest, voucher.signature);
    }

    function getChainID() external view returns (uint256) {
        uint256 id;
        // https://docs.soliditylang.org/en/v0.8.7/yul.html?highlight=chainid#evm-dialect
        assembly {
            id := chainid()
        }
        return id;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(AccessControl, ERC721, ERC721Royalty)
        returns (bool)
    {
        return
            ERC721.supportsInterface(interfaceId) ||
            AccessControl.supportsInterface(interfaceId) ||
            ERC721Royalty.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }

    function _feeDenominator() internal pure override returns (uint96) {
        return 100;
    }

    function setVadeeVaultAddress(address payable newVadeeAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        vadeeVaultAddress = newVadeeAddress;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
