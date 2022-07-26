import { BrowserRouter, Route, Routes  } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Personagem from "./pages/Personagem";
import Favoritos from "./pages/Favoritos";

const Routes1 = () => {
  return(
    <BrowserRouter>
    <Header />
      <Routes >
      <Route path="/" element={<Home />}></Route>
      <Route exact path="/personagem/:id" element={<Personagem />} />
      <Route exact path="/favoritos/" element={<Favoritos />} />
      </Routes >
    </BrowserRouter>
  );
};

export default Routes1;