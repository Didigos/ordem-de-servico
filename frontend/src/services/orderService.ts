import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

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
    const response = await axios.post(`${API_URL}/orders`, orderData)
    console.log('resposta do servidor: ', response.data);
    return response
    }
    catch (error) {
        console.error('Erro ao enviar dados da ordem:', error);
        throw error;
    }
}

export async function getOrders() {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar ordens:', error);
        throw error;
    }
}