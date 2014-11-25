var window = self;
var document = self.document;
importScripts("/js/paper.js");
onmessage = function(event) {
    if(event.type==="progress") {
        var path = event.external_paths[event.artist];

        // The path hasnt already been started
        // So start it
        if (!path) {

            // Creates the path in an easy to access way
            event.external_paths[event.artist] = new Path();
            path = event.external_paths[event.artist];

            // Starts the path
            var start_point = new Point(event.points.start[1], event.points.start[2]);
            var color = new RgbColor(event.points.rgba.red, event.points.rgba.green, event.points.rgba.blue, event.points.rgba.opacity);
            if(event.points.tool == "draw"){
                path.fillColor = color;
            }
            else if(event.points.tool == "pencil"){
                path.strokeColor = color;
                path.strokeWidth = 2;
            }

            path.name = event.points.name;
            path.add(start_point);

        }

        // Draw all the points along the length of the path
        var paths = event.points.path;
        var length = paths.length;
        for (var i = 0; i < length; i++) {

            path.add(new Point(paths[i].top[1], paths[i].top[2]));
            path.insert(0, new Point(paths[i].bottom[1], paths[i].bottom[2]));

        }

        var sendData = {
            path : path,
            type : "progress"
        };
        postMessage(sendData);
    }
    else if (event.type==="end"){
        var path = event.external_paths[event.artist];

        if (path) {

            // Close the path
            path.add(new Point(event.points.end[1], event.points.end[2]));
            path.closed = true;

            var sendData = {
                path : path,
                type : "end"
            };

            postMessage(sendData);

        }
    }

}
