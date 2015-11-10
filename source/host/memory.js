///<reference path="../globals.ts" />
///<reference path="../os/memorymanager.ts" />
/*
Brian Canoni Memory


*/
var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(sizeMem, Data) {
            if (sizeMem === void 0) { sizeMem = 0; }
            if (Data === void 0) { Data = null; }
            this.sizeMem = sizeMem;
            this.Data = Data;
        }
        Memory.prototype.init = function () {
            this.sizeMem = 768;
            this.Data = new Array(768);
            //populate the mem table 
            for (var x = 0; x < this.sizeMem; x++) {
                this.Data[x] = "00";
            }
            _MemManager = new TSOS.MemoryManager();
            _MemManager.initMemoryTable();
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
