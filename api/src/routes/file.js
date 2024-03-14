import express from 'express'
import { uploadFile , getFile} from '../controller/file.controller.js'
import { multerUploads } from '../config.js/multer.js'

const router = express.Router()

router.post("/upload", multerUploads, uploadFile)

router.get("/file.:id", getFile)

export default router