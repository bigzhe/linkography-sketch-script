var save_to_png = function() {
  // Get the SVG element
  var svg = document.querySelector("svg")
  // document.getElementById("svg");
  // var svg = $("svg:first");
  console.log(svg);


  svg.toDataURL("image/png", {
      callback : function(data) {
          document.querySelector("#png").setAttribute("src", data)
          // document.querySelector("#downloadBtn").setAttribute("href", data)
          $("svg:last").remove();
      }
  });

}
