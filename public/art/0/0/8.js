rbvj = function () {
  renderer.setClearColor('#ffffff');
  ctx.clearRect( 0, 0, w, h );
  var sphere = [];
  var sphereGeom = [];
  var helpers = [];
  var num_slices = 60;
  var step = 0;

  var change_constants = [];
  var speed = [];


  var params = {
    clipIntersection: true,
    planeConstant: 0,
    planeConstant2: 0,
    sliceWidth: 1.8,
    showHelpers: false,
  };


  var sphereVerticesArray = [];
  var sphereVerticesNormArray = [];
  var pn;
  var clipPlanes = [];


  var clock = new THREE.Clock();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

  // position and point the camera to the center of the scene
  camera.position.x = -20;
  camera.position.y = 30;
  camera.position.z = 40;
  camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );


  var date = new Date();

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight( 0x111111 );
  scene.add( ambientLight );

  // add spotlight for the shadows
  var spotLight = new THREE.DirectionalLight( 0xffffff );
  spotLight.position.set( -20, 30, 40 );
  spotLight.intensity = 1.5;
  scene.add( spotLight );

  var noiseAmount = 2;


  pn = new Perlin( 'rnd' + date.getTime() );

  sphereGeom[ 0 ] = new THREE.SphereGeometry( 10, 30, 200 );
  sphereGeom[ 1 ] = new THREE.SphereGeometry( 11, 30, 100 );
  sphereGeom[ 2 ] = new THREE.SphereGeometry( 8, 30, 30 );
  // save points for later calculation
  for ( var i = 0; i < sphereGeom[ 0 ].vertices.length; i += 1 ) {
    var vertex = sphereGeom[ 0 ].vertices[ i ];
    var vec = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
    sphereVerticesArray.push( vec );
    var mag = vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
    mag = Math.sqrt( mag );
    var norm = new THREE.Vector3( vertex.x / mag, vertex.y / mag, vertex.z / mag );
    sphereVerticesNormArray.push( norm );
  }

  for ( var i = 0; i < num_slices; i++ ) {
    clipPlanes[ i ] = [
      new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 0 ),
      new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
    ];

    // if (i == 0) {
    //   var planetMaterial = new THREE.MeshPhongMaterial( {
    //     color: 0xffffff,
    //     side: THREE.DoubleSide,
    //     clippingPlanes: clipPlanes[ i ],
    //
    //   } );
    // } else {
    var planetMaterial = new THREE.MeshPhongMaterial( {
      color: 0x111111,
      side: THREE.DoubleSide,
      clippingPlanes: clipPlanes[ i ],
    } );
//}
    sphere[ i ] = THREE.SceneUtils.createMultiMaterialObject( sphereGeom[ randomInt( 2 ) ], [ planetMaterial ] );
    scene.add( sphere[ i ] );

  }

  //
  // gui.add( params, 'sliceWidth', 0.1, 10 ).step( 0.1 ).name( 'Slice Width' ).onChange( function ( value ) {
  // 	sliceWidth = value;
  //
  // } );
  //
  // // sphere 1
  // gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
  // 	change_constants = false;
  // 	changeClipConstants(0, 0, value)
  // } );
  //
  // gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
  // 	change_constants = false;
  // 	changeClipConstants(0, 1, value)
  // } );
  //
  // // sphere 1
  // gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
  // 	change_constants = false;
  // 	changeClipConstants(1, 0, value)
  // } );
  //
  // gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
  // 	change_constants = false;
  // 	changeClipConstants(1, 1, value)
  // } );
  //
  // // sphere 2
  // gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
  // 	change_constants = false;
  // 	changeClipConstants(2, 0, value)
  // } );
  //
  // gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
  // 	change_constants = false;
  // 	changeClipConstants(2, 1, value)
  // } );



  for ( var i = 0; i < num_slices; i++ ) {
    change_constants[ i ] = true;
    speed[ i ] = randomInt( 20, 200 );
  }


  function changeClipConstants( s, num, value ) {
    clipPlanes[ s ][ num ].constant = value;
  }

  this.draw = function () {

    step += 1;

    sw = Sound.getVol(1,3);
    params.sliceWidth = tween(params.sliceWidth, sw, 5);
    for ( var i = 0; i < num_slices; i++ ) {
      if ( change_constants[ i ] ) {
        changeClipConstants( i, 0, Math.sin( (noiseAmount/3 + step) / speed[ i ] ) * 16 );
        changeClipConstants( i, 1, -1 * ( Math.sin( step / speed[ i ] ) * 16 - params.sliceWidth ) );
      }
    }

    var vl = sphereGeom[ 0 ].vertices.length;
    noiseAmount = Sound.mapSound(10, vl * 2, 0, 45);

    for ( var i = 0; i < vl; i += 1 ) {
      var vertex = sphereGeom[ 0 ].vertices[ i ];

      var value = pn.noise( ( vertex.x + step ) / 10, vertex.y / 10, vertex.z / 10 );
      value = Math.abs(1 - value);

      vertex.x = sphereVerticesArray[ i ].x + sphereVerticesNormArray[ i ].x * value * noiseAmount;
      vertex.y = sphereVerticesArray[ i ].y + sphereVerticesNormArray[ i ].y * value * noiseAmount;
      vertex.z = sphereVerticesArray[ i ].z + sphereVerticesNormArray[ i ].z * value * noiseAmount;

    }

    scene.rotation.y += frameRate/1000;
    // for (var i = 0; i < sphere.length; i++) {
    //   sphere[ i ].rotation.y += .100;
    // }
    //s = Sound.getVol(-10,10);
    changeClipConstants(1, 0, Math.sin(frameCount/100)  * 15)
    changeClipConstants(1, 1, Math.sin(frameCount/120)  * 10)

    renderer.render( scene, camera );

  }




}();
