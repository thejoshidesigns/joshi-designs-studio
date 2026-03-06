import CustomCursor from './components/shared/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Stage0Entry from './components/stages/Stage0Entry';
import Stage4Services from './components/stages/Stage4Services';
import Stage1Work from './components/stages/Stage1Work';
import Stage2Process from './components/stages/Stage2Process';
import Stage3WhyCuts from './components/stages/Stage3WhyCuts';
import Stage5Form from './components/stages/Stage5Form';
import Stage6Logos from './components/stages/Stage6Logos';

export default function App() {
  return (
    <div style={{ background: '#0B0B0B', minHeight: '100vh' }}>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main>
        <Stage0Entry />
        <Stage4Services />
        <Stage1Work />
        <Stage2Process />
        <Stage3WhyCuts />
        <Stage5Form />
        <Stage6Logos />
      </main>
      <Footer />
    </div>
  );
}
