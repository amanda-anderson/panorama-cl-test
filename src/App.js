import Pano from "./components/Pano";

function App() {
  return (
    <div style={{background: '#ff672f'}}>
      <h3 style={{ margin: '0px', padding: '10px', color: 'white', background: '#ff672f'}}>Panorama Viewer Test</h3>
      <p style={{ margin: '0px', paddingLeft: '10px', paddingBottom: '8px', color: 'white', background: '#ff672f'}}>Click anywhere to add an Infospot</p>
      <Pano/>
    </div>
  );
};

export default App;
