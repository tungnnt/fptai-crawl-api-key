const axios = require('axios')

module.exports = async (url) => {
    const config = {
        method: 'get',
        url: url,
        headers: {
            'authority': 'id.fpt.ai',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
            'cookie': '_ga=GA1.2.2128955927.1601601274; au_aid=11748449894; au_gt=1601576073; _ants_services=%5B%22tags%22%2C%22cuid%22%5D; csrftoken=UZsoNibXlzZPQnoxAoGVqfq7Emwl3hK12V8WCLeaObWqJB9SWXOO56tivvCQrYCm; _gid=GA1.2.1547871798.1602545295; _pk_ref.594751209.5804=%5B%22%22%2C%22%22%2C1602545295%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_id.594751209.5804=e3eaab7f583a9062.1601601274.2.1602545295.1602545295.; an_session=zgzmzlzqzkzhzqzdzizizkznzrznznzqzrzqznzdzizlzjzhzmzhzjzjzqzmzdzizdzizlzjzhzmzhzjzjzqzmzdzizlzjzhzmzhzjzjzqzmzdzizdzhznzdzhzd2f27zdzjzdzlzmzmznzq; dgs=1602520095%3A3%3A0; op_browser_state=dbb433e577f452c042dbc102be371ae6fb3cca99c1428eb836697562; csrftoken=UZsoNibXlzZPQnoxAoGVqfq7Emwl3hK12V8WCLeaObWqJB9SWXOO56tivvCQrYCm; op_browser_state=7712baa7cec42c158daeaddc5ad821fdbd5ea7993f414638a34c2a9e'
        }
    }

    return new Promise(async (resolve, reject) => {
        await axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                console.log(error)
                return reject(error)
            });
    })


}