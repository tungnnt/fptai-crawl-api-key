const {getDomain} = require('./services/mailtm')

setImmediate(async () => {
    const domain = await getDomain()
    console.log({domain})
})
