const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");

const app = express();

var port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.post("/", (req, resp) => {
    console.log(req.body)

    if (req.body.queryResult.intent.displayName == "GetWeatherInfoIntent") {
        // Handler for GetWeatherInfoIntent intent

        let location = req.body.queryResult.parameters.location
        let url = `http://api.openweathermap.org/data/2.5/weather?APPID=8a81d247d650cb16469c4ba3ceb7d265&q=${location}`

        //  make api call
        // once u got response , set the response text and send the reps back to api.ai


        return new Promise((resolve, reject) => {
            request(url, function (error, response, body) {
                if (error) {
                    reject()
                    return
                }

                body = JSON.parse(body)
                console.log(typeof body)
                console.log(typeof body.cod)
                console.log(body.cod == 200, body.cod === 200)

                console.log(body)
                if (body.cod == 200) {
                    response_text = ` Currently in ${location}, its ${body.weather[0].description}`
                    console.log(response_text)
                    resp.json({ "fulfillmentText": response_text })
                } else {
                    response_text = "Unable to find the city name."
                    resp.json({ "fulfillmentText": response_text })
                }

                resolve()


            });

        });

    } else {
        resp.json({ "fulfillmentText": "Unable to find a matching Intent" })
    }


})


app.listen(port, (data) => {
    console.log(`APP is running on ${port}`);
});