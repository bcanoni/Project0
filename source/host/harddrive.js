///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var HardDrive = (function () {
        //What is a track?
        //what is a sector?
        //what is a block?
        function HardDrive(tracks, sectors, blocks) {
            if (tracks === void 0) { tracks = 0; }
            if (sectors === void 0) { sectors = 0; }
            if (blocks === void 0) { blocks = 128; }
            this.tracks = tracks;
            this.sectors = sectors;
            this.blocks = blocks;
        }
        HardDrive.prototype.write = function (t, s, b, data) {
            var key = this.getKey(t, s, b);
            sessionStorage.setItem(key, data);
        };
        HardDrive.prototype.read = function (t, s, b) {
            var key = this.getKey(t, s, b);
            sessionStorage.getItem(key);
        };
        HardDrive.prototype.getKey = function (t, s, b) {
            return t + ":" + s + ":" + b;
        };
        return HardDrive;
    })();
    TSOS.HardDrive = HardDrive;
})(TSOS || (TSOS = {}));
