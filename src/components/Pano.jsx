import * as PANOLENS from "panolens";

const panorama = new PANOLENS.ImagePanorama("https://raw.githubusercontent.com/amanda-anderson/panorama-cl-test/master/public/assets/pano2.jpeg");

// Initial Infospot
let infospot = new PANOLENS.Infospot( 400, PANOLENS.DataImage.Info, true );
infospot.position.set( 0, -2000, -5000 );
// Hover Element
var hoverElement = document.createElement("div");
const content = createElementFromHTML("<h3 style='color:white; width: 200px; overflow: wrap; text-align: center'>Information about this infospot.</h3>")
hoverElement.appendChild(content);
infospot.addHoverElement(hoverElement, 1);
// Focus on Click
infospot.addEventListener( "click", function(){
  this.focus();
} );

const viewer = new PANOLENS.Viewer({
  container: document.querySelector("#pano"),
  output: 'console',
  autoHideInfospot: false,
  controlBar: true,
  momentum: true
});

// Click Event on Image
panorama.addEventListener("click", function(e){
  viewer.outputPosition();

  var intersects, point, panoramaWorldPosition;
	intersects = viewer.raycaster.intersectObject(panorama, true );

	if ( intersects.length > 0 ) {

		point = intersects[0].point;
		panoramaWorldPosition = panorama.getWorldPosition();

		// Panorama is scaled -1 on X axis
     let x = -(point.x - panoramaWorldPosition.x).toFixed(2);
     let y = (point.y - panoramaWorldPosition.y).toFixed(2);
     let z = (point.z - panoramaWorldPosition.z).toFixed(2);

    let infospotDynamic = new PANOLENS.Infospot( 400, PANOLENS.DataImage.Info, true );
    infospotDynamic.position.set(x, y, z);
    infospotDynamic.addHoverElement(hoverElement, 1);
    panorama.add(infospotDynamic);
    panorama.toggleInfospotVisibility(true, 0);
  }
});

// Interesting: https://workspace.holobuilder.com/
// Docs: https://pchen66.github.io/Panolens/docs/PANOLENS.Infospot.html
// https://github.com/pchen66/panolens.js/releases/tag/v0.12.1

panorama.add(infospot);
viewer.add(panorama);
viewer.onWindowResize(window.innerHeight, window.innerWdith);

const Pano = () => {
  return (
    <>
      <div id="pano"/>
    </>
  );
};

export default Pano;


// Functions
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}