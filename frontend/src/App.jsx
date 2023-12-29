import axios from "axios";
import { useEffect, useState } from "react";
import FinnishWordForm from "./components/FinnishWordForm";
import FinnishWords from "./components/FinnishWords";

const App = () => {
  return (
    <div>
      <FinnishWordForm />
      <FinnishWords />
    </div>
  );
};

export default App;
