import axios from "axios";

type OrderData = {
    store: string;
    clientName: string;
    clientPhone: string;
    deviceBrand: string;
    deviceModel: string;
    issueDescription: string;
    contractedServices: string;
    totalValue: number;
    warrantyTime: string;
}

export async function sendOrderData(orderData: OrderData) {
    try {
    const response = await axios.post('http://localhost:3000/orders', orderData)
    return response
    }
    catch (error) {
        console.error('Error sending order data:', error);
        throw error;
    }
}