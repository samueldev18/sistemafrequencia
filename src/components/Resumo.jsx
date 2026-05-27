function Resumo({ total }) {

  return (

    <div className="bg-zinc-800 p-6 rounded-2xl mb-8">

      <h2 className="text-2xl text-zinc-300">

        Total de Presenças

      </h2>

      <p className="text-5xl font-bold mt-2">

        {total}

      </p>

    </div>
  );
}

export default Resumo;