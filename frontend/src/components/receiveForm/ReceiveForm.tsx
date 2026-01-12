import { useForm, useWatch } from "react-hook-form";

type TypeForm = {
    client: string,
    brand: string,
    model: string,
    reportedProblem: string,
    performedServices: string,
    price: string,
    warrantyPeriod: string,
}


const ReceiveForm = () => {

    const { register, handleSubmit, formState: { errors }, control } = useForm<TypeForm>();

    const handleInputs = useWatch({
        control,
        name: "client"
    });

    console.log(handleInputs);

    return (
        <main className="sm:w-screen sm:full p-4 flex flex-col items-center justify-center">
            <header className="w-full flex items-center justify-center p-4 flex-col">
                <h2 className="text-[3.2rem] font-bold">Acbr Celulares</h2>
                <span className="text-[1.8rem]">Assistência Técnica</span>
            </header>

            <form className="flex items-center justify-center flex-col p-4 gap-4 w-full">
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="client">Cliente </label>
                    <input
                        {...register("client")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-22 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem]"
                        type="text"
                        placeholder="Digite o nome do cliente..."
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="client">Marca </label>
                    <input
                        {...register("brand")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-22 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem]"
                        type="text"
                        placeholder="Digite a marca do aparelho"
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="client">Modelo </label>
                    <input
                        {...register("model")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-22 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem]"
                        type="text"
                        placeholder="Digite o modelo do aparelho"
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="problem">Problema Relatado</label>
                    <textarea
                        {...register("reportedProblem")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-40 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem] resize-none"
                        placeholder="Descreva o problema relatado pelo cliente..."
                        name="problem" id="problem"></textarea>
                </div>
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="problem">Serviços executados</label>
                    <textarea
                        {...register("performedServices")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-40 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem] resize-none"
                        placeholder="Descreva os serviços executados..."
                        name="problem" id="problem"></textarea>
                </div>

                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="client">Valor </label>
                    <input
                        {...register("price")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-22 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem]"
                        type="number"
                        placeholder="Digite o valor do serviço"
                    />
                </div>
                <div className="flex items-center justify-center flex-col w-full p-4">
                    <label
                        className="text-3xl w-full ml-30"
                        htmlFor="client">Tempo de garantia </label>
                    <input
                        {...register("warrantyPeriod")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-22 rounded-4xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[2.1rem]"
                        type="number"
                        placeholder="Digite o tempo de garantia"
                    />
                </div>
                <button
                    className="w-[90%] h-30 bg-green-500 hover:bg-green-600 transition-colors duration-200
                     rounded-4xl text-white text-[2.1rem] font-bold mt-4"
                    type="submit">Registrar Serviço e Imprimir</button>

            </form>
        </main>
    )
}

export default ReceiveForm