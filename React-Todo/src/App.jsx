import { HashRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProjectDetail from "./pages/ProjectDetail"
import AboutHooks from "./pages/AboutHooks"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<AboutHooks />} />
      </Routes>
    </HashRouter>
  )
}