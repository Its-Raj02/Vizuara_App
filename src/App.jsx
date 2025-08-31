import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Games from "./pages/Games";
import Stories from "./pages/Stories";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="games" element={<Games />} />
          <Route path="stories" element={<Stories />} />
        </Route>
      </Routes>
    </Router>
  );
}
