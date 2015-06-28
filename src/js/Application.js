define(function () {
    var Application = function (options) {
        options.container.innerHTML = '<h1>Hello World!</h1>'
            + 'We are using NW.js v' + process.versions['node-webkit'] + '.';
    };

    return Application;
});
