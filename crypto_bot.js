const Discord = require("discord.js");
const client = new Discord.Client();
const pre = "*"

data = "";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = new XMLHttpRequest();

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

client.on("ready", () =>{
    console.log("Crypto Bot is ready!")
});

client.on("message", msg =>{
    const args = msg.content.slice(pre.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    //cryptoprice() is a function that uses cryptonater's api to fetch the crypto price of a specified coin
    function cryptoprice(coin){
        let url = "https://api.cryptonator.com/api/ticker/" + coin + "-usd";
        request.open("GET", url, true);
        request.send();
        request.onload = function(){
            let data = request.responseText;
            let parsed = JSON.parse(data);
            if (parsed.success === false){
                return msg.reply("That isn't a crypto currency...");
            };
            let price = parsed.ticker.price;
            let splitted = price.split(".")
            if (splitted[0] > 1){
                let finalPrice = round(price, 2);
                return msg.reply("The current price of " + coin.toUpperCase() + " in USD is:" + " $" + finalPrice)
            };
            msg.reply("The current price of " + coin.toUpperCase() + " in USD is:" + " $" + price)
        };
    };
    if (!msg.content.startsWith(pre)){
        return;
    };
    //crypto is the a command that calls cryptoprice() with a crypto that doesnt have its own command
    if (command === "crypto"){
        let arg = args.join()
        if (arg === "help"){
            return msg.reply("To use this command, you need to specify the 3-4 call letters of a crypto currency. For example the usage for bitcoin would be `*crypto btc` or the usage for etherium would be `*crypto eth`.");
        }
        else if (arg === "list"){
            return msg.reply("list of cryptocurrencies");
        }
        else if (arg.length < 1){
            return msg.reply("You need to specify a crypto currency!");
        };
        cryptoprice(arg)
    };
    //these use cryptoprice() to find the price of popular coins
    if (command === "btc" || command === "bitcoin"){
        cryptoprice("btc");
    };
    if (command === "eth" || command === "ethereum"){
        cryptoprice("eth");
    };
    if (command === "xmr" || command === "monero"){
        cryptoprice("xmr");
    };
    if (command === "xrp"){
        cryptoprice("xrp");
    };
    if (command === "ltc" || command === "litecoin"){
        cryptoprice("ltc");
    };
    if (command === "bch" || command === "bitcoincash"){
        cryptoprice("bch");
    };
    if (command === "eos"){
        cryptoprice("eos");
    };
    if (command === "xlm" || command === "lumens" || command === "stellar" || command === "stellarlumens"){
        cryptoprice("xlm");
    };
    if (command === "link" || command === "chainlink"){
        cryptoprice("link");
    };
    if (command === "zec" || command === "zcash"){
        cryptoprice("zec");
    };
    if (command === "doge" || command === "dogecoin"){
        cryptoprice("doge");
    };
});

client.login("YOUR_TOKEN_HERE")