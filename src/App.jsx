import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import UrlShortener from "./components/UrlShortener";
import AdminPage from "./components/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full h-full flex items-center justify-center">
            <Routes>
              <Route path="/" element={<UrlShortener />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
