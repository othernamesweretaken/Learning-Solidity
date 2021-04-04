import Web3 from 'web3';

let web3 = new Web3();
let provider;

if(typeof window !=='undefined' && typeof window.web3 !== 'undefined'){
   //We are on the browser and metamask is running
    console.log("Found it");
   provider = new Web3(window.web3.currentProvider);
}
else{
    //We get the web3 from the infura link 
    //user is not running metamask
    console.log("window not found");
    provider = new Web3.providers.HttpProvider('INSERT INFURA RINKEBY LINK HERE!');
    
}
web3.setProvider(provider);


export default web3;
