import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashBoard from "./pages/DashBoard";
import Turma from "./pages/Turma";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashBoard />} />

        <Route path="/turma/:id" element={<Turma />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;