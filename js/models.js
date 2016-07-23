var riderModel = {
  distance : {
    index : 0.2,
    measure : 25, // km
    calcMeasure : function () {
      this.measure = parseInt(Math.pow(85,this.index) + i * 115);
    }
  },
  surface : {
    index : 0.2,
    name : "city roads",
    defName : function () {
      var i = parseInt(this.index * 10);
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
        break;
        default : console.log("Something's busted...");
      }
    }
  },
  elevation : {
    index : 0.2,
    name : "a few small hills",
    defName : function () {
      var i = parseInt(this.index * 10);
      switch (i) {
        case 0 : this.name = "flat as a pancake";
        break;
        case 1 :
        case 2 : this.name = "a few small hills";
        break;
        case 3 :
        case 4 : this.name = "rolling hills";
        break;
        case 5 :
        case 6 : this.name = "backcountry climbs";
        break;
        case 7 :
        case 8 : this.name = "steep mountain passes";
        break;
        case 9 :
        case 10 : this.name = "mount everest";
        break;
        default : console.log("Something's busted...");
      }
    }
  },
  luggage : {
    index : 0.2,
    name : "1kg - jacket and tools",
    defName : function () {
      var i = parseInt(this.index * 10);
      switch (i) {
        case 0 : this.name = "0kg - empty pockets";
        break;
        case 1 : this.name = "0.5kg - tools and a patch kit";
        break;
        case 2 : this.name = "1kg - jacket and tools";
        break;
        case 3 : this.name = "2kg - jacket, tools, snacks";
        break;
        case 4 : this.name = "3kg - tiny backpack";
        break;
        case 5 : this.name = "4kg - small backpack";
        break;
        case 6 : this.name = "5kg - laptop and a change of clothes";
        break;
        case 7 : this.name = "7kg - superlight overnight kit";
        break;
        case 8 : this.name = "10kg - lightweight touring kit";
        break;
        case 9 : this.name = "20kg - heavy touring kit";
        break;
        case 10 : this.name = "30kg - four panniers and the kitchen sink";
        break;
        default : console.log("Something's busted...");
      }
    }
  },
  disposition : {
    index : 0.2,
    name : "",
    defName : function () {
      var i = parseInt(this.index * 10);
      switch (i) {
        case 0 : this.name = "super casual";
        break;
        case 1 :
        case 2 : this.name = "relaxed";
        break;
        case 3 :
        case 4 : this.name = "excitable";
        break;
        case 5 :
        case 6 : this.name = "spirited";
        break;
        case 7 :
        case 8 : this.name = "competitive";
        break;
        case 9 :
        case 10 : this.name = "permanent race face";
        break;
        default : console.log("Something's busted...");
      }
    }
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
      if (s >= 0.7 && d >= 0.9){
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
      postExt : 150,       // mm to rails
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
    },
    calcY : function () {
      this.y = bikeModel.baseline - (wheels.size / 2) - wheels.tyre.size;
    },
    calcTyreSize : function () {
      this.tyre.size = ( riderModel.surface.index * 0.7 +
                         riderModel.luggage.index * 0.2 +
                         riderModel.weight.index * 0.1 ) * 52 + 23;
    }
  }
}
