exports.Utils = {
    parseRange: function (str, size) {
        var range = str.split('-');
        var start = parseInt(range[0], 10);
        var end = parseInt(range[1], 10);
        if (isNaN(end)) {
            end = size - 1;
        }
        if (isNaN(start)) {
            start = 0;
        }
        return {
            start: start,
            end: end
        };
    }
};