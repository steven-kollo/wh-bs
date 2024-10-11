const UTM_KEYS = [
    "responsible",
    "product",
    "page"
]
const axios = require('axios')
const express = require('express')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/test', (req,res) => {
    console.log("-----")
    // last tag will be the utm (or not?)
    console.log(req.body.vk_id)
    console.log(req.body.tags_arr.slice(-1)[0])
    getBlueSalesId(req.body.vk_id)
    res.send("works!")
})
const BLUESALES_API = {
    login: "kolodiazhnyi.stepan@hd-school.ru",
    pass: "12345678"
}

function getBlueSalesId(vk_id) {
    const vkIds = {"vkIds": [Number(vk_id)]}
    axios.post(`https://bluesales.ru/app/Customers/WebServer.aspx?login=${BLUESALES_API.login}&password=${BLUESALES_API.pass}&command=customers.get`, vkIds)
    .then((res) => {
        console.log(`BlueSales ID: ${res.data.customers[0].id}`)
        updateBlueSalesSource(res.data.customers[0].id)
    }).catch((err) => {
        console.error(err)
    })
}

function updateBlueSalesSource(id) {
    const update = {"id": id, "source": {"id": "141082", "name": "test_source"}}
    axios.post(`https://bluesales.ru/app/Customers/WebServer.aspx?login=${BLUESALES_API.login}&password=${BLUESALES_API.pass}&command=customers.update`, update)
        .then((res) => {
            console.log(`Status: ${res.status}`)
            console.log('Body: ', res.data)
        }).catch((err) => {
            console.error(err)
        })
}

// parseCampaignUtm('cluster%7Ctest__hypothesis%7Ctest__pipeline%7Cchat__responsible%7Ctest__product%7Ctest__page%7Ctest')

// function parseCampaignUtm(utm) {
//     utm.split("%7C").forEach(el => {
//         // if (el.indexOf())
//     })
// }

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log("RUNS!")
})