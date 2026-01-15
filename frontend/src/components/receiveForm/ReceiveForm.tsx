import { useForm } from "react-hook-form";
import { sendOrderData } from "../../services/orderService";

type TypeForm = {
    client: string,
    brand: string,
    model: string,
    store: string,
    reportedProblem: string,
    performedServices: string,
    price: string,
    warrantyPeriod: string,
    approvedService: string,
    checkable: string,
    testedWhat: string,
    selectedBrand: string,
    selectedCustomer: string,
    deviceChecklist?: string[],
}


const ReceiveForm = () => {

    const { register, handleSubmit, watch } = useForm<TypeForm>();
    const approvalService = watch("approvedService");
    const checkable = watch("checkable");

    const handleOnSubmit = async (data: TypeForm) => {
        const orderData = {
            store: data.store,
            clientName: data.client,
            clientPhone: "",
            deviceBrand: data.brand,
            deviceModel: data.model,
            issueDescription: data.reportedProblem,
            performedServices: data.performedServices,
            totalValue: data.price,
            warrantyTime: data.warrantyPeriod,
        };

        try {
            const response = await sendOrderData(orderData);
            if (response.status === 201) {
                alert('Ordem registrada com sucesso!');
                window.history.back();
            } else {
                alert('Falha ao registrar a ordem. Tente novamente.');
            }
        } catch (error) {
            console.error('Error sending order data:', error);
        }
    }

    const handleBackClick = () => {
        window.history.back();
    }


    return (
        <main className="sm:w-[90vw] sm:full flex flex-col items-center justify-center">
            <header className="w-full flex items-center justify-center p-4 flex-col">
                <h2 className="text-[1.2rem] font-bold">Recebimento de Aparelho</h2>
                <span className="text-[0.9rem]">Assistência Técnica</span>
            </header>
                <button
                    onClick={handleBackClick}
                    className="p-2 bg-blue-400 rounded-2xl">
                    Voltar página anterior
                </button>

            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="flex items-center justify-center flex-col gap-2 w-full">
                <div className="flex items-center justify-center flex-col w-full p-1">
                    <label
                        className="text-[1.2rem] w-full pl-10"
                    >Funcionário</label>
                    <select
                        {...register("selectedCustomer")}
                        id="selectedCustomer"
                        defaultValue={""}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                        placeholder-gray-400 text-[1.2rem]"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="josiane">Josiane</option>
                        <option value="diego">Diego</option>
                        <option value="bruno">Bruno</option>
                        <option value="carmem">Carmem</option>
                        <option value="guilherme">Guilherme</option>
                        <option value="rodrigo">Rodrigo</option>
                        <option value="amanda">Amanda</option>
                        <option value="deyse">Deyse</option>

                    </select>
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full  pl-10"
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
                <div className="flex items-center justify-center flex-col w-full p-1">
                    <label
                        className="text-[1.2rem] w-full pl-10"
                    >Marca</label>
                    <select
                        {...register("selectedBrand")}
                        id="selectedBrand"
                        defaultValue={""}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-2 shadow-sm focus:shadow-md bg-white
                        placeholder-gray-400 text-[1.2rem]"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Apple">Apple</option>
                        <option value="Motorola">Motorola</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="LG">LG</option>
                        <option value="Asus">Asus</option>
                        <option value="Sony">Sony</option>
                        <option value="Positivo">Positivo</option>
                        <option value="TCL">TCL</option>
                        <option value="Alcatel">Alcatel</option>
                        <option value="Philco">Philco</option>

                    </select>
                </div>

                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full pl-10"
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
                {/* separador */}
                <div className="w-full h-1 border-b border-zinc-300 rounded-full"></div>

                <div className="flex items-center justify-center flex-col w-full p-1">
                    <label
                        className="text-[1.2rem] w-full pl-10"
                        htmlFor="problem">Problema Relatado</label>
                    <textarea
                        {...register("reportedProblem")}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-40 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                         placeholder-gray-400 text-[1.2rem] resize-none"
                        placeholder="Descreva o problema relatado pelo cliente..."
                        name="reportedProblem" id="reportedProblem"></textarea>
                </div>
                <div className="w-full h-1 border-b border-zinc-300 rounded-full"></div>
                <div className="flex items-center justify-center flex-col w-full p-1">
                    <label
                        className="text-[1.2rem] w-full pl-10"
                    >É possível fazer testes?</label>
                    <select
                        {...register("checkable")}
                        id="checkable"
                        defaultValue={""}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                        placeholder-gray-400 text-[1.2rem]"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="yes">Sim</option>
                        <option value="no">Não</option>

                    </select>
                </div>

                {checkable === "yes" && (
                <>
                <div className="flex items-center justify-center flex-col w-full p-1">
                <label
                className="text-[1.2rem] w-full pl-10"
                htmlFor="problem">O que foi testado?</label>
                <textarea
                {...register("testedWhat")}
                
                className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                duration-200 w-[90%] h-40 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                    placeholder-gray-400 text-[1.2rem] resize-none"
                placeholder="Descreva o problema relatado pelo cliente..."
                name="testedWhat" id="testedWhat"></textarea>
                </div>
                </>)}

                {/* separador */}
                <div className="w-full h-1 border-b border-zinc-300 rounded-full"></div>

                <div className="flex items-center justify-center flex-col w-full p-1">
                    <label
                        className="text-[1.2rem] w-full pl-10"
                    >Cliente pré aprovou serviço?</label>
                    <select
                        {...register("approvedService")}
                        id="approvedService"
                        defaultValue={""}
                        className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                        duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                        placeholder-gray-400 text-[1.2rem]"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="yes">Sim</option>
                        <option value="no">Não</option>

                    </select>
                </div>
                {approvalService === "yes" && (
                    <>
                    <div className="flex items-center justify-center flex-col w-full">
                    <label
                    className="text-[1.2rem] w-full pl-10"
                    htmlFor="problem">Serviços</label>
                    <textarea
                    {...register("performedServices")}
                    className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                    duration-200 w-[90%] h-40 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                    placeholder-gray-400 text-[1.2rem] resize-none"
                    placeholder="Descreva os serviços..."
                    name="performedServices" id="performedServices"></textarea>
                    </div>

                    <div className="flex items-center justify-center flex-col w-full">
                    <label
                    className="text-[1.2rem] w-full ml-20  pl-10"
                    htmlFor="client">Valor </label>
                    <input
                    {...register("price")}
                    className="outline-none border-2 border-[#05ABE2] focus:border-green-500 transition-colors 
                    duration-200 w-[90%] h-15 rounded-2xl p-4 shadow-sm focus:shadow-md bg-white
                    placeholder-gray-400 text-[1.2rem]"
                    type="text"
                    placeholder="Ex; R$ 300"
                    />
                    </div>
                    </>
                )}


                <button
                    className="w-[65%] h-15 bg-green-500 hover:bg-green-600 transition-colors duration-200
                    rounded-2xl text-white text-[1.2rem] font-bold mt-4"
                    type="submit">Registrar e Imprimir
                </button>

            </form>
        </main>
    )
}

export default ReceiveForm