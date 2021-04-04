pragma solidity ^0.4.17;
contract Lottery{
    address public manager;
    address[] public players;

    function Lottery() public{
        manager = msg.sender;
    }
    function entry() public payable {
        //require works like a if statement. 
        //But if require condition is false, function terminates right there. 
        //lines below are not read. Works like if() else{return}
        //require(msg.value > 100000000000000000);
        //msg is a global variable, where the transaction sender and value can read/
        //Here if the value is less than 0.1 ether, the player cannot enter the lottery.
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }
    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, players));
        //sha3 is same instance of keccak256
        //return uint(sha3(block.difficulty,now,players));
    }

    function pickWinner() public {
        
        //Nobody other than mananger can call this pick winner. 
        require(msg.sender == manager);

        uint index = random() % players.length;
       
        // // Transferring 1 ether to the winner.
        //players[index].transfer(1);

        //Transferring all the ethers to the winner. 
        //Balance is by default
        players[index].transfer(this.balance);

        //Resetting contract players/
        players = new address[](0);
        
        // // Resetting contract players with 5 zero addresses
        //players = new address[](5);

    }
    //A new function modifiers. Solely used to reduce the amount of code we write.
    //Behind the scene, the modifiers code willbe used before the function call. 
    //"_;" tells the modiefier to get the function statements 
    modifier restrictedForManager() {
        require(msg.sender == manager);
        _;
    }

    function getBalance2() public view restrictedForManager returns(uint) {
       //Balance is uint by default.
        return this.balance;

    //Internally modifiers here works this way 
    /* 
    function getBalance() public view restrictedForManager returns(int) {
        require(msg.sender == manager);
        return this.balance;
    }
    */
    }   
    function getPlayers() public view returns(address[])
    {
        return players;
    }


}