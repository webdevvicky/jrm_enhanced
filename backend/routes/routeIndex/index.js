const express = require('express');
const router = express.Router();

const auth = require('../auth')
const userRoutes=require('../userRoutes')
const customerRoutes = require('../customerRoutes')
const quotationRoutes = require('../quotationRoutes')
const invoiceRoutes = require('../invoiceRoutes')
const poRoutes = require('../poRoutes')
const contractorRoutes = require('../contractorRoutes')
const vendorRoutes = require('../vendorRoutes')
const EnquiryRoutes = require('../EnquiryRoutes')
const EnquiryQuoteRoutes = require('../enquiryQuoteRoutes')


router.use('/user',userRoutes)
router.use('/login', auth)
router.use('/project',customerRoutes)
router.use('/quote',quotationRoutes)
router.use('/invoice',invoiceRoutes)
router.use('/purchase',poRoutes)
router.use('/contractor',contractorRoutes)
router.use('/vendor',vendorRoutes)
router.use('/enquiry',EnquiryRoutes)
router.use('/enquiry/api/quote',EnquiryQuoteRoutes)



module.exports = router