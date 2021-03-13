const {getRandomMail, getMessage} = require('./services/stopspam')

setImmediate(async () => {
    // const domain = await getRandomMail()
    // console.log({domain})

    const email = 'jennica.dyann@hfa2.xyz'

    const message = await getMessage(email)
    console.log({message})
})
