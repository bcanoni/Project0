///<reference path="pcb.ts" />
///<reference path="../globals.ts" />
/*
Comments
*/
var TSOS;
(function (TSOS) {
    var scheduler = (function () {
        function scheduler(readyQueue, residentQueue, terminatedQueue, counter) {
            if (readyQueue === void 0) { readyQueue = []; }
            if (residentQueue === void 0) { residentQueue = []; }
            if (terminatedQueue === void 0) { terminatedQueue = []; }
            if (counter === void 0) { counter = 0; }
            this.readyQueue = readyQueue;
            this.residentQueue = residentQueue;
            this.terminatedQueue = terminatedQueue;
            this.counter = counter;
        }
        scheduler.prototype.loadProgMem = function (program) {
            var curPCB = new TSOS.PCB();
            curPCB.base = _MemManager.firstFreePartition() * 256;
            curPCB.limit = curPCB.base + 255;
            this.residentQueue.push(curPCB);
        };
        scheduler.prototype.runAProgram = function () {
            //relates to single run function
        };
        scheduler.prototype.runAllPrograms = function () {
            //relates to new run all method
            //REM will use some kind of ROUND ROBIN scheduling 
        };
        return scheduler;
    })();
    TSOS.scheduler = scheduler;
})(TSOS || (TSOS = {}));
