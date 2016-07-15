Var Profile = {
  prototype : {
    profile : {
      // Set up defaults
      disposition : 0.3,
      distance :    0.2,
      elevation :   0.3,
      fitness :     0.3,
      height :      0.5,
      load :        0.3,
      strength :    0.3,
      surface :     0.3,
      weight :      0.5
    }
  },


// handlebar type selection

handlebarSelect : function( distance, surface ){
  if (surface >= 0.7 && distance >= 0.9){
    return "multiposition flat bars";
  } else if (surface >= 0.7 && distance < 0.9){
    return "wide flat bars";
  } else if (surface >= 0.4 && surface < 0.7 && distance >= 0.5){
    return "flared drops";
  } else if (surface < 0.4 && distance >= 0.5){
    return "road drops";
  } else { return "swept flat bars" }
}




}
