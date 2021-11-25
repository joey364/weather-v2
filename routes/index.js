// const url = require('url')
const url = require('url')
const router = require('express').Router()
const needle = require('needle')

const { OPENWEATHER_BASE_URL, OPENWEATHER_KEY_NAME, OPENWEATHER_KEY_VALUE } = process.env

router.get('/', (req, res) => {
  res.status(200).json({ success: true })
})

module.exports = router
