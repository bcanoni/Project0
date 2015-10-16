/*
comments

*/
var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(sizeMem) {
            this.sizeMem = sizeMem;
            this.Data = new Array(sizeMem);
            this.init();
        }
        Memory.prototype.init = function () {
            for (var x = 0; x < this.sizeMem; x++) {
                this.Data[x] = "00";
            }
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
