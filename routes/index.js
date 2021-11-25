// const url = require('url')
const url = require('url')
const router = require('express').Router()
const needle = require('needle')

const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env

router.get('/', (req, res) => {
  res.status(200).json({ success: true })
})

module.exports = router
