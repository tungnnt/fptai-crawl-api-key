const axios = require("axios");

const mailDomains = ['inbox-me.top', 'inscriptio.in', 'cloud-mail.top', 'montokop.pw', 'privacy-mail.top', 'safemail.icu', 'myinbox.icu', 'just4fun.me']

const generateRandomString = (length) => {
    let result = '';
    let characters = 'zxcvbnmasdfghjklqwertyuiop0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max);
}

const randomMail = (userName) => {
    return `${userName}@${mailDomains[generateRandomInteger(mailDomains.length)]}`;
}

const recoverMail = (mail) => {
    let headers = {
        'authority': 'api.internal.temp-mail.io',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://temp-mail.io',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://temp-mail.io/en',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let data = {
        "name": mail.split('@')[0],
        "domain": mail.split('@')[1],
    };

    let api = 'https://api.internal.temp-mail.io/api/v3/email/new';

    return new Promise((resolve, reject) => {
        axios.post(api, data, { headers: headers })
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getRandomMail = () => {
    let newMail = randomMail(generateRandomString(12));

    let headers = {
        'authority': 'api.internal.temp-mail.io',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://temp-mail.io',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://temp-mail.io/en',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let data = {
        "name": newMail.split('@')[0],
        "domain": newMail.split('@')[1],
    };

    let api = 'https://api.internal.temp-mail.io/api/v3/email/new';

    return new Promise((resolve, reject) => {
        axios.post(api, data, { headers: headers })
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getMessage = (mail) => {
    let headers = {
        'authority': 'api.internal.temp-mail.io',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'origin': 'https://temp-mail.io',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://temp-mail.io/en',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let api = `https://api.internal.temp-mail.io/api/v3/email/${mail}/messages`

    return new Promise((resolve, reject) => {
        axios.get(api, { headers: headers })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

const parseOTP = (message) => {
    let otp = message.match(/[0-9]{6}/g);
    return otp[0];
}

const parseActivateLink = (message) => {
    let link = message.match(/https:\/\/id.fpt.ai\/[0-9,a-z,A-Z,\/,-]*\/[?,0-9,a-z,A-Z,=,%,_,.]*/)
    return link[0]
}

module.exports = {
    getRandomMail,
    getMessage,
    parseOTP,
    recoverMail,
    parseActivateLink,
    generateRandomString,
}
