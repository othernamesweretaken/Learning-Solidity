const assert = require('assert');

const ganache = require('ganache-cli');

const {interface, bytecode} = require('../compile');
console.log(interface);
const Web3 = require('web3'); // works as constructors

const truffleWallet = require('@truffle/hdwallet-provider');
const provider2 = new truffleWallet(
    'MNEMONICS',
    'INFURA RINKEBY LINK HERE'

);

const web32 = new Web3(provider2);


const provider = ganache.provider();
const web3 = new Web3(provider); // Provider acts as a middlemen to send and receive to the network. Ganache is the local network 
const contract2 = new web32.eth.Contract(JSON.parse(interface), '0xbD6b9DD179C1acc055e41778201bdb08bE5054d8');
contract2.setProvider(provider2);

// Async and Await ---------------------------------------------------------------------------------------------------------
let accounts;
let inbox;
beforeEach(async ()=>{
    account2 = await web32.eth.getAccounts();
    
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: ['Hi There!'] })
    .send({ from: accounts[0], gas:'1000000'});
    inbox.setProvider(provider);
});

describe('Inbox', ()=>{
    // it('deploys a contract',()=>{
    //     console.log("Accounts available");
    //     console.log(accounts);
    //     console.log(inbox);
    //     assert.ok(inbox.options.address);
    // });

    // it('Contract has a message', async () => {
    //     const message = await inbox.methods.message.call();
    //     console.log(message);
    //     assert.equal(message,'Hi There!');
    // });

    it('Contract can update', async () => {
        const message = await inbox.methods.setMessage('bye').send({ from: accounts[0]});
        console.log(message);
        assert.ok(message);

    });

    it('Contract can connect with Rinkeby', async () => {
        console.log(account2);
        
        const message = await contract2.methods.message().call();
        //const message = await contract2.methods.setMessage('Entering this world/').send({ from: account2[0]});
        console.log(message);
        assert.ok(message);

    })

});



// // Fetching accounts from ganache-------Begin ------------------------------------------------------------------

// beforeEach(()=>{
//     web3.eth.getAccounts()
//     .then(fetchedAccounts =>{
//         console.log(fetchedAccounts);
        
//     });
// });

// describe('Inbox', ()=>{
//     it('deploys a contract',()=>{});
// });

// // Fetching accounts from ganache-------End ------------------------------------------------------------------------


// // Mocha test example -------------------------------------------------------------------------------------------

// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }

// }
// let car;
// // Mocha test , before each functions runs before each test 
// beforeEach(()=>{
//     console.log('a');
//     car = new Car();
// });
// describe('Car1',() => {

//     it('can park', () =>{
//         assert.equal(car.park(),'stopped');
//     }); 

//     it('can drive', ()=>{

//         assert.equal(car.drive(), "vroom");
//     });
// });

// // Mocha test example end ----------------------------------------------------------------