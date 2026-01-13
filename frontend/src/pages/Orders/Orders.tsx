
const Orders = () => {

    const handleBackClick = () => {
        window.history.back();
    }

    return (
        <main className="w-full border h-screen">
            <header className="flex flex-col gap-4 justify-center items-center">
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

                <section className="w-[95%]">
                    <input
                        placeholder="Buscar Ordem de serviço"
                        className="w-full border rounded-2xl h-10 text-center text-[1.2rem] outline-none"
                        type="search" name="search" id="search" />
                </section>
                <ul className="w-full">
                    <li className="flex items-center gap-1">
                        <div className="flex bg-[#D9D9D9] flex-1 h-20 justify-between items-center p-2 rounded-2xl">
                            <div className=" w-[65%] flex flex-col text-[0.8rem] p-1">
                                <span className="font-bold text-[0.9rem]">OS: 12345</span>
                                <span>Cliente: Diego Pires Gomes</span>
                                <span>Telefone: (28) 98116-8141</span>
                            </div>
                            <div className="flex flex-col text-[0.7rem]">
                                <div className="bg-red-300 p-1 flex items-center justify-center text-[0.9rem]"><span>Manutenção</span></div>
                                <div className="flex flex-col">
                                    <span className="font-bold">Entrada: 01/01/26</span>
                                    <span className="font-bold">Saída: 02/01/26</span>
                                </div>
                            </div>

                        </div>
                        <button className="h-20 w-15 p-1 text-[0.7rem] bg-[#D9D9D9] outline-none rounded-2xl">Imprimir</button>
                    </li>
                </ul>
            </header>
        </main>
    )
}

export default Orders