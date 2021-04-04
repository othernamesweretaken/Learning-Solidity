const assert = require('assert');

const ganache = require('ganache-cli');

const {interface, bytecode} = require('../compile');
//console.log(interface);
const Web3 = require('web3'); // works as constructors

const truffleWallet = require('@truffle/hdwallet-provider');
const provider2 = new truffleWallet(
    'mnemonics',
    'Infura API KEY'

);

const web32 = new Web3(provider2);


const provider = ganache.provider();

const web3 = new Web3(provider); // Provider acts as a middlemen to send and receive to the network. Ganache is the local network 
const contract2 = new web32.eth.Contract(JSON.parse(interface), '0xbD6b9DD179C1acc055e41778201bdb08bE5054d8');
contract2.setProvider(provider2);

// Async and Await ---------------------------------------------------------------------------------------------------------
let accounts;
let lottery;
beforeEach(async ()=>{
    account2 = await web32.eth.getAccounts();
    
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode })
    .send({ from: accounts[0], gas:'1000000'});
    lottery.setProvider(provider);
});

describe('Lottery', ()=>{
    it('deploys a contract',()=>{
        console.log("Accounts available");
        console.log(accounts);
        console.log(lottery);
        assert.ok(lottery.options.address);
    });

    it('Contract has a manager', async () => {
        const message = await lottery.methods.manager.call();
        console.log(message);
        assert.ok(message);
    });

    it('Allows one account to enter', async()=>{
        await lottery.methods.entry().send({
            from: accounts[0],
            value: web3.utils.toWei('0.2','ether')
        }); 
        const players = await lottery.methods.getPlayers().call();
        assert.equal(accounts[0],players[0]);
        assert.equal(1,players.length);

    });

    it('Allows multiple accounts to enter', async () =>{
        await lottery.methods.entry().send({
            from: accounts[0],
            value: web3.utils.toWei('0.2','ether')
        }); 
        await lottery.methods.entry().send({
            from: accounts[1],
            value: web3.utils.toWei('0.2','ether')
        }); 
        await lottery.methods.entry().send({
            from: accounts[2],
            value: web3.utils.toWei('0.2','ether')
        }); 
        const players = await lottery.methods.getPlayers().call();
        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
        assert.equal(3,players.length);

    });

    it('Requires a minimum amount to enter', async ()=> {
        try{
            await lottery.methods.entry().send({
                from: accounts[0],
                value: web3.utils.toWei('0.01','ether')
            });
            assert(false);
        }
        catch(err){
            assert(err);
        }

    });

    it('Only mananger can pickWinner', async()=>{
        try{
            await lottery.methods.pickWinner().send({
                from: accounts[2]
            }); 
            assert(false);
        }
        catch(err){
            assert(err);
        }
        const balance = lottery.methods.getBalance().call();
        assert.notStrictEqual(0,balance);
        
    });

    it('Sends money to the winner and resets the player array ', async() =>{
        await lottery.methods.entry().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
         
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;
        console.log(difference);
        assert(difference > web3.utils.toWei('1.9','ether'));
    });
    });

// Connection with rinkeby, 
// Truffle wallet can only connect witht the first account of the metamask for now. 


    // it('Contract can connect with Rinkeby', async () => {
    //     console.log(account2);
        
    //     const message = await contract2.methods.message().call();
    //     //const message = await contract2.methods.setMessage('Entering this world/').send({ from: account2[0]});
    //     console.log(message);
    //     assert.ok(message);

    // })




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