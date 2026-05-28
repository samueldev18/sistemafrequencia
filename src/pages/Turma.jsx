import { useEffect, useState } from "react";

import {
    Users,
    UserCircle2,
    ArrowLeft,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ref,
    onValue,
} from "firebase/database";

import { db } from "../firebase/config";

export default function Turma() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [alunos, setAlunos] = useState([]);

    const [nomeTurma, setNomeTurma] = useState("");

    // PUXAR ALUNOS E DADOS DA TURMA
    useEffect(() => {

        // DADOS DA TURMA
        const turmaRef = ref(db, `turmas/${id}`);

        onValue(turmaRef, (snapshot) => {

            const data = snapshot.val();

            if (data) {
                setNomeTurma(data.nome);
            }

        });

        // ALUNOS DA TURMA
        const alunosRef = ref(db, `alunos/${id}`);

        onValue(alunosRef, (snapshot) => {

            const data = snapshot.val();

            if (data) {

                const listaAlunos = Object.keys(data).map((key) => ({
                    firebaseId: key,
                    ...data[key],
                }));

                // ORDENAR PELO NÚMERO DA CHAMADA
                listaAlunos.sort((a, b) => a.id - b.id);

                setAlunos(listaAlunos);

            } else {

                setAlunos([]);

            }

        });

    }, [id]);

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

                            <span className="text-2xl font-black">
                                V
                            </span>

                        </div>

                        <div>

                            <h1 className="text-3xl font-black tracking-wide">

                                <span className="text-white">
                                    VOCA
                                </span>

                                <span className="text-[#39FF88]">
                                    TUX
                                </span>

                            </h1>

                            <p className="text-sm text-slate-400">
                                Sistema Inteligente de Frequência
                            </p>

                        </div>

                    </div>

                    {/* Voltar */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-purple-500/30 bg-[#11152B] hover:border-[#39FF88]/50 transition-all duration-300"
                    >

                        <ArrowLeft size={20} />

                        <span>
                            Voltar
                        </span>

                    </button>

                </div>

            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-14 relative">

                <div className="flex items-center justify-between flex-wrap gap-10">

                    <div>

                        <p className="uppercase tracking-[0.3em] text-sm text-purple-400 mb-5">
                            Gerenciamento de Turma
                        </p>

                        <h2 className="text-5xl md:text-6xl font-black leading-tight">

                            <span className="text-[#39FF88]">
                                {nomeTurma || id}
                            </span>

                        </h2>

                        <p className="mt-6 text-slate-400 text-lg max-w-xl leading-relaxed">
                            Visualize todos os alunos cadastrados e acompanhe a frequência em tempo real.
                        </p>

                    </div>

                    {/* Card Total */}
                    <div className="w-[260px] rounded-[30px] border border-purple-500/20 bg-[#11152B] p-8 shadow-[0_0_30px_rgba(124,58,237,0.15)]">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Total de alunos
                                </p>

                                <h3 className="text-5xl font-black mt-3 text-[#39FF88]">
                                    {alunos.length}
                                </h3>

                            </div>

                            <div className="w-20 h-20 rounded-3xl bg-[#39FF88]/10 border border-[#39FF88]/20 flex items-center justify-center shadow-[0_0_20px_rgba(57,255,136,0.15)]">

                                <Users
                                    size={38}
                                    className="text-[#39FF88]"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Lista */}
            <main className="max-w-7xl mx-auto px-6 pb-24">

                <div className="flex flex-col gap-6">

                    {alunos.length > 0 ? (

                        alunos.map((aluno) => (

                            <div
                                key={aluno.firebaseId}
                                className="group relative rounded-[30px] border border-purple-500/20 bg-gradient-to-br from-[#11152B] to-[#0A0D1D] p-6 overflow-hidden hover:border-[#39FF88]/40 transition-all duration-500 hover:-translate-y-1 shadow-[0_0_35px_rgba(124,58,237,0.08)]"
                            >

                                {/* Glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(57,255,136,0.12),transparent_40%)]" />

                                <div className="relative flex items-center justify-between flex-wrap gap-6">

                                    {/* Left */}
                                    <div className="flex items-center gap-6">

                                        {/* Icon */}
                                        <div className="w-20 h-20 rounded-[24px] border border-purple-500/30 bg-[#161B35] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.2)]">

                                            <UserCircle2
                                                size={42}
                                                className="text-[#39FF88]"
                                            />

                                        </div>

                                        {/* Info */}
                                        <div>

                                            <p className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-2">
                                                Aluno
                                            </p>

                                            <h3 className="text-3xl font-bold">
                                                {aluno.nome}
                                            </h3>
                                            <div className="flex gap-3 mt-4">

                                                {/* PRESENÇAS */}
                                                <div className="flex-1 bg-zinc-900 border border-cyan-500/30 rounded-xl p-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">

                                                    <p className="text-xs text-cyan-400 uppercase tracking-wider">
                                                        Presenças
                                                    </p>

                                                    <h1 className="text-3xl font-bold text-white mt-1">
                                                        {aluno.presencas || 0}
                                                    </h1>

                                                </div>

                                                {/* FALTAS */}
                                                <div className="flex-1 bg-zinc-900 border border-red-500/30 rounded-xl p-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">

                                                    <p className="text-xs text-red-400 uppercase tracking-wider">
                                                        Faltas
                                                    </p>

                                                    <h1 className="text-3xl font-bold text-white mt-1">
                                                        {aluno.faltas || 0}
                                                    </h1>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Right */}
                                    <div className="flex items-center gap-4">

                                        <div className="px-8 py-5 rounded-[24px] border border-[#39FF88]/20 bg-[#39FF88]/5 shadow-[0_0_20px_rgba(57,255,136,0.08)]">

                                            <p className="text-xs uppercase tracking-[0.2em] text-[#39FF88] mb-2">
                                                Chamada
                                            </p>

                                            <h3 className="text-4xl font-black text-[#39FF88]">
                                                {aluno.id}
                                            </h3>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="rounded-[30px] border border-purple-500/20 bg-[#11152B] p-10 text-center">

                            <h3 className="text-3xl font-bold text-[#39FF88]">
                                Nenhum aluno encontrado
                            </h3>

                            <p className="text-slate-400 mt-4">
                                Essa turma ainda não possui alunos cadastrados.
                            </p>

                        </div>

                    )}

                </div>

            </main>

        </div>

    );

}