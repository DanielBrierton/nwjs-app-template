define(function () {
    var fs = nodeRequire('fs');

    var Application = function (options) {
        var fileContents = fs.readFileSync('index.html').toString().replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        options.container.innerHTML = '<h1>index.html\'s content, read by fs: </h1>'
            + '<textarea style="width:500px;height:200px;">' + fileContents + '</textarea>'
            + '<p>We are using NW.js v' + process.versions['node-webkit'] + '.</p>';
    };

    return Application;
});
