
// sets default sizes
var tyreSize = 35
var wheelSize = 622
var tyreTreadSize = 2
var tyreTreadSpacing = "5, 5"
var tyreColour = "#111"
var rimColour = "#000"


// creates the drawing surface
var s = Snap("#svg");

// draw front wheel
var tyre1 = s.circle(1488,800,0);
var tyre1MaskInner = s.circle(1488,800,0);
var tyre1MaskOuter = s.circle(1488,800,0);
var tyre1Mask = s.group(tyre1MaskOuter, tyre1MaskInner);

var tyre1Tread = s.circle(1488,800,0);

var rim1 = s.circle(1488,800,0);
var rim1MaskInner = s.circle(1488,800,0);
var rim1MaskOuter = s.circle(1488,800,0);
var rim1Mask = s.group(rim1MaskOuter, rim1MaskInner);

// draw rear wheel
var tyre2 = s.circle(500,800,0);
var tyre2MaskInner = s.circle(500,800,0);
var tyre2MaskOuter = s.circle(500,800,0);
var tyre2Mask = s.group(tyre2MaskOuter, tyre2MaskInner);

var rim2 = s.circle(500,800,0);
var rim2MaskInner = s.circle(500,800,0);
var rim2MaskOuter = s.circle(500,800,0);
var rim2Mask = s.group(rim2MaskOuter, rim2MaskInner);



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
    tyreTreadSize = t * 20;

    if ( t => 0 && t < 0.1 ){
      tyreTreadSpacing = "0, 0"
    } if ( t => 0.1 && t < 0.4 ){
      tyreTreadSpacing = "5, 5"
    } if ( t => 0.4 && t < 0.6){
      tyreTreadSpacing = "10, 10"
    } if ( t => 0.6 && t < 0.8){
      tyreTreadSpacing = "15, 15"
    } else { tyreTreadSpacing = "20, 20" };

    console.log(t < 0.1);
    console.log(tyreTreadSpacing);

    // updates the svg, hopefully...
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

  // Snap.load("img/svgbike001.svg", function (f) {
  //   s.append(f);
  // });



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
}

function updateWheelAndTyre (tyreSize, wheelSize) {
  tyre1.attr({ r: wheelSize / 2 + (tyreSize) });
  tyre1Tread.attr({ r: tyre1.attr("r") })
  rim1.attr({ r: wheelSize / 2 + 7 });
  tyre1MaskInner.attr({ r: rim1.attr("r") - 2 })
  tyre1MaskOuter.attr({ r: tyre1.attr("r") })
  rim1MaskInner.attr({ r: rim1.attr("r") - 15 })
  rim1MaskOuter.attr({ r: rim1.attr("r") })
  tyre2.attr({ r: wheelSize / 2 + (tyreSize) });
  rim2.attr({ r: wheelSize / 2 + 7 });
  tyre2MaskInner.attr({ r: rim2.attr("r") - 2 })
  tyre2MaskOuter.attr({ r: tyre2.attr("r") })
  rim2MaskInner.attr({ r: rim2.attr("r") - 15 })
  rim2MaskOuter.attr({ r: rim2.attr("r") })
}
