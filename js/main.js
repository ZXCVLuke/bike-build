
  // Constructor function
  function BikeBuild (emailAddress){
    this.email = emailAddress;
    this.inputs = {
      Distance : 0.2,
      Surface : 0.2,
      Elevation : 0.2,
      Luggage : 0.2,
      Disposition : 0.2,
      Height : 0.5,
      Weight : 0.5,
      WeightMeasurement : this.Weight * 70 + 45
    }
  }

  // UPDATE INPUT FUNCTIONS ----------------------------------------------------

  // gets input from and returns it for use elsewhere
  function getValue (el) {
    var i = (el).val();
    return i;
  }

  function updateSurface (val) {
    newBuild.inputs.Surface = val;
  }

  function updateHeight (val) {
    newBuild.inputs.Height = val;
  }

  function convertHeight () {
    var height = newBuild.inputs.Height * 550 + 1450;
    return height;
  }



  // UPDATE SPEC FUNCTIONS -----------------------------------------------------

  // tyreSize is determined by Surface (70%), Luggage (20%) and Weight (10%)
  function setTyreSize () {
    tyreSize =  ( newBuild.inputs.Surface * 0.7 +
                  newBuild.inputs.Luggage * 0.2 +
                  newBuild.inputs.Weight  * 0.1 ) * 52 + 23;
  }

  //  wheelSize is determined by Saddle Height, Surface, Disposition and tyre size
  function setWheelSize () {
    // saddle height = approx 0.47 * height

  }

  function setSeatHeight () {
    var h = convertHeight();
    if (h <= 1500) {
      seatHeight = h * 0.45 - 100;
    } else if (h > 1800) {
      seatHeight = h * 0.50 - 100;
    } else { seatHeight = h * 0.47 - 100; }
    seatHeightX = seatHeight * Math.cos(seatTubeAngle);
    seatHeightY = seatHeight * Math.sin(seatTubeAngle);
  }



// New build from Constructor function
var newBuild = new BikeBuild();


// default specs
var tyreSize;
setTyreSize();

var seatHeight;
setSeatHeight();

// 73deg in radians
var seatTubeAngle = 1.27409

var seatHeightX;
var seatHeightY;

var bottomBracketOriginX = 913;
var bottomBracketOriginY = 905;


var wheelSize = 622;
var tyreTreadSize = 2;
var tyreTreadSpacing = "5, 5";

// default svg attributes
var tyreColour = "#222";
var rimColour = "#000";
var frontWheelX = 1488;
var rearWheelX = 500;
var wheelsY = 800;

// creates the drawing surface
var s = Snap("#svg");

// draw front wheel
var tyre1 = s.circle(frontWheelX,wheelsY,0);
var tyre1MaskInner = s.circle(frontWheelX,wheelsY,0);
var tyre1MaskOuter = s.circle(frontWheelX,wheelsY,0);
var tyre1Mask = s.group(tyre1MaskOuter, tyre1MaskInner);
var tyre1Tread = s.circle(frontWheelX,wheelsY,0);
var rim1 = s.circle(frontWheelX,wheelsY,0);
var rim1MaskInner = s.circle(frontWheelX,wheelsY,0);
var rim1MaskOuter = s.circle(frontWheelX,wheelsY,0);
var rim1Mask = s.group(rim1MaskOuter, rim1MaskInner);

var frontWheel = s.group( tyre1,
                          tyre1Mask,
                          tyre1Tread,
                          rim1,
                          rim1Mask
                        );

// draw rear wheel
var tyre2 = s.circle(rearWheelX,wheelsY,0);
var tyre2MaskInner = s.circle(rearWheelX,wheelsY,0);
var tyre2MaskOuter = s.circle(rearWheelX,wheelsY,0);
var tyre2Mask = s.group(tyre2MaskOuter, tyre2MaskInner);

var tyre2Tread = s.circle(rearWheelX,wheelsY,0);

var rim2 = s.circle(rearWheelX,wheelsY,0);
var rim2MaskInner = s.circle(rearWheelX,wheelsY,0);
var rim2MaskOuter = s.circle(rearWheelX,wheelsY,0);
var rim2Mask = s.group(rim2MaskOuter, rim2MaskInner);

var rearWheel = s.group(  tyre2,
                          tyre2Mask,
                          tyre2Tread,
                          rim2,
                          rim2Mask
                        );


// draw bb
var bottomBracket = s.circle(bottomBracketOriginX,bottomBracketOriginY,19).attr({
  fill: '#ff0000'
})

// draw st
var seatTube = s.line(bottomBracketOriginX,bottomBracketOriginY,771,395).attr({
  stroke: '#ff0000',
  strokeWidth: 30
})


// sets default attributes to circles
tyre1.attr({
  r:    wheelSize / 2 + (tyreSize),
  fill: tyreColour,
  mask: tyre1Mask
});

tyre1Tread.attr({
  r: tyre1.attr("r"),
  fill: "none",
  stroke: tyreColour,
  strokeWidth: tyreTreadSize,
  strokeDasharray: tyreTreadSpacing
})
// Rotate so stroke start/finish is a BDC
tyre1Tread.transform('r90');

rim1.attr({
  r:    wheelSize / 2 + 7,
  fill: rimColour,
  mask: rim1Mask
});

tyre1MaskInner.attr({
  r:    rim1.attr("r") - 2,
  fill: "#000"
})

tyre1MaskOuter.attr({
  r:    tyre1.attr("r"),
  fill: "#fff"
})

rim1MaskInner.attr({
  r :    rim1.attr("r") - 15,
  fill : "#000"
})

rim1MaskOuter.attr({
  r:    rim1.attr("r"),
  fill: "#fff"
})

tyre2.attr({
  r:    wheelSize / 2 + (tyreSize),
  fill: tyreColour,
  mask: tyre2Mask
});

tyre2Tread.attr({
  r: tyre2.attr("r"),
  fill: "none",
  stroke: tyreColour,
  strokeWidth: tyreTreadSize,
  strokeDasharray: tyreTreadSpacing
})
// Rotate so stroke start/finish is a BDC
tyre2Tread.transform('r90');

rim2.attr({
  r:    wheelSize / 2 + 7,
  fill: rimColour,
  mask: rim2Mask
});

tyre2MaskInner.attr({
  r:    rim2.attr("r") - 2,
  fill: "#000"
})

tyre2MaskOuter.attr({
  r:    tyre2.attr("r"),
  fill: "#fff"
})

rim2MaskInner.attr({
  r :    rim2.attr("r") - 15,
  fill : "#000"
})

rim2MaskOuter.attr({
  r:    rim2.attr("r"),
  fill: "#fff"
})

$( document ).ready(function() {

pagination('Distance');
pagination('Surface');
pagination('Elevation');
pagination('Luggage');
pagination('Disposition');
pagination('Height');
pagination('Weight');





  // triggers function when there is an input
  $("#slider1").on("input", function() {
    // calls getInput function on #slider1
    var i = getValue ($("#slider1"));
    // changes the tyreSize variable based on the slider input
    tyreSize = i * 52 + 23;
    // updates the svg
    updateWheelAndTyre(tyreSize, wheelSize);
  });

  // triggers function when there is an input
  $("#slider2").on("input", function() {
    // calls getInput function on #slider1
    var t = getValue ($("#slider2"));
    // changes the tyreSize variable based on the slider input
    tyreTreadSize = t * 14;

    if ( t >= 0 && t < 0.1 ){
      tyreTreadSpacing = "0, 0"
    } else if ( t >= 0.1 && t < 0.4 ){
      tyreTreadSpacing = "5, 5"
    } else if ( t >= 0.4 && t < 0.6){
      tyreTreadSpacing = "8, 8"
    } else if ( t >= 0.6 && t < 0.8){
      tyreTreadSpacing = "12, 12"
    } else { tyreTreadSpacing = "15, 15" };

    // updates the svg
    updateTyreTread(tyreTreadSize, tyreTreadSpacing);
  });

  // triggers function when there is an input
  $("#radio1").on("change", function() {
    // calls getInput function on #radio1
    var i = getValue ($("input[type='radio'][name='wheel-size']:checked"));
    // changes the wheelSize variable based on the radio input
    wheelSize = i;
    // updates the svg, hopefully...
    updateWheelAndTyre(tyreSize, wheelSize);
  });

Snap.load("img/handlebars-drop.svg", function (f) {
  s.append(f);
});

Snap.load("img/saddle.svg", function (f) {

  s.append(f);
});


  $('#bik-DistanceInput-Control').on("input", function() {
      var i = getValue ($('#bik-DistanceInput-Control')) ;
      var iDist = parseInt(Math.pow(85,i) + i * 115);
      // Input Feedback
      $('#bik-DistanceInput-Counter').text(iDist);
  });

  $('#bik-SurfaceInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-SurfaceInput-Control'));
      // Trigger feedback

      // Update input
      updateSurface(i);
      // Recalculate specs
      setTyreSize();
      // Redraw SVG
      updateWheelAndTyre(tyreSize, wheelSize);
  });

  $('#bik-HeightInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-HeightInput-Control'));
      // Trigger feedback

      // Update input
      updateHeight(i);
      // Recalculate specs
      setSeatHeight();
      // Redraw SVG
      $('#saddle').attr('y', bottomBracketOriginY - seatHeightY - 10).attr('x', bottomBracketOriginX - seatHeightX - 108);



  });



});


// FUNCTIONS


function updateTyreTread (tyreTreadSize, tyreTreadSpacing) {
  tyre1Tread.attr({
    strokeWidth: tyreTreadSize,
    strokeDasharray: tyreTreadSpacing
  })
  tyre2Tread.attr({
    strokeWidth: tyreTreadSize,
    strokeDasharray: tyreTreadSpacing
  })
}

function updateWheelAndTyre (tyreSize, wheelSize) {
  tyre1.attr({ r: wheelSize / 2 + (tyreSize) });
  tyre1Tread.attr({ r: tyre1.attr("r") })
  rim1.attr({ r: wheelSize / 2 + 7 });
  tyre1MaskInner.attr({ r: rim1.attr("r") - 2 })
  tyre1MaskOuter.attr({ r: tyre1.attr("r") + 10 })
  rim1MaskInner.attr({ r: rim1.attr("r") - 15 })
  rim1MaskOuter.attr({ r: rim1.attr("r") })
  tyre2.attr({ r: wheelSize / 2 + (tyreSize) });
  tyre2Tread.attr({ r: tyre2.attr("r") })
  rim2.attr({ r: wheelSize / 2 + 7 });
  tyre2MaskInner.attr({ r: rim2.attr("r") - 2 })
  tyre2MaskOuter.attr({ r: tyre2.attr("r") + 10})
  rim2MaskInner.attr({ r: rim2.attr("r") - 15 })
  rim2MaskOuter.attr({ r: rim2.attr("r") })
}

function pagination (page) {
$('#bik-'+ page +'PageButton').on('click', function(){
  $('#bik-Question-'+ page).show();
  $('#bik-Question-'+ page).siblings().hide();
})}
