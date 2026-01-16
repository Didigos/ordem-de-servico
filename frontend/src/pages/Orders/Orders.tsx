import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    const handleBackClick = () => {
        window.history.back();
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response);
            } catch (error) {
                console.error('Erro ao buscar ordens:', error);
            }
        };
        fetchOrders();
    }, []);

    // Função para filtrar ordens por nome ou número da OS
    const filteredOrders = orders.filter((order: any) => {
        const searchLower = search.toLowerCase();
        const clientName = (order.customerId || "").toLowerCase();
        const orderNumber = String(order.orderNumber || "");
        return (
            clientName.includes(searchLower) ||
            orderNumber.includes(searchLower)
        );
    });

    return (
        <main className="w-full h-screen">
            <header className="flex flex-col gap-4 justify-center items-center p-1">
                <h2 className="text-[1.5rem]">Entregar Aparelho</h2>
                <div className="w-[90%] rounded-2xl border bg-red-400 text-white p-4">
                    Ao entregar o aparelho, certifique-se de que todas as informações estão corretas
                    e que o cliente está ciente dos termos de entrega a.
                </div>
                <button
                    onClick={handleBackClick}
                    className="p-2 bg-blue-400 rounded-2xl">
                    Voltar página anterior
                </button>

                <section className="w-[95%] flex justify-center">
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                            </svg>
                        </span>
                        <input
                            placeholder="Buscar Ordem de serviço"
                            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 text-[1.1rem] shadow transition-all duration-200 outline-none"
                            type="search"
                            name="search"
                            id="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </section>
                <ul className="w-full">
                    {filteredOrders.map((order: any) => (
                        <li key={order._id} className="flex items-center gap-1 mb-2">
                            <div className="flex bg-[#D9D9D9] flex-1 justify-between items-center p-2 rounded-2xl">
                                <div className="w-[65%] flex flex-col text-[0.8rem] p-1">
                                    <span className="font-bold text-[0.9rem]">OS: {order.orderNumber}</span>
                                    <span className="truncate overflow-hidden whitespace-nowrap max-w-37.5">Cliente: {order.customerId}</span>
                                    <span>Telefone: {order.clientPhone || "Sem Numero"}</span>
                                </div>
                                <div className="flex flex-col text-[0.7rem]">
                                    <div className={`p-1 flex items-center rounded-2xl justify-center text-[0.9rem] ${order.status === "MANUTENCAO" ? "bg-red-300" : "bg-green-300"
                                        }`}>
                                        <span>{order.status === "MANUTENCAO" ? "Manutenção" : "Entregue"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold">Entrada: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "--"}</span>
                                        <span className="font-bold">Saída: {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : "--"}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="h-20 w-15 p-1 text-[0.7rem] bg-[#D9D9D9] outline-none rounded-2xl">Imprimir</button>
                        </li>
                    ))}
                </ul>
            </header>
        </main>
    )
}

export default Orders