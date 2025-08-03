import express from 'express';
const router= express.Router();
import {paymentVerification} from '../controllers/productController.js';
import { processPayment } from '../controllers/productController.js';
import { sendRazorpayApiKey } from '../controllers/productController.js';
router.post('/payment/process', processPayment);
router.get('/getKey',sendRazorpayApiKey)
router.post('/paymentVerification',paymentVerification) 
export default router;