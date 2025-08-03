import {instance} from "../server.js"
import crypto from "crypto"
export const processPayment=async(req,res)=>{
    const options = {
        amount:Number(req.body.amount*100) , // amount in smallest currency unit
        currency: "INR",
      
    };
    const order=await instance.orders.create(options)
    return res.status(200).json({
        success:true,
        message:"Payment processed successfully",
        order
    });
}
export const sendRazorpayApiKey=async(req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_KEY_ID
    })
}   
export const paymentVerification=async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const body=razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
    console.log("expectedSignature",expectedSignature);
    console.log("razorpay_signature",razorpay_signature);
    const isAuthenticSignature=expectedSignature===razorpay_signature;
    if(!isAuthenticSignature){
        return res.status(400).json({
            success:false,
            message:"Invalid signature"
        });
    }
    if(isAuthenticSignature){
        return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
        };
    }

