module.exports = function(option){
    return async function(req, res, next) {
        if (req.url == '/getURL') {
            res.send("test")
            const test = 'https://www.youtube.com/watch?v=0eaJqxB3SIk'

            let urlString = '';

            for (let index = 0; index < test.length; index++) {
                const element = test[index];

                if(element == 'v'){
                    for (let i = index + 2; i < test.length; i++) {
                        // console.log(test[i])
                        urlString += test[i]
                    }

                    break;
                }
            }

            const url = 'https://axgj7aibzsvfw5rzsgd3vfkx6y0kuorg.lambda-url.us-east-1.on.aws/?api_key=' + urlString

            try {
                const response = await fetch(url)
                const result = await response.json()
                console.log(Object.keys(result).length)
            } catch (error) {
                console.log(error)
            }
        }
        next()
    }
}