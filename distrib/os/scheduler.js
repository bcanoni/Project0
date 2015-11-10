///<reference path="pcb.ts" />
///<reference path="../globals.ts" />
/*
Comments
*/
var TSOS;
(function (TSOS) {
    var Scheduler = (function () {
        function Scheduler(readyQueue, residentQueue, terminatedQueue, counter) {
            if (readyQueue === void 0) { readyQueue = []; }
            if (residentQueue === void 0) { residentQueue = []; }
            if (terminatedQueue === void 0) { terminatedQueue = []; }
            if (counter === void 0) { counter = 0; }
            this.readyQueue = readyQueue;
            this.residentQueue = residentQueue;
            this.terminatedQueue = terminatedQueue;
            this.counter = counter;
        }
        Scheduler.prototype.loadProgMem = function (program) {
            var curPCB = new TSOS.PCB();
            curPCB.pid = _PID;
            curPCB.base = _MemManager.firstFreePartition() * 256;
            curPCB.limit = curPCB.base + 255;
            this.residentQueue.push(curPCB);
            _MemManager.loadProgram(program, curPCB);
        };
        Scheduler.prototype.runAProgram = function (pid) {
            //relates to single run function
            _PCB = this.residentQueue[pid];
            //clear cpu values
            _CPU.clearCpu();
            //dont need to run on pid yet but keep that in mind for later
            _CPU.isExecuting = true;
        };
        Scheduler.prototype.validPID = function (pid) {
            if (this.residentQueue[pid] != null)
                return true;
            return false;
        };
        Scheduler.prototype.runAllPrograms = function () {
            //relates to new run all method
            //REM will use some kind of ROUND ROBIN scheduling 
        };
        return Scheduler;
    })();
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
