import TextForm from "./components/TextForm";
import Header from "./components/Header";
import About from "./components/About";


function App() {
  return (
    <>
    <Header  />
    <div className="container">
      <TextForm heading="Enter the Text to Analyse"/>
      <About />
    </div>
    
     
    </>
  );
}

export default App;
