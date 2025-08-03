import React from 'react'
import "../styles/Products.css"
import axios from 'axios'
const Product = ({products}) => {
    const checkoutHandler =async (price) => {
        const {data:keyData}=await axios.get("/api/v1/getKey")
        // console.log(keyData)
        const {data:orderData} = await axios.post("/api/v1/payment/process", {amount: price })
        // console.log(orderData)
        const {key}= keyData;
        const {order}= orderData;
        console.log(key, order)


        const options = {
        key, // Replace with your Razorpay key_id
        amount: price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'srikar vidya',
        description: 'Test Transaction of rezorpay',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: '/api/v1/paymentVerification', // Your success URL
        prefill: {
          name: 'srikar vidya',//customer name
          email: 'srikar.vidyaa@gmail.com',// customer email
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }


    
    // console.log(products)
  return (
    products.map((product) => (
        <div key={product.id} className='products-container'  >
        <div className='product-card' >
            <img src={product.image} alt="bag-product" className='product-image' />
            <h3 className='product-title'>{product.title}</h3>
            <p className="product-price">Price <strong>{product.price}</strong>/-</p>
            <button onClick={()=>checkoutHandler(product.price)} className="pay-button">{product.price}</button>
        </div>
    </div>
    ))
    
  )
}

export default Product