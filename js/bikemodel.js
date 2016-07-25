var bikeModel = {

  baseline : 1146,

  handlebars : {
    type : "swept flat bars",
    drop : 0,
    x : 0,
    y : 0,
    detType : function () {
      var s = parseInt(riderModel.surface.index * 10);
      var d = parseInt(riderModel.distance.index * 10);
      if (s >= 7 && d >= 9){
        return "multiposition flats";
      } else if (s >= 7 && d < 9){
        return "wide flats";
      } else if (s >= 4 && s < 7 && d >= 5){
        return "flared drops";
      } else if (s < 4 && d >= 5){
        return "road drops";
      } else { return "swept flats" }
    },
    defDrop : function () {
      var d = riderModel.distance.index;
      var p = riderModel.disposition.index;
      var h = riderModel.height.index;
       this.drop = (0.6 * p + 0.2 * (1- d) + 0.2 * h) * (0 - 240) + 120;
    },
    calcX : function () {

    },
    calcY : function () {
      var seaty = bikeModel.seat.y;
      this.y = seaty - this.drop;
    },
    update : function () {
      this.detType();
      this.defDrop();
      this.calcX();
      this.calcY();
    }
  },

  seat : {
    height : 699,
    x: 705,
    y: 225,
    calcHeight : function () {
      this.height = riderModel.height.inseam - 100;
    },
    calcX : function () {
      this.x = bikeModel.frame.bottomBracket.x - this.height * Math.cos(bikeModel.frame.seatTube.angle);
    },
    calcY : function () {
      this.y = bikeModel.frame.bottomBracket.y - this.height * Math.sin(bikeModel.frame.seatTube.angle);
    },
    update : function () {
      this.calcHeight();
      this.calcX();
      this.calcY();
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
    },
    tyre : {
      size : 35,
      treadSize : 2,
      treadSpacing : "5, 5",
      calcSize : function () {
        this.size = ( riderModel.surface.index * 0.7 +
                      riderModel.luggage.index * 0.2 +
                      riderModel.weight.index * 0.1 ) * 52 + 23;
      },
      calcTread : function () {
        this.treadSize = riderModel.surface.index * 5;
        if (this.treadSize >= 3) { this.treadSpacing = "10, 10"};
      }
    },
    calcY : function () {
      this.y = bikeModel.baseline - (wheels.size / 2) - wheels.tyre.size;
    }
  }
}
