pragma solidity ^0.4.17;
contract Jainil{
    string public message;
    
    function Inbox(string InitialMessage) public{
        message = InitialMessage;
        
    }   
    function setMessage(string Message) public returns(string){
        
        message = Message;
        return message;
    }
    
    function  getMessage() public view returns (string){
        return message;
        
    }
}