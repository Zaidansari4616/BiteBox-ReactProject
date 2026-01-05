// src/utils/emailService.js
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("Qg9E1mSpUy81qTJiq"); // Replace with your actual public key

export const sendOrderConfirmation = async (orderData) => {
  const templateParams = {
    to_email: orderData.email,
    to_name: orderData.firstName,
    from_name: "BiteBox",
    order_total: orderData.total,
    order_items: orderData.items,
    delivery_address: `${orderData.street}, ${orderData.city}, ${orderData.state} ${orderData.pincode}`,
    phone: orderData.phone,
  };

  try {
    const response = await emailjs.send(
      'Lucifer_',      // Replace with your Service ID
      'template_r3yw6vb',     // Replace with your Template ID
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
};