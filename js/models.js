var riderModel = {
  distance : {
    index : 0.2,
    measure : 25, // km
    calcMeasure : function () {
      this.measure = parseInt(Math.pow(85,this.index) + i * 115);
    }
  },
  surface : {
    index : 0.2
    name : "city roads"
    defName : function () {
      var i = parseInt(this.index * 10)
      switch (i) {
        case 0 : this.name = "super-smooth indoor tracks";
        break;
        case 1 : this.name = "fresh bitumen";
        break;
        case 2 : this.name = "city roads";
        break;
        case 3 : this.name = "country roads";
        break;
        case 4 : this.name = "gravel roads and rail trails";
        break;
        case 5 : this.name = "dirt roads";
        break;
        case 6 : this.name = "rocky roads";
        break;
        case 7 : this.name = "smooth mountainbike trails";
        break;
        case 8 : this.name = "rough mountainbike trails";
        break;
        case 9 : this.name = "rough trails with jumps and drops";
        break;
        case 10 : this.name = "extreme obstacles";
        default : console.log("Something's busted...");
      }
    }
  },
  elevation : {
    index : 0.2
  },
  luggage : {
    index : 0.2
  },
  disposition : {
    index : 0.2
  },
  height : {
    index : 0.5,
    measure : 1700, // mm
    inseam : 799, // mm
    calcMeasure : function () {
      this.measure = parseInt(this.index * 550 + 1450);
    },
    calcInseam : function (){
      var h = this.measure;
      if (h <= 1500) {
        this.inseam = h * 0.45;
      } else if (h > 1800) {
        this.inseam = h * 0.50;
      } else { this.inseam = h * 0.47; }
    }
  },
  weight : {
    index : 0.5,
    measure : 80, // kg
    calcMeasure : function () {
      this.measure = parseInt(this.index * 70 + 45);
    }
  }
}

 var bikeModel = {

  baseline : 1146,

  handlebars : {
    type : "swept flat bars",
    detType : function () {
      var s = riderModel.surface.index;
      var d = riderModel.distance.index;
      if ( if (s >= 0.7 && d >= 0.9){
        return "multiposition flats";
      } else if (s >= 0.7 && d < 0.9){
        return "wide flats";
      } else if (s >= 0.4 && s < 0.7 && d >= 0.5){
        return "flared drops";
      } else if (s < 0.4 && d >= 0.5){
        return "road drops";
      } else { return "swept flats" }
    }
  },

  seat : {
    height : 699,
    x: 0,
    y: 0,
    calcHeight : function () {
      this.height = riderModel.height.inseam - 100;
    },
    calcX : function () {
      this.x = bikeModel.frame.bottomBracket.x - this.height * Math.cos(bikeModel.frame.seatTube.angle);
    },
    calcY : function () {
      this.y = bikeModel.frame.bottomBracket.y - this.height * Math.sin(bikeModel.frame.seatTube.angle);
    }
  },

  frame : {

    bottomBracket : {
      height: 275,
      x : 913,
      y : 905,
      calcY : function () {
        this.x = bikeModel.baseline - this.height;
      }
    },

    seatTube : {
      postExt : 150       // mm to rails
      length : 549,       // mm, c to t
      angle : 1.27409,    // radians
      // x1 and y1 are bb coordinates
      x2 : 771,
      y2 : 395,
      calcPostExt : function () {
        if (riderModel.surface.index <= 0.4) { this.postExt = 150
        } else { this.postExt = riderModel.surface.index * 300 + 30 };
      },
      calcLength : function () {
        this.length = bikeModel.seat.height - this.postExt;
      },
      calcX2 : function () {
        this.x2 = bikeModel.frame.bottomBracket.x - this.length * Math.cos(this.angle);
      },
      calcY2 : function () {
        this.y2 = bikeModel.frame.bottomBracket.y - this.length * Math.sin(this.angle);
      }
    }
  },

  wheels : {
    y : 800,
    calcY : function () {
      this.y = bikeModel.baseline - (wheels.size / 2) - wheels.tyre.size;
    },
    size : 622,
    frontWheel : {
      x : 1488
    },
    rearWheel : {
      x : 500
    },
    rim : {
      profile : 30,
      colour : "#000"
    },
    tyre : {
      size : 35,
      treadSize : 2,
      treadSpacing : "5, 5",
      colour : "#222"
    }
  }
}
