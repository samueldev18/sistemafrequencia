function CardPresenca({ item }) {

  return (

    <div className="bg-zinc-800 p-4 rounded-2xl shadow-lg">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">

          Chamada {item.numero_chamada}

        </h2>

        <span className="bg-green-500 px-3 py-1 rounded-full text-sm">

          {item.status}

        </span>

      </div>

      <div className="mt-4 space-y-1 text-zinc-300">

        <p>Turma: {item.turma}</p>

        <p>Hora: {item.hora}</p>

        <p>Data: {item.data}</p>

      </div>

    </div>
  );
}

export default CardPresenca;