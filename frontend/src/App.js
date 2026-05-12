import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Work from "@/pages/Work";
import ProjectDetail from "@/pages/ProjectDetail";
import AIMode from "@/pages/AIMode";
import Images from "@/pages/Images";
import Videos from "@/pages/Videos";
import Research from "@/pages/Research";
import Shopping from "@/pages/Shopping";
import Contact from "@/pages/Contact";
import Archive from "@/pages/Archive";
import More from "@/pages/More";

function App() {
  return (
    <div className="App paper-bg min-h-screen">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/ai-mode" element={<AIMode />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/research" element={<Research />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
