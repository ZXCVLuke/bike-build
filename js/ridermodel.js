var riderModel = {
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
    },
    update : function (val) {
      riderModel.disposition.index = val;
      riderModel.disposition.defName();
    }
  },
  distance : {
    index : 0.2,
    measure : 25, // km
    calcMeasure : function () {
      this.measure = parseInt(Math.pow(85,this.index) + this.index * 115);
    },
    update : function (val) {
      riderModel.distance.index = val;
      riderModel.distance.calcMeasure();
    },
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
    },
    update : function (val) {
      riderModel.elevation.index = val;
      riderModel.elevation.defName();
    }
  },
  height : {
    index : 0.5,
    measure : 1700, // mm
    inseam : 799, // mm
    reach : 0, // mm
    calcMeasure : function () {
      this.measure = parseInt(this.index * 550 + 1450);
    },
    calcInseam : function () {
      var h = this.measure;
      if (h <= 1500) {
        this.inseam = h * 0.45;
      } else if (h > 1800) {
        this.inseam = h * 0.50;
      } else { this.inseam = h * 0.47; }
    },
    update : function (val) {
      this.index = val;
      this.calcMeasure();
      this.calcInseam();
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
    },
    update : function (val) {
      riderModel.luggage.index = val;
      riderModel.luggage.defName();
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
    },
    update : function (val) {
      riderModel.surface.index = val;
      riderModel.surface.defName();
    }
  },
  weight : {
    index : 0.5,
    measure : 80, // kg
    calcMeasure : function () {
      this.measure = parseInt(this.index * 70 + 45);
    },
    update : function (val) {
      riderModel.weight.index = val;
      riderModel.weight.calcMeasure();
    }
  }
}
