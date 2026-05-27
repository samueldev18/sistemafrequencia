import { useEffect, useState } from "react";

import { ref, onValue } from "firebase/database";

import { db } from "./firebase/config";

import Header from "./components/Header";

import CardPresenca from "./components/CardPresenca";

import Resumo from "./components/Resumo";

function App() {

  const [presencas, setPresencas] = useState([]);

  useEffect(() => {

    const presencasRef = ref(
      db,
      "presencas"
    );

    onValue(presencasRef, (snapshot) => {

      const data = snapshot.val();

      if (!data) return;

      let lista = [];

      Object.keys(data).forEach((turma) => {

        Object.keys(data[turma]).forEach((dataDia) => {

          Object.keys(data[turma][dataDia]).forEach((aluno) => {

            lista.push({

              turma,

              ...data[turma][dataDia][aluno]

            });

          });

        });

      });

      setPresencas(lista);

    });

  }, []);

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-6">

      <Header />

      <Resumo total={presencas.length} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {presencas.map((item, index) => (

          <CardPresenca
            key={index}
            item={item}
          />

        ))}

      </div>

    </div>
  );
}

export default App;