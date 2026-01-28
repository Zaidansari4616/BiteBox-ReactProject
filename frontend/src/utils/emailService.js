// src/utils/emailService.js
import emailjs from '@emailjs/browser';

// ⚠️ IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const SERVICE_ID = "Lucifer_";      // Replace this
const TEMPLATE_ID = "template_r3yw6vb";    // Replace this
const PUBLIC_KEY = "Qg9E1mSpUy81qTJiq";      // Replace this

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order information
 * @returns {Promise} EmailJS response
 */
export const sendOrderConfirmation = async (orderData) => {
  const templateParams = {
    to_email: orderData.email,
    to_name: orderData.firstName + " " + orderData.lastName,
    from_name: "BiteBox",
    order_total: "Rs." + orderData.total,
    order_items: orderData.items,
    delivery_address: `${orderData.street}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}, ${orderData.country}`,
    phone: orderData.phone,
    order_date: new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    
    console.log('✅ Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('❌ Email send failed:', error);
    throw error;
  }
};

/**
 * Validate email configuration
 * @returns {boolean} True if configured
 */
export const isEmailConfigured = () => {
  return SERVICE_ID !== "YOUR_SERVICE_ID" && 
         TEMPLATE_ID !== "YOUR_TEMPLATE_ID" && 
         PUBLIC_KEY !== "YOUR_PUBLIC_KEY";
};





