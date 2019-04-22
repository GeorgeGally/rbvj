var rbvj;

// add drawing canvases
var ctx = createCanvas( 'canvas1' );
var ctx2 = createCanvas( 'canvas2' );
var ctx3 = createCanvas( 'canvas3' );

var renderer = new THREE.WebGLRenderer( {
  alpha: true,
  antialias: true
} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
renderer.localClippingEnabled = true;
document.getElementById( "canvas3D" )
  .appendChild( renderer.domElement );


// setFileLocation to defaults
// keys A-Z change files
// keys 0-9 change banks
// keys SHIFT 0-9 change sets

// files are stored in /art
// art/currentSet/currentBank/currentFile

var art_location = "/art";

var fileref;
var current_file = 0;
var current_set = 0;
var current_bank = 0;


function setup() {
  // changeFile( randomInt(26) );
  changeFile( 20 );
}


// FILE LOADER FUNCTIONS

function changeFile( file ) {
  reset()
  current_file = file;
  var loc = current_set + '/' + current_bank + '/' + current_file;
  var filename = 'art/' + loc + '.js';
  loadJS( filename );
  document.location.hash = loc;
  //console.log("File: " + loc);
}


function changeSet( set ) {
  current_set = set;
  current_bank = 0;
  console.log( "changeSet: " + current_bank );
  // reset
  changeFile( 0 );
}


function changeBank( bank ) {
  current_bank = bank;
  console.log( "changeBank: " + current_bank );
  changeFile( 0 );
}

function reset(){
  ctx.clearRect( 0, 0, w, h );
  ctx2.clearRect( 0, 0, w, h );
  ctx3.clearRect( 0, 0, w, h );
  ctx.lineCap = "butt";
}

// INJECT JS ONTO PAGE


function loadJS( filename ) {

  if ( fileref != undefined ) document.getElementsByTagName( "head" )[ 0 ].removeChild( fileref );
  fileref = document.createElement( 'script' );
  fileref.setAttribute( "type", "text/javascript" );
  fileref.setAttribute( "src", filename );
  document.getElementsByTagName( "head" )[ 0 ].appendChild( fileref );

}
