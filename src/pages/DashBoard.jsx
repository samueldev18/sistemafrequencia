import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

import React from "react";
import {
    Users,
    Bell,
    Settings,
    Activity,
    FileText,
    ChevronDown,
    ArrowRight,
} from "lucide-react";

export default function VocatuxDashboard() {
    const [turmas, setTurmas] = useState([]);

    const [nomeTurma, setNomeTurma] = useState("");
    const [quantidadeAlunos, setQuantidadeAlunos] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const turmasRef = ref(db, "/turmas");

        onValue(turmasRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const listaTurmas = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                setTurmas(listaTurmas);
            } else {
                setTurmas([]);
            }
        });
    }, []);

const adicionarTurma = async () => {

  if (!nomeTurma || !quantidadeAlunos) return;

  const idTurma = nomeTurma
    .toLowerCase()
    .replaceAll(" ", "-");

await set(ref(db, `turmas/${idTurma}`), {
  id: idTurma,
  nome: nomeTurma,
  alunos: Number(quantidadeAlunos),
});

  setNomeTurma("");
  setQuantidadeAlunos("");
  setMostrarModal(false);
};
    return (
        <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-700/20 blur-[140px] rounded-full" />
                <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-green-400/10 blur-[140px] rounded-full" />
            </div>

            {/* Navbar */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090B1A]/80 border-b border-purple-500/30">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.7)]">
                            <span className="text-2xl font-black">V</span>
                        </div>

                        <div>
                            <h1 className="text-3xl font-black tracking-wide">
                                <span className="text-white">VOCA</span>
                                <span className="text-[#39FF88]">TUX</span>
                            </h1>

                            <p className="text-sm text-slate-400">
                                Sistema Inteligente de Frequência
                            </p>
                        </div>
                    </div>

                    {/* Menu */}
                    <nav className="hidden lg:flex items-center gap-10 text-[15px]">
                        <button className="flex items-center gap-2 text-[#39FF88] border-b-2 border-[#39FF88] pb-1">
                            <Users size={18} />
                            Turmas
                        </button>

                        <button className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                            <Users size={18} />
                            Alunos
                        </button>

                        <button className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                            <Activity size={18} />
                            Frequência
                        </button>

                        <button className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                            <FileText size={18} />
                            Relatórios
                        </button>

                        <button className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                            <Settings size={18} />
                            Configurações
                        </button>
                    </nav>

                    {/* Right */}
                    <div className="flex items-center gap-4">


                        <div className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-[#39FF88]/30 bg-[#39FF88]/5 shadow-[0_0_20px_rgba(57,255,136,0.15)]">
                            <div className="w-2.5 h-2.5 bg-[#39FF88] rounded-full animate-pulse" />
                            <span className="text-[#39FF88] text-sm font-medium">
                                Sistema online
                            </span>
                        </div>



                        <button className="w-12 h-12 rounded-2xl border border-purple-500/30 bg-[#11152B] flex items-center justify-center hover:border-[#39FF88]/60 transition">
                            <Bell size={20} />
                        </button>

                        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl border border-purple-500/20 bg-[#11152B]">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center font-bold">
                                A
                            </div>

                            <div>
                                <p className="text-sm font-semibold">Admin</p>
                            </div>

                            <ChevronDown size={18} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-14 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left */}
                    <div>
                        <p className="uppercase tracking-[0.3em] text-sm text-purple-400 mb-5">
                            Bem-vindo(a) ao Vocatux
                        </p>

                        <h2 className="text-5xl md:text-6xl font-black leading-tight">
                            Turmas{" "}
                            <span className="text-[#39FF88] drop-shadow-[0_0_18px_rgba(57,255,136,0.7)]">
                                Disponíveis
                            </span>
                        </h2>

                        <p className="mt-6 text-slate-400 text-lg max-w-xl leading-relaxed">
                            Selecione uma turma para gerenciar a frequência escolar em tempo
                            real através do sistema inteligente Vocatux.
                        </p>

                        <br></br>

                        <button
                            onClick={() => setMostrarModal(true)}
                            className="px-5 py-3 rounded-2xl bg-[#39FF88] text-black font-bold hover:scale-105 transition"
                        >
                            + Nova Turma
                        </button>
                    </div>

                    {/* Right */}
                    <div className="relative hidden lg:flex justify-center items-center">
                        <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-[100px] rounded-full" />

                        <div className="relative w-[320px] h-[260px] rounded-[30px] border border-purple-500/40 bg-[#0E1328] backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.35)] flex items-center justify-center">
                            <Users
                                size={90}
                                className="text-[#39FF88] drop-shadow-[0_0_25px_rgba(57,255,136,0.7)]"
                            />
                        </div>
                    </div>


                </div>
            </section>

            {/* Cards */}
            <main className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {turmas.map((turma, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/turma/${turma.id}`)}
                            className="group relative rounded-[30px] border border-purple-500/20 bg-gradient-to-br from-[#11152B] to-[#0A0D1D] p-8 overflow-hidden hover:border-[#39FF88]/40 transition-all duration-500 hover:-translate-y-2 shadow-[0_0_35px_rgba(124,58,237,0.08)]"
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(57,255,136,0.12),transparent_40%)]" />

                            <div className="relative flex justify-between items-start">
                                {/* Left */}
                                <div className="flex gap-6">
                                    <div className="w-24 h-24 rounded-[28px] border border-purple-500/30 bg-[#161B35] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                                        <Users
                                            size={40}
                                            className="text-purple-400"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-bold leading-tight">
                                            {turma.nome}
                                        </h3>

                                        <p className="text-purple-400 text-lg mt-2">
                                            {turma.turma}
                                        </p>

                                        <div className="flex items-center gap-3 mt-6 text-slate-400">
                                            <Users size={18} />
                                            <span className="text-lg">
                                                {turma.alunos} alunos
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex flex-col items-end gap-6">
                                    <div className="w-24 h-24 rounded-[28px] border border-[#39FF88]/20 bg-[#39FF88]/5 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(57,255,136,0.15)]">
                                        <span className="text-4xl font-black text-[#39FF88]">
                                            {turma.alunos}
                                        </span>

                                        <span className="text-xs tracking-[0.2em] uppercase text-[#39FF88]">
                                            alunos
                                        </span>
                                    </div>

                                    <button className="w-16 h-16 rounded-2xl border border-[#39FF88]/40 bg-[#39FF88]/5 flex items-center justify-center text-[#39FF88] hover:bg-[#39FF88] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(57,255,136,0.12)]">
                                        <ArrowRight size={26} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {mostrarModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="w-[420px] bg-[#11152B] border border-purple-500/30 rounded-[30px] p-8 shadow-[0_0_40px_rgba(124,58,237,0.35)]">

                        <h2 className="text-3xl font-bold mb-8">
                            Nova <span className="text-[#39FF88]">Turma</span>
                        </h2>

                        <div className="flex flex-col gap-5">

                            <input
                                type="text"
                                placeholder="Nome da turma"
                                value={nomeTurma}
                                onChange={(e) => setNomeTurma(e.target.value)}
                                className="bg-[#0A0D1D] border border-purple-500/20 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#39FF88]"
                            />

                            <input
                                type="number"
                                placeholder="Quantidade de alunos"
                                value={quantidadeAlunos}
                                onChange={(e) => setQuantidadeAlunos(e.target.value)}
                                className="bg-[#0A0D1D] border border-purple-500/20 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#39FF88]"
                            />

                            <div className="flex gap-4 mt-4">

                                <button
                                    onClick={adicionarTurma}
                                    className="flex-1 bg-[#39FF88] text-black font-bold py-4 rounded-2xl hover:scale-105 transition"
                                >
                                    Criar
                                </button>

                                <button
                                    onClick={() => setMostrarModal(false)}
                                    className="flex-1 border border-purple-500/30 py-4 rounded-2xl hover:bg-purple-500/10 transition"
                                >
                                    Cancelar
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="border-t border-purple-500/20 py-8 text-center text-slate-500">
                <p>
                    <span className="text-purple-400 font-bold">VOCA</span>
                    <span className="text-[#39FF88] font-bold">TUX</span> © 2026 ·
                    Sistema Inteligente de Frequência Escolar
                </p>


            </footer>


        </div>
    );
}