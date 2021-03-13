const axios = require('axios')
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
    const domain = await getDomain()
    const email = `${generateRandomString(5)}@${domain}`
    const payload = {"address":email,"password":"T]GbI7Cg"}
    const config = {
        method: 'post',
        url: 'https://api.mail.tm/accounts',
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

    const quota = data['quota']

    if (quota !== 40000000) console.log({response})
    return email
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

    const authToken = await getAuthToken(email)

    const config = {
        method: 'get',
        url: 'https://api.mail.tm/messages',
        headers: {
            'authority': 'api.mail.tm',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'accept': 'application/json, text/plain, */*',
            'authorization': `Bearer ${authToken}`,
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36',
            'origin': 'https://mail.tm',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://mail.tm/',
            'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': '"6aa02b03f016f34d6ebdec1791b45854"'
        }
    };

    const response = await axios(config)

    const data = response.data

    return {authToken, messageID: data['hydra:member']}

}
const getMessageContent = async (authToken, messageId) => {

    const config = {
        method: 'get',
        url: `https://api.mail.tm/messages/${messageId}`,
        headers: {
            'authority': 'api.mail.tm',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'accept': 'application/json, text/plain, */*',
            'authorization': `Bearer ${authToken}`,
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            'origin': 'https://mail.tm',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://mail.tm/',
            'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    };

    const response = await axios(config)

    const data = response.data

    return data.html
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
