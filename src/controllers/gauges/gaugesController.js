const router = require('express').Router()
require('dotenv').config()
const axios = require('axios')
const Gauges = require('../../models/Gauges')
const Connections = require('../../models/Connections')
const Users = require('../../models/Users')
const chalk = require('chalk')
const protectedRoute = require('../../middleware/protectedRoute')
const jwt = require('jsonwebtoken')
router.use(protectedRoute())

/* ---------------------------- Route Controllers --------------------------- */

// GET /gauges/
router.get('/', async (req, res) => {
  const url = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${NC_SITES}&siteType=ST&variable=00060`
  try {
    const { data } = await axios.get(url)
    let returnArr = []
    data.value.timeSeries.forEach(async item => {
      const shapedData = {
        siteName: item.sourceInfo.siteName,
        siteCode: item.sourceInfo.siteCode[0].value,
        geoLocation: {
          latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
          longitude: item.sourceInfo.geoLocation.geogLocation.longitude
        }
      }
      returnArr.push(shapedData)
      save(shapedData)
    })
    res.status(200).json(returnArr)
  } catch (err) {
    console.log(chalk.default(err))
    res.status(500).json('There was an error retrieving the gauges')
  }
})

// POST /gauges/save/:id
router.post('/save/:id', async (req, res) => {
  try {
    let userId = req.session.userId
    const data = await Connections.query().insert({
      masterId: userId,
      slaveId: req.params.id
    })
    if (data) {
      res.status(201).json('Gauge Saved')
    }
  } catch (err) {
    res.status(500).json('Unable to save that gauge')
  }
})

// get /gauges/save
router.get('/myGauges', async (req, res) => {
  try {
    let userId = req.session.userId
    const gauges = await Connections.query()
      .joinRelated('gauges')
      .select('gauges.*', 'connections.*')
      .where({ masterId: userId })
    if (gauges) {
      res.status(200).json(gauges)
    }
  } catch (err) {
    console.log(err)

    res.status(500).json(err)
  }
})

/* --------------------------------- HELPERS -------------------------------- */

async function save (gauge) {
  const item = {
    name: gauge.siteName,
    siteCode: gauge.siteCode,
    geoLocation: JSON.stringify({
      latitude: gauge.geoLocation.latitude,
      longitude: gauge.geoLocation.longitude
    })
  }
  const data = Gauges.query()
    .insert(item)
    .catch(err => {
      // console.log(chalk.red(err.message))
    })

  return data
}

module.exports = router

const NC_SITES = [
  '03524000',
  '03512000',
  '03512000',
  '03460000',
  '03410210',
  '03453000',
  '03460000',
  '02176930',
  '02176930',
  '02177000',
  '02177000',
  '02177000',
  '0351706800',
  '03518500',
  '03539778',
  '03539778',
  '03540500',
  '03540500',
  '03539600',
  '03539600',
  '03441000',
  '03451500',
  '03453500',
  '03451500',
  '03451500',
  '03451500',
  '03439000',
  '03443000',
  '03453500',
  '03439000',
  '03451500',
  '03189600',
  '03192000',
  '03540500',
  '03539778',
  '03453000',
  '02138500',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '03539778',
  '03539778',
  '03503000',
  '03503000',
  '03446000',
  '03505550',
  '03505550',
  '03185400',
  '03465500',
  '03465500',
  '03465500',
  '03540500',
  '03540500',
  '03512000',
  '02176930',
  '02177000',
  '03460795',
  '03455500',
  '03531500',
  '03531500',
  '03512000',
  '03512000',
  '03208500',
  '03209000',
  '03208500',
  '03209000',
  '02169000',
  '02168504',
  '02162350',
  '03518500',
  '03451000',
  '02181580',
  '03473000',
  '03465500',
  '03463300',
  '03463300',
  '03510577',
  '03076500'
]
