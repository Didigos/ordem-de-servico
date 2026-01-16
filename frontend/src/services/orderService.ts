import axios from "axios";

type OrderData = {
    customerId: string;
    brand: string;
    model: string;
    defectReported: string;
    performedServices: string;
    valueCents: string;
    warrantyDays: number;
}

export async function sendOrderData(orderData: OrderData) {
    try {
    const response = await axios.post('http://localhost:3333/orders', orderData)
    console.log('responsta do servidor: ', response.data);
    return response
    }
    catch (error) {
        console.error('Error sending order data:', error); 
        throw error;
    }
}