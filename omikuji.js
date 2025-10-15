export default {
    async fetch(request) {
        var url = new URL(request.url)
        var usersParam = url.searchParams.get("users")
        var infoParam = url.searchParams.get("info")
        var returnText = ""
        var statusCode = 0
        if (infoParam = "") {
            returnText = "About this API\nThis API randomly generates and returns fortune slips. It is powered by Cloudflare Workers.\n\nHow to Specify the users Parameter\nSpecify one or more user names, separated by commas.\nFor example: ?users=AAA,BBB,CCC\nAn error will be displayed if the parameter is missing.\n\nSource Code\nAvailable on GitHub: https://github.com/Sotetsu11000/Omikuji-API\n\nVersion\n1.1\n\nTools Used\nCloudflare Workers (Pages), Microsoft Visual Studio\n\nAuthor\nSotetsu11000"
            statusCode = 200
        } else if (usersParam == null || usersParam == "") {
            returnText = "The parameter \"users\" is not specified. You can see more information by adding \"?info\" to the end of the URL."
            statusCode = 400
        } else {
            var users = usersParam.split(",")
            var omikujiList = ["大吉", "中吉", "小吉", "吉", "末吉", "凶"]
            users.forEach(user => {
                returnText += user + "さんの運勢は...　" + omikujiList[Math.floor(Math.random() * omikujiList.length)] + "です！\n\n"
            })
            statusCode = 200
        }
        return new Response(returnText, {
            status: statusCode,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store"
            }
        })
    }
}
