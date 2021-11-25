// const url = require('url')
const url = require('url')
const router = require('express').Router()
const needle = require('needle')

const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env

router.get('/', async (req, res, next) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [API_KEY_NAME]: API_KEY_VALUE,
      units: 'metric'
    })

    const requestUrl = `${API_BASE_URL}?${params}`

    const apiRes = await needle('get', requestUrl)
    const data = apiRes.body

    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
