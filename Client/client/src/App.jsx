import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Store from "./pages/Store";
import ServicesBarbers from "./pages/ServicesBarbers";
import Shop from "./components/Shop";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />

        <Route path="/store" element={<Store />} />

        <Route path="/services" element={<ServicesBarbers />} />
        <Route path="/ServicesBarbers" element={<ServicesBarbers />} />
        <Route path="/shop" element={<Shop />} />

      </Route>
    </Routes>
  );
}

export default App;