const Select = () => {

    const handleReceiveDevice = (event: any) => {
        event.preventDefault();
        console.log('redirecionar para a página de receber aparelho');
    }

    const handleDeliverDevice = (event: any) => {
        event.preventDefault();
        console.log('redirecionar para a página de entregar aparelho');
    }


    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <section className="sm:w-[85%] sm:h-[90%]">
                <div className="text-center">
                    <h2 className="text-[2.8rem]">Acbr Celulares</h2>
                    <span>Ordens de serviço V 0.1</span>
                </div>

                <form className="flex flex-col mt-[30%] items-center gap-20">
                    <button
                        onClick={handleReceiveDevice}
                        className="border p-2 rounded-2xl w-80 h-40 bg-cyan-500 text-white text-[1.2rem] font-bold"
                    >RECEBER APARELHO</button>
                    <button
                        onClick={handleDeliverDevice}
                        className="border p-2 rounded-2xl w-80 h-40 bg-green-500 text-white text-[1.2rem] font-bold"
                    >ENTREGAR APARELHO</button>
                </form>

            </section>
        </main>
    )
}

export default Select