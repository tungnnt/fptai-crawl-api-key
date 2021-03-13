const axios = require('axios')
const FormData = require('form-data');

const getDomain = async () => {
    const config = {
        method: 'get',
        url: 'https://api.mail.tm/domains',
        headers: {
            'authority': 'api.mail.tm',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'accept': 'application/json, text/plain, */*',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36',
            'origin': 'https://mail.tm',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://mail.tm/',
            'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': '"cd2a8ca2d106482a29ecde23288d4618"'
        }
    };

    const response = await axios(config)

    const data = response.data

    const hydraMember = data['hydra:member']
    return hydraMember[0].domain
}

const generateRandomString = (length) => {
    let result = '';
    let characters = 'zxcvbnmasdfghjklqwertyuiop0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getRandomMail = async () => {
    const config = {
        method: 'post',
        url: 'https://app.stopspam.app/api/v2/getRandomBox',
        headers: {
            'token': '86190a00-8412-11eb-b700-0242ac140007',
            'Cookie': '__cfduid=de566cdac735a763f77b5736bd73886aa1615650932',
        },
    };

    const response = await axios(config)

    const data = response.data

    return data.random_mail
}

const getAuthToken = async (email) => {
    const payload = {"address":email,"password":"T]GbI7Cg"}
    const config = {
        method: 'post',
        url: 'https://api.mail.tm/token',
        headers: {
            'authority': 'api.mail.tm',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'accept': 'application/json, text/plain, */*',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36',
            'content-type': 'application/json;charset=UTF-8',
            'origin': 'https://mail.tm',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://mail.tm/',
            'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        data : payload
    };

    const response = await axios(config)

    const data = response.data

    return data.token
}

const getMessage = async (email) => {

    let payload = new FormData();
    payload.append('inbox', email);

    const config = {
        method: 'post',
        url: 'https://app.stopspam.app/api/v2/getMessages',
        headers: {
            'token': '86190a00-8412-11eb-b700-0242ac140007',
            'Cookie': '__cfduid=de566cdac735a763f77b5736bd73886aa1615650932',
            ...payload.getHeaders()
        },
        data : payload
    };

    const response = await axios(config)

    const data = response.data

    return data.mail

}
const getMessageContent = async (messageId) => {

    let payload = new FormData();
    payload.append('id', messageId);
    const config = {
        method: 'post',
        url: 'https://app.stopspam.app/api/v2/readMessage',
        headers: {
            'token': '86190a00-8412-11eb-b700-0242ac140007',
            'Cookie': '__cfduid=de566cdac735a763f77b5736bd73886aa1615650932',
            ...payload.getHeaders()
        },
        data : payload
    };

    const response = await axios(config)

    const data = response.data

    return data.HTMLBody
}


const parseActivateLink = (message) => {
    let link = message.toString().match(/https:\/\/id.fpt.ai\/[0-9,a-z,A-Z,\/,-]*\/[?,0-9,a-z,A-Z,=,%,_,.]*/)
    return link[0]
}
module.exports = {
    getDomain,
    getRandomMail,
    getMessage,
    getMessageContent,
    parseActivateLink,
    generateRandomString
}
