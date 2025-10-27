export default {
    async fetch(request) {
        const version = "1.3"
        const author = "Sotetsu11000"
        function generateOmikuji(users, type) {
            var omikujiList = ["大吉", "中吉", "小吉", "吉", "末吉", "凶"]
            var message = {
                "大吉": [
                    " 今週は全てが順調に進みそうです。心配ごとは少なめです！",
                    "あなたの努力が実を結ぶ1週間になるでしょう。",
                    "すばらしい運気に恵まれ、良いことがたくさん起こりそうです！",
                    " 幸運の波がやってきます。迷わず前進してください。",
                    "思い切った行動が吉と出ます。自信を持って挑戦しましょう。",
                    "何事もうまく運び、笑顔の絶えない週になるでしょう。"
                ],
                "中吉": [
                    "順調な1週間ですが、油断は禁物です。慎重に進めましょう。",
                    "小さな幸運が積み重なり、充実した週になりそうです。",
                    "人とのご縁が運気を後押ししてくれるでしょう。",
                    "計画通りに物事が進む1週間ですが、時には柔軟な対応を。",
                    "努力が認められる出来事がありそうです。",
                    "安定した運勢です。無理をせず、日々を大切に過ごしましょう。"
                ],
                "小吉": [
                    "小さな喜びが見つかる1週間になりそうです。",
                    "あせらず、少しずつ前進することが大切です。",
                    "些細な出来事で運気が変わるかもしれません。注意深く過ごしましょう。",
                    "努力は報われますが、結果はゆっくりやってきそうです。",
                    "無理せず、マイペースで進めることが吉です。",
                    "小さな成功を喜び、次につなげる1週間にしましょう。"
                ],
                "吉": [

                    "普通の運気ですが、行動次第で良いことも悪いことも。",
                    "調子に乗らず、慎重に進めると良い週になります。",
                    "日常の中に小さなチャンスがありそうです。見逃さないで。",
                    "平穏な週ですが、油断せず心を落ち着けて過ごしましょう。",
                    "周囲の助けを借りると良い結果が得られます。",
                    "穏やかな気持ちで物事に向き合うと運気が安定します。"
                ],
                "末吉": [
                    "あまり無理をせず、控えめに過ごすことが吉です。",
                    "小さなトラブルに注意が必要な週になりそうです。",
                    "慎重な行動が安全です。焦らず進めましょう。",
                    "調子はあまり良くないかもしれませんが、焦らず耐える週です。",
                    "注意深く過ごすことで、悪いことを避けられます。",
                    "予定を詰め込みすぎないように心掛けると吉です。"
                ],
                "凶": [
                    "注意が必要な1週間です。無理せず慎重に行動しましょう。",
                    "予期せぬトラブルがあるかもしれません。落ち着いて対処してください。",
                    "焦りは禁物です。じっくり考えて行動しましょう。",
                    "失敗から学ぶことが多い週になりそうです。",
                    "過信せず、周囲の意見を参考にすることが大切です。",
                    "健康や体調に気を配ると、災難を避けられます。"
                ]
            }
            var luckyColor = ["赤", "青", "黄", "緑", "紫", "オレンジ", "ピンク", "水色", "白", "黒", "灰色", "茶色", "金色", "銀色", "紺"]
            var returnText = ""
            switch (type) {
                case "text":
                    users.forEach(user => {
                        var result = omikujiList[Math.floor(Math.random() * omikujiList.length)]
                        returnText += user + "さんの運勢は...　" + result + "です" + (result == "凶" ? "..." : "!") + "　" + message[result][Math.floor(Math.random() * 6)] + "　ラッキーカラーは" + luckyColor[Math.floor(Math.random() * luckyColor.length)] + "！\n\n"
                    })
                    break
                case "json":
                    var returnData = {
                        meta: {
                            version: version,
                            author: author,
                            lang: "ja"
                        },
                        results: []
                    }
                    users.forEach(user => {
                        var result = omikujiList[Math.floor(Math.random() * omikujiList.length)]
                        returnData.results.push({
                            name: user,
                            fortune: result,
                            message: message[result][Math.floor(Math.random() * 6)],
                            luckyColor: luckyColor[Math.floor(Math.random() * luckyColor.length)]
                        })
                    })
                    returnText = JSON.stringify(returnData)
                    break
            }
            return returnText
        }
        switch (request.method) {
            case "GET":
                var url = new URL(request.url)
                var usersParam = url.searchParams.get("users")
                var type = url.searchParams.get("type")
                var lang = url.searchParams.get("lang")
                if (type == null) {
                    type = "text"
                } else if (type.toLowerCase() == "json") {
                    type = "json"
                } else {
                    type = "text"
                }
                /*
                if (lang == null) {
                    lang = "ja"
                } else if (type.toLowerCase() == "en") {
                    type = "en"
                } else {
                    type = "ja"
                }

                今後、英語対応いたします。
                */
                var returnText = ""
                var statusCode = 0
                if (usersParam == null || usersParam == "") {
                    returnText = "The parameter \"users\" is not specified. You can check detailed information by visiting https://github.com/Sotetsu11000/Omikuji-API"
                    statusCode = 400
                } else {
                    returnText = generateOmikuji(usersParam.split(","), type)
                    statusCode = 200
                }
                return new Response(returnText, {
                    status: statusCode,
                    headers: {
                        "Content-Type": type == "json" ? "application/json" : "text/plain; charset=utf-8",
                        "Cache-Control": "no-store",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type"
                    }
                })
                break
            case "POST":
                var body = await request.json()
                var users = body.users
                var type = body.type
                // var lang = body.lang
                if (type == null) {
                    type = "text"
                } else if (type.toLowerCase() == "json") {
                    type = "json"
                } else {
                    type = "text"
                }
                var returnText = ""
                var statusCode = 0
                if (!users || !Array.isArray(users) || users.length == 0) {
                    returnText = "The parameter \"users\" is not a valid value. Please specify the parameter as an \"Array\"."
                    statusCode = 400
                } else {
                    returnText = generateOmikuji(users, type)
                }
                return new Response(returnText, {
                    status: statusCode,
                    headers: {
                        "Content-Type": type == "json" ? "application/json" : "text/plain; charset=utf-8",
                        "Cache-Control": "no-store",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type"
                    }
                })
                break
            default:
                return new Response("Method not supported", {
                    status: 405,
                    headers: {
                        "Content-Type": "text/plain; charset=utf-8"
                    }
                })
                break
        }
    }
}
