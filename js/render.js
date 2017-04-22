var render = function() {

    // Remove previous
    $("svg:last").remove();
    $("#png").attr("src", "");

    // Step 1: Prepare parameters
    var padding = 50;
    var gap = 25;

    var dot_size = $("#dot_size").val();
    var selected = $("input[type='radio'][name='group1']:checked");
    var line_color = selected.val();

    // slice
    var selected_content = content.slice($("#dots_from").val() - 1, 1 + parseInt($("#dots_to").val()));
    // console.log(line_color);
    // var gh = (n-1) * gap;

    var n = selected_content.length - 1;
    var width = ((n - 1) * gap)/2 + 2 * padding;
    if ($("#utterance:checked").val()) {
        width = ((n - 1) * gap)/2 + 1500 + 2 * padding;
    }
    var height = (n - 1) * gap + 2 * padding;
    // var n = 10;

    // var s = Snap("#svg");
    var s = Snap(width, height);
    // s.height = 2000;

    if ($("#white_background:checked").val()) {
        s.paper.rect(0, 0, width, height).attr({
            fill: "#FFF"
        });
    }

    var getX = function(i) {
        var gh = (n - 1) * gap;
        return padding + gh / 2;
    }

    var getY = function(i) {
        return padding + i * gap;
    }

    var interX = function(i, j) {
        h = (j - i) * gap;
        return getX(i) - h / 2;
    }

    var interY = function(i, j) {
        h = (j - i) * gap;
        return getY(i) + h / 2;
    }


    var dots = [];
    var lines = [];


    console.log(n);
    for (var i = 1; i < n + 1; i++) {
        // Step 2: draw dots
        // console.log(i);
        var p = selected_content[i];
        // dots.push(s.circle(getX(i), getY(i), dot_size))

        // Step 3: Draw connections
        for (var j = 2; j < p.length; j++) {
            if (p[j]) {
                // console.log(p[j]);
                lines.push(s.paper.line(getX(i), getY(i), interX(p[j], i), interY(p[j], i)).attr({
                    stroke: line_color,
                    strokeWidth: '2px'
                }));
                lines.push(s.paper.line(getX(p[j]), getY(p[j]), interX(p[j], i), interY(p[j], i)).attr({
                    stroke: line_color,
                    strokeWidth: '2px'
                }));
                // dots.push(s.circle(interX(p[j],i), interY(p[j],i), dot_size));
            }
        }

    }
    for (var i = 1; i < n + 1; i++) {
        // Step 2: draw dots
        // console.log(i);
        var p = selected_content[i];
        dots.push(s.circle(getX(i), getY(i), dot_size))
        if ($("#utterance:checked").val()) {
            s.paper.text(getX(i) + 15, getY(i) + 5, [p[0]]).attr({
                fill: '#000',
                fontFamily: 'Trebuchet MS'
            });
            s.paper.text(getX(i) + 55, getY(i) + 5, [p[1]]).attr({
                fill: '#000',
                fontFamily: 'Trebuchet MS'
            });
        }

        // Step 3: Draw connections
        for (var j = 2; j < p.length; j++) {
            if (p[j]) {
                dots.push(s.circle(interX(p[j], i), interY(p[j], i), dot_size));
            }
        }

    }

    // Step 4: File name
    var filename = document.getElementById('fileupload').value;
    filename = filename.replace(/.*[\/\\]/, '');
    s.paper.text(300, getY(n - 10), "File name: " + filename).attr({
        fill: '#000',
        fontFamily: 'Trebuchet MS',
        "font-size": "50px"
    });

    save_to_png();

    //

}
