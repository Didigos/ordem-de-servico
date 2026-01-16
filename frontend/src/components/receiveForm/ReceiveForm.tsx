import { useForm } from "react-hook-form";
import { sendOrderData } from "../../services/orderService";
import Alert from '@mui/material/Alert';
import { useState } from "react";

type TypeForm = {
    warrantyDays?: number,
    valueCents?: string,
    customerId: string,
    model: string,
    defectReported: string,

    performedServices?: string,
    checkable?: string,
    testedWhat?: string,
    deviceChecklist?: string[],
    selectedBrand: string,
    approvedService: string,
    selectedCustomer: string,
}


const ReceiveForm = () => {

    const { register, handleSubmit, watch } = useForm<TypeForm>();
    const approvalService = watch("approvedService");
    const checkable = watch("checkable");
    const [alert, setAlert] = useState(false);

    const handleOnSubmit = async (data: TypeForm) => {
        console.log('form data: ', data);
        const orderData = {
            customerId: data.customerId,
            brand: data.selectedBrand,
            model: data.model,
            store: data.selectedCustomer,
            defectReported: data.defectReported,
            performedServices: data.performedServices || "N/A",
            valueCents: data.valueCents ?? "N/A",
            warrantyDays: data.warrantyDays ?? 0,
        };

        try {
            const response = await sendOrderData(orderData);
            if (response.status === 201) {
                console.log('Ordem registrada com sucesso:', response.data);
                setAlert(true);
                setTimeout(() => setAlert(false), 3000);
                window.history.back();
            } else {
                console.error('Falha ao registrar a ordem:', response);
            }
        } catch (error) {
            console.error('Error sending order data:', error);
        }
    }

    const handleBackClick = () => {
        window.history.back();
    }


    return (
        <main className="sm:w-[90vw] sm:full flex flex-col items-center justify-center relative">
            {alert && <Alert 
            className={`fixed top-4 right-4 z-50 transition-transform duration-500 ${
      alert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}
            severity="success">Ordem registrada com sucesso!</Alert>}
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
                        <option value="claudia">Claudia</option>

                    </select>
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <label
                        className="text-[1.2rem] w-full  pl-10"
                        htmlFor="client">Cliente </label>
                    <input
                        {...register("customerId")}
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
                        {...register("defectReported")}
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
                    {...register("valueCents")}
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