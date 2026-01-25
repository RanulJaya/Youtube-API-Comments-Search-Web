module.exports = function(option){
    
    function returnLink(element, urlString, index, ytUrl) {
            if(element == 'v'){
                for (let i = index + 2; i < ytUrl.length; i++) {
                    // console.log(test[i])
                    urlString += ytUrl[i]
                }
            }

            return urlString
    }
    
    return async function(req, res, next) {
        if (req.url == '/getURL') {
            console.log(option)
            const ytUrl = 'https://www.youtube.com/watch?v=0eaJqxB3SIk'

            let urlString = '';

            for (let index = 0; index < ytUrl.length; index++) {
                const element = ytUrl[index];
                var urlEncodedString = returnLink(element, urlString, index, ytUrl)

                if (urlEncodedString != '') {
                    break
                }
            }

            const url = 'https://axgj7aibzsvfw5rzsgd3vfkx6y0kuorg.lambda-url.us-east-1.on.aws/?api_key=' + urlEncodedString
            
            try {
                const response = await fetch(url)
                console.log(urlEncodedString)
                const result = await response.json()
                // res.send(Object.keys(result).length)
                res.send(result[0][0])
            } catch (error) {
                console.log(error)
            }
        }
        next()
    }
}