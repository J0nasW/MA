// API Reference and Information: https://github.com/iotaledger/iota.js

//import * as SingleNodeClient from '@iota/iota.js';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import CryptoJS from "crypto-js";

// Store Things
var store = require('store');

const { retrieveData, SingleNodeClient, Converter  } = require("@iota/iota.js");

const fetchIOTAChrysalis = async function() {

    try {
        var containerCount = store.get("count").count;
        var containerID = "container" + containerCount;
        // var myIndex = Converter.utf8ToBytes("logu_blockchain_explorer_v2");
        var topic = store.get(containerID).topic;
        var myIndex = Converter.utf8ToBytes(topic);
        var containerName = store.get(containerID).name;
        //var API_ENDPOINT = "https://chrysalis-nodes.iota.org";
        var API_ENDPOINT = store.get(containerID).protocol;
        var passphrase = store.get(containerID).passphrase;
        //var encryptor = new crypto(passphrase);
    } catch(e){
        alert("[fetchIOTA] Didn't found any container. Maybe initializing?");
    }

    const client = new SingleNodeClient(API_ENDPOINT);

    // const info = await client.info();
    // console.log("Node Info");
    // console.log("\tName:", info.name);
    // console.log("\tVersion:", info.version);
    // console.log("\tIs Healthy:", info.isHealthy);
    // console.log("\tNetwork Id:", info.networkId);
    // console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
    // console.log("\tConfirmed Milestone Index:", info.confirmedMilestoneIndex);
    // console.log("\tPruning Index:", info.pruningIndex);
    // console.log("\tFeatures:", info.features);
    // console.log("\tMin PoW Score:", info.minPoWScore);

    const found = await client.messagesFind(myIndex);
    let historyResult = [];
    let historyPayload = [];
    let h_payload = 0;
    let h_decrypted = 0;
    let h_data = 0;
    let maxResultsIOTA = 0;

    if (found && found.messageIds.length > 0) {
        console.log(`Found: ${found.count} of ${found.maxResults}`);
        maxResultsIOTA = found.count;

        // const firstResult = await retrieveData(client, found.messageIds[0]);
        // if (firstResult) {
        //     console.log("First Result");
        //     console.log("\tIndex: ",  Converter.bytesToUtf8(firstResult.index));
        //     console.log("\tData: ", firstResult.data ? Converter.bytesToUtf8(firstResult.data) : "None");
        // }

        for (var i = 0; i < maxResultsIOTA; i++) {
            try {
                historyResult[i] = await retrieveData(client, found.messageIds[i]);
                console.log("History Result Nr. " + i);
                console.log("\tIndex: ",  Converter.bytesToUtf8(historyResult[i].index));
                console.log("\tData: ", historyResult[i].data ? Converter.bytesToUtf8(historyResult[i].data) : "None");
            } catch(e) { alert("Error when fetching multiple results."); break;  }
        }

    } else {
        alert("Found no results. Maybe your device has not started yet?");
    }

    //const firstMessage = await retrieveData(client, found.messageIds[0])

    //const payload = JSON.stringify(Converter.bytesToUtf8(firstMessage.data))
    const payload = Converter.bytesToUtf8(historyResult[0].data).replace(/['"]+/g, '')
    console.log("payload of newest result", payload)

    // const decrypted = CryptoAES.decrypt(payload.toString(), passphrase).toString(CryptoENC.Utf8);
    const decrypted = CryptoAES.decrypt(payload, passphrase);
    const data = CryptoJS.enc.Utf8.stringify(decrypted);
    const data_JSON = JSON.parse(data);

    console.log("decrypted newest result", data_JSON)

    for (var i = 0; i < maxResultsIOTA; i++) {
        h_payload = Converter.bytesToUtf8(historyResult[i].data).replace(/['"]+/g, '');
        console.log("Payload of result nr. " + i, h_payload);
        h_decrypted = CryptoAES.decrypt(h_payload, passphrase);
        h_data = CryptoJS.enc.Utf8.stringify(h_decrypted);
        historyPayload[i] = JSON.parse(h_data);
    }

    store.set(containerID, { count:containerCount, name:containerName, topic:topic, protocol:API_ENDPOINT, payload:data_JSON, passphrase:passphrase, history:historyPayload})

    
}

export default fetchIOTAChrysalis;