
import { useNavigate } from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();

    const handleClick = (event: any) => {
        event.preventDefault();
        navigate('/select');
    }
    return (

        <main className=" w-screen h-screen flex items-center justify-center">
            <section className="sm:w-[85%] sm:h-[90%]">
                <div className="text-center">
                    <h2 className="text-[2.8rem]">Acbr Celulares</h2>
                    <span>Ordens de serviço V 0.1</span>
                </div>

                <form className="flex flex-col mt-[50%] items-center gap-4">
                    <div className="flex flex-col p-2">
                        <label
                            className="text-[1.2rem] font-bold ml-10"
                            htmlFor="username">Funcionário</label>
                        <input
                            className="border border-black w-70 h-20 rounded-full text-[2.2rem] p-2 text-center outline-none"
                            type="text" />
                    </div>
                    <div className="flex flex-col p-2">
                        <label
                            className="text-[1.2rem] font-bold ml-10"
                            htmlFor="password">Senha de acesso</label>
                        <input
                            className="border border-black w-70 h-20 rounded-full text-[2.2rem] p-2 text-center outline-none"
                            type="password" />
                    </div>
                    <button
                        onClick={handleClick}
                        className="border p-2 rounded-full w-50 bg-cyan-500 text-white text-[1.2rem] font-bold"
                    >Conectar</button>
                </form>

            </section>
        </main>

    )
}

export default Login