// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

error FundMe__NotOwner();

contract RunContract {
    // variables and events

    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 10 * 1e18;
    address public immutable i_owner;

    address[] public s_funders;

    mapping(address => uint256) public s_addressToAmountFunded;

    AggregatorV3Interface public s_priceFeed;

    uint256 transactionCount;

    Registration[] public registrations;

    struct Registration {
        address sender;
        address receiver;
        uint256 date;
        uint256 sum;
    }

    event RegistrationEvent(
        address indexed sender,
        address indexed receiver,
        uint256 date,
        uint256 sum
    );

    constructor(address priceFeedAdd) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAdd);
    }

    // add money to contract and account
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "Din't sent enough!"
        );
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return s_addressToAmountFunded[msg.sender];
    }

    function buy(address sender, uint256 date, uint256 sum) public {
        require(
            s_addressToAmountFunded[msg.sender] >= sum,
            "Insufficient balance"
        );

        Registration memory registration = Registration(
            sender,
            i_owner,
            date,
            sum
        );
        registrations.push(registration);
        s_addressToAmountFunded[msg.sender] -= sum;

        emit RegistrationEvent(sender, i_owner, date, sum);
    }

    function withdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function getMyTransactions() public view returns (Registration[] memory) {
        uint256 count = 0;

        // Count the number of transactions related to the user
        for (uint256 i = 0; i < registrations.length; i++) {
            Registration memory transaction = registrations[i];
            if (
                transaction.sender == msg.sender ||
                transaction.receiver == msg.sender
            ) {
                count++;
            }
        }

        // Create a new array to store the user's transactions
        Registration[] memory userTransactions = new Registration[](count);
        uint256 index = 0;

        // Populate the userTransactions array with the user's transactions
        for (uint256 i = 0; i < registrations.length; i++) {
            Registration memory transaction = registrations[i];
            if (
                transaction.sender == msg.sender ||
                transaction.receiver == msg.sender
            ) {
                userTransactions[index] = transaction;
                index++;
            }
        }

        return userTransactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    modifier onlyOwner() {
        if (msg.sender == i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    // functions
}
