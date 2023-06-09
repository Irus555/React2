import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  // const { id, objId } = req.params
  console.log('Query: ',req.body)
  const response = {
    ok: true,
    errMsg: '',
  }

  
  res.status(200).json(response).send()
})

router.post('/', (req, res) => {
  console.log('Body: ',req.body)
  const response = {
    ok: true,
    errMsg: '',
  }

  res.status(200).json(response).send()
})

export default router
