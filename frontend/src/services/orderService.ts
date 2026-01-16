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
        const response = await axios.get('http://localhost:3333/orders');
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar ordens:', error);
        throw error;
    }
}