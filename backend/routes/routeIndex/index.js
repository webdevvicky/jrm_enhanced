const express = require('express');
const router = express.Router();

const { verifyTokenMiddleware } = require('../../middlewares/verifyTokenMiddleware');
const setCreatedByFieldMiddleware =require('../../middlewares/setCreatedByField')
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
const DesignsRoutes = require('../designsRoutes')
const ProjectRoutes = require('../ProjectRoutes')
const VoucherRoutes = require('../voucherRoutes')
const WorkOrderRoutes = require('../workOrderRoutes')

// not protected route , it did't ask for token -- only for logins 
router.use('/login', auth)


// midlleware to check token -- below routes need token to access 
router.use(verifyTokenMiddleware);
router.use(setCreatedByFieldMiddleware)
// protected routes 

router.use('/user',userRoutes)
router.use('/customer',customerRoutes)
router.use('/project',ProjectRoutes)
router.use('/quote',quotationRoutes)
router.use('/invoice',invoiceRoutes)
router.use('/purchaseorder',poRoutes)
router.use('/contractor',contractorRoutes)
router.use('/vendor',vendorRoutes)
router.use('/enquiry',EnquiryRoutes)
router.use('/enquiry/api/quote',EnquiryQuoteRoutes)
router.use('/designs',DesignsRoutes)
router.use('/voucher',VoucherRoutes)
router.use('/workorder', WorkOrderRoutes)




module.exports = router