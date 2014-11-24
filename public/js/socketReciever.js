var external_paths = {};
// Ends a path
var end_external_path = function (points, artist) {

    var path = external_paths[artist];

    if (path) {

        // Close the path
        path.add(new Point(points.end[1], points.end[2]));
        path.closed = true;
        path.smooth();
        view.draw();

        // Remove the old data
        external_paths[artist] = false;

    }

};

// Continues to draw a path in real time
var progress_external_path = function (points, artist) {

    var path = external_paths[artist];

    // The path hasnt already been started
    // So start it
    if (!path) {

        // Creates the path in an easy to access way
        external_paths[artist] = new Path();
        path = external_paths[artist];

        // Starts the path
        var start_point = new Point(points.start[1], points.start[2]);
        var color = new RgbColor(points.rgba.red, points.rgba.green, points.rgba.blue, points.rgba.opacity);
        if(points.tool == "draw"){
            path.fillColor = color;
        }
        else if(points.tool == "pencil"){
            path.strokeColor = color;
            path.strokeWidth = 2;
        }

        path.name = points.name;
        path.add(start_point);

    }

    // Draw all the points along the length of the path
    var paths = points.path;
    var length = paths.length;
    for (var i = 0; i < length; i++) {

        path.add(new Point(paths[i].top[1], paths[i].top[2]));
        path.insert(0, new Point(paths[i].bottom[1], paths[i].bottom[2]));

    }

    path.smooth();
    view.draw();

};

onmessage = function(event) {
    if(event.type==="progress") {
        progress_external_path(JSON.parse(event.data), event.artist)
    }
    else if (event.type==="end"){
        end_external_path(JSON.parse(event.data), event.artist);
    }

}
