const {
    getRandomMail,
    getMessage,
    getMessageContent,
    parseActivateLink,
    generateRandomString,
} = require('./services/mailtm')
const signup = require('./api/signup')
const activateAccount = require('./api/activateAccount')
const fs = require('fs')
const puppeteer = require('puppeteer')

const _delay = async (time) => {
    await new Promise(resolve => { setTimeout(resolve, time) })
}

_parseAPIKey = (string) => {
    return string.match(/: [0-9,a-z,A-z]*/)[0].split(' ')[1]
}

setImmediate(async () => {
    while (true) {
        try {
            const email = await getRandomMail()
            console.log({email})

            await signup(email)

            let newMail = ''
            let dontHaveMail = true
            let timeout = 0
            let authMail = ''
            while (dontHaveMail) {
                let {authToken, messageID} = await getMessage(email)
                console.log({isCheckingMail: true})
                if (Array.isArray(messageID) && messageID.length > 0) {
                    dontHaveMail = false
                    newMail = messageID[0]
                    authMail = authToken
                }
                await new Promise((resolve) => { setTimeout(resolve, 1000) })
                timeout += 1000
            }

            const content = await getMessageContent(authMail, newMail.id)

            // const { body_text } = newMail[newMail.length - 1]
            const url = parseActivateLink(content)

            console.log({ url })
            let response = await activateAccount(url)
            if (!response || (response && !/Thank you for your email confirmation./.test(response)))
                throw new Error('FPT.AI verify email phase failed.')

            const browser = await puppeteer.launch({
                headless: true,
                ignoreHTTPSErrors: true,
                defaultViewport: null,
                slowMo: 100,
                args: ['--no-sandbox', '--disable-setuid-sandbox', 'headless', `--window-size=1600,900`]
            })

            const page = await browser.newPage()
            await page.goto('https://id.fpt.ai/accounts/signin/?next=/authorize%3Fclient_id%3D931739%26redirect_uri%3Dhttps%3A//console.fpt.ai/home%26state%3Dhttps%3A//console.fpt.ai/%26response_type%3Dcode%26scope%3Dopenid%2Bprofile%2Bemail%2Bphone')
            await page.focus('#id_username')
            await page.keyboard.type(email)
            await page.focus('#id_password')
            await page.keyboard.type('Pa55w0rds')
            await page.click('body > div > div > div > div.col-lg-6.col-sm-12.d-flex.flex-column.right > div.container.d-flex.flex-column.justify-content-center.flex-fill > form > div.d-flex.justify-content-center.my-4.mb-2 > div > button')
            await _delay(5000)
            await page.mouse.click(100, 100)
            await page.click('#app > div.application--wrap > div.main-container > main > div > div > div.content-container > div.bottom > div:nth-child(1) > div > div > div:nth-child(3) > div')
            await _delay(1000)
            await page.click('#app > div.application--wrap > div.main-container > main > div > div > div > div:nth-child(2) > div.flex.grow > h1 > button')
            await _delay(1000)
            await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button.v-btn.theme--light.primary')
            await _delay(1000)
            await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.pa-3.pb-5 > form > div.v-input.v-text-field.theme--light > div > div.v-input__slot')
            await page.keyboard.type('KYC')
            await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button:nth-child(2)')
            await _delay(1000)
            await page.focus('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.container.pa-3.grid-list-md > form > div > div > div.v-input__slot > div > input[type=text]')
            await page.keyboard.type(generateRandomString(8))
            await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button.v-btn.v-btn--flat.theme--light.warning--text.text--darken-1')
            await _delay(1000)
            const element = await page.$("#app > div.application--wrap > div.main-container > main > div > div > div > div.v-tabs > div.v-window > div > div:nth-child(2) > div > div:nth-child(2) > code");
            const curlString = await page.evaluate(element => element.textContent, element)
            await _delay(1000)
            await browser.close()
            const apiKey = _parseAPIKey(curlString)
            if (!apiKey)
                throw new Error('API Key not found.')
            console.log({apiKey})
            fs.appendFile('./accounts.txt', apiKey + '\n', () => { })
        } catch (error) {
            console.log(error)
        }
    }
})
