//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract LazyFactory is
    EIP712,
    ERC721URIStorage,
    ERC721Royalty,
    AccessControl,
    ReentrancyGuard
{
    address payable theArtist;
    string private constant SIGNING_DOMAIN_NAME = "VADEE";
    string private constant SIGNING_DOMAIN_VERSION = "1";
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");
    bytes32 constant VOUCHER_TYPEHASH =
        keccak256(
            "Voucher(string title,uint256 artworkId,string editionNumber,string edition,uint256 priceWei,string priceDollar,string tokenUri,string content)"
        );

    uint256 vadeeFee;
    address payable vadeeAddress;

    struct Voucher {
        string title;
        uint256 artworkId;
        string editionNumber;
        string edition;
        uint256 priceWei;
        string priceDollar;
        string tokenUri;
        string content;
        bytes signature;
    }

    event RedeemedAndMinted(uint256 indexed tokenId);

    mapping(address => uint256) private balanceByAddress;

    constructor(
        string memory name,
        string memory symbol,
        address payable artist,
        uint256 _vadeeFee,
        address payable _vadeeAddress,
        uint96 royaltyFee
    ) ERC721(name, symbol) EIP712(SIGNING_DOMAIN_NAME, SIGNING_DOMAIN_VERSION) {
        require(_vadeeFee < 100, "vadeeFee too high");
        require(_vadeeFee >= 0, "vadeeFee should be positive");

        _setupRole(SIGNER_ROLE, artist);
        theArtist = artist;
        vadeeFee = _vadeeFee;
        vadeeAddress = _vadeeAddress;
        _setDefaultRoyalty(artist, royaltyFee);
    }

    function redeem(
        address buyer,
        Voucher calldata voucher
    ) public payable nonReentrant {
        address artist = _verify(voucher);

        require(msg.value == voucher.priceWei, "Enter the correct price");
        require(artist != buyer, "artist cannot purchase");
        require(hasRole(SIGNER_ROLE, artist), "Invalid Signature");

        uint256 amount = msg.value;
        payable(artist).transfer(amount - (100 - vadeeFee));
        payable(vadeeAddress).transfer(amount * vadeeFee);

        _mint(artist, voucher.artworkId);
        _setTokenURI(voucher.artworkId, voucher.tokenUri);

        // transfer the token to the buyer
        _transfer(artist, buyer, voucher.artworkId);

        emit RedeemedAndMinted(voucher.artworkId);
    }

    function _hash(Voucher calldata voucher) internal view returns (bytes32) {
        return
            // _hashTypedDataV4(bytes32 structHash) → bytes32
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        VOUCHER_TYPEHASH,
                        keccak256(bytes(voucher.title)),
                        voucher.artworkId,
                        keccak256(bytes(voucher.editionNumber)),
                        keccak256(bytes(voucher.edition)),
                        voucher.priceWei,
                        keccak256(bytes(voucher.priceDollar)),
                        keccak256(bytes(voucher.tokenUri)),
                        keccak256(bytes(voucher.content))
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
}
