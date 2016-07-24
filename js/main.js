// default specs
var tyreSize = 35;


// 73deg in radians
var seatTubeAngle = 1.27409

var bottomBracketOriginX = 913;
var bottomBracketOriginY = 905;


var wheelSize = 622;
var tyreTreadSize = 2;
var tyreTreadSpacing = "5, 5";

// default svg attributes
var tyreColour = "#222";
var rimColour = "#000";

// creates the drawing surface
var s = Snap("#svg");


// draw front wheel
var tyre1 = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var tyre1MaskInner = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var tyre1MaskOuter = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var tyre1Mask = s.group(tyre1MaskOuter, tyre1MaskInner);
var tyre1Tread = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var rim1 = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var rim1MaskInner = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var rim1MaskOuter = s.circle(bikeModel.wheels.frontWheel.x,bikeModel.wheels.y,0);
var rim1Mask = s.group(rim1MaskOuter, rim1MaskInner);

var frontWheel = s.group( tyre1,
                          tyre1Mask,
                          tyre1Tread,
                          rim1,
                          rim1Mask
                        );

// draw rear wheel
var tyre2 = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);
var tyre2MaskInner = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);
var tyre2MaskOuter = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);
var tyre2Mask = s.group(tyre2MaskOuter, tyre2MaskInner);

var tyre2Tread = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);

var rim2 = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);
var rim2MaskInner = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);
var rim2MaskOuter = s.circle(bikeModel.wheels.rearWheel.x,bikeModel.wheels.y,0);
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

$('.bik-PageControls-Next').on('click', function(){
  var v = $('.visible');
  var next = $('.visible').next();
  next.addClass('visible').removeClass('hidden');
  v.addClass('hidden').removeClass('visible');
})

Snap.load("img/handlebars-drop.svg", function (f) {
  s.append(f);
});

Snap.load("img/saddle.svg", function (f) {
  s.append(f);

});


  $('#bik-DistanceInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-DistanceInput-Control'));
      // Update riderModel
      riderModel.distance.update(i);
      // Trigger feedback
      $('#bik-DistanceInput-Counter').text(riderModel.distance.measure);
      // Update bikeModel
      bikeModel.handlebars.update();
      // Redraw SVG
      $('#handlebars-drop').attr('y', bikeModel.handlebars.y);
  });

  $('#bik-SurfaceInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-SurfaceInput-Control'));
      // Update riderModel
      riderModel.surface.update(i);
      // Trigger feedback
      $('#bik-SurfaceInput-Text').text(riderModel.surface.name);
      // Update bikeModel
      bikeModel.wheels.calcTyreSize();
      // Redraw SVG
      updateWheelAndTyre(bikeModel.wheels.tyre.size, bikeModel.wheels.size);
  });

  $('#bik-ElevationInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-ElevationInput-Control'));
      // Update riderModel
      riderModel.elevation.update(i);
      // Trigger feedback
      $('#bik-ElevationInput-Text').text(riderModel.elevation.name);
      // Update bikeModel
      // Redraw SVG
  });

  $('#bik-LuggageInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-LuggageInput-Control'));
      // Update riderModel
      riderModel.luggage.update(i);
      // Trigger feedback
      $('#bik-LuggageInput-Text').text(riderModel.luggage.name);
      // Update bikeModel
      // Redraw SVG
  });

  $('#bik-DispositionInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-DispositionInput-Control'));
      // Update riderModel
      riderModel.disposition.update(i);
      // Trigger feedback
      $('#bik-DispositionInput-Text').text(riderModel.disposition.name);
      // Update bikeModel
      bikeModel.handlebars.update();
      // Redraw SVG
      $('#handlebars-drop').attr('y', bikeModel.handlebars.y);
  });

  $('#bik-WeightInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-WeightInput-Control'));
      // Update riderModel
      riderModel.weight.update(i);
      // Trigger feedback
      $('#bik-WeightInput-Counter').text(riderModel.weight.measure);
      // Update bikeModel
      // Redraw SVG
  });

  $('#bik-HeightInput-Control').on("input", function() {
      // Capture input
      var i = getValue ($('#bik-HeightInput-Control'));
      // Update riderModel
      riderModel.height.update(i);
      // Trigger feedback
      $('#bik-HeightInput-Counter').text(parseInt(riderModel.height.measure / 10));
      // Update bikeModel
      bikeModel.seat.update();
      bikeModel.handlebars.update();
      // Redraw SVG
      $('#saddle').attr('x', bikeModel.seat.x - 108).attr('y', bikeModel.seat.y - 10); // origin at (100,10)
      $('#handlebars-drop').attr('y', bikeModel.handlebars.y);
  });
});


// FUNCTIONS

// gets input from and returns it for use elsewhere
function getValue (el) {
  var i = (el).val();
  return i;
}

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
  $('#bik-Question-'+ page).removeClass('hidden').addClass('visible');
  $('#bik-Question-'+ page).siblings().addClass('hidden').removeClass('visible');
})}
