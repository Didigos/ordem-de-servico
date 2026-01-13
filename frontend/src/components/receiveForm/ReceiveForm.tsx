import { useForm, useWatch } from "react-hook-form";

type TypeForm = {
    client: string,
    brand: string,
    model: string,
    store: string,
    reportedProblem: string,
    performedServices: string,
    price: string,
    warrantyPeriod: string,
}


const ReceiveForm = () => {

    const { register, control } = useForm<TypeForm>();

    const handleInputs = useWatch({
        control,
        name: "client"
    });

    console.log(handleInputs);

    return (
        <main className="sm:w-screen sm:full p-4 flex flex-col items-center justify-center">
            <header className="w-full flex items-center justify-center p-4 flex-col">
                <h2 className="text-[1.2rem] font-bold">Recebimento de Aparelho</h2>
                <span className="text-[0.9rem]">Assistência Técnica</span>
            </header>

            <form className="flex items-center justify-center flex-col gap-2 p-4 w-full">
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full ml-30"
                        htmlFor="client">Loja/Funcionario </label>
                    <input
                        {...register("store")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[0.9rem]"
                        type="text"
                        placeholder="Digite a loja ou funcionário..."
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full ml-30"
                        htmlFor="client">Cliente </label>
                    <input
                        {...register("client")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[0.9rem]"
                        type="text"
                        placeholder="Digite o nome do cliente..."
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full ml-30"
                        htmlFor="client">Marca </label>
                    <input
                        {...register("brand")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[0.9rem]"
                        type="text"
                        placeholder="Digite a marca do aparelho"
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full ml-30"
                        htmlFor="client">Modelo </label>
                    <input
                        {...register("model")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[0.9rem]"
                        type="text"
                        placeholder="Digite o modelo do aparelho"
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full p-1">
                    <label
                        className="text-[1.2rem] w-full ml-20"
                        htmlFor="problem">Problema Relatado</label>
                    <textarea
                        {...register("reportedProblem")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-40 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[1.2rem] resize-none"
                        placeholder="Descreva o problema relatado pelo cliente..."
                        name="problem" id="problem"></textarea>
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full ml-20"
                        htmlFor="problem">Serviços executados</label>
                    <textarea
                        {...register("performedServices")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-40 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[1.2rem] resize-none"
                        placeholder="Descreva os serviços executados..."
                        name="problem" id="problem"></textarea>
                </div>

                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full ml-20"
                        htmlFor="client">Valor </label>
                    <input
                        {...register("price")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[1.2rem]"
                        type="number"
                        placeholder="Ex; R$ 300"
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-[1.2rem] w-full ml-20"
                        htmlFor="client">Tempo de garantia </label>
                    <input
                        {...register("warrantyPeriod")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[1.2rem]"
                        type="number"
                        placeholder="Ex; 90 dias"
                    />
                </div>
                <button
                    className="w-full h-30 bg-green-500 hover:bg-green-600 transition-colors duration-200
                     rounded-2xl text-white text-[1.2rem] font-bold mt-4"
                    type="submit">Registrar e Imprimir</button>

            </form>
        </main>
    )
}

export default ReceiveForm