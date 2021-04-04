import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    'INSERT FACTORY CONTRACT ADDRESS HERE'  
);
instance.setProvider(web3.currentProvider);
export default instance;


    