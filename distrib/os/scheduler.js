///<reference path="pcb.ts" />
///<reference path="queue.ts" />
///<reference path="../globals.ts" />
/*
Comments
*/
var TSOS;
(function (TSOS) {
    var Scheduler = (function () {
        function Scheduler(readyQueue, residentQueue, terminatedQueue, counter, quantum, mode) {
            if (readyQueue === void 0) { readyQueue = new TSOS.Queue(); }
            if (residentQueue === void 0) { residentQueue = new TSOS.Queue(); }
            if (terminatedQueue === void 0) { terminatedQueue = new TSOS.Queue(); }
            if (counter === void 0) { counter = 0; }
            if (quantum === void 0) { quantum = 6; }
            if (mode === void 0) { mode = 1; }
            this.readyQueue = readyQueue;
            this.residentQueue = residentQueue;
            this.terminatedQueue = terminatedQueue;
            this.counter = counter;
            this.quantum = quantum;
            this.mode = mode;
        }
        Scheduler.prototype.loadProgMem = function (program) {
            var curPCB = new TSOS.PCB();
            curPCB.pid = _PID;
            _MemManager.loadProgram(program, curPCB);
        };
        Scheduler.prototype.runAProgram = function (pid) {
            //relates to single run function
            var pos = 0;
            for (var x = 0; x < this.residentQueue.getSize(); x++) {
                if (this.residentQueue.q[x].pid == pid) {
                    pos = x;
                }
            }
            _PCB = this.residentQueue.q[pos];
            _PCB.state = 2; //running	
            //ADD to readyQueue;
            this.readyQueue.enqueue(_PCB);
            //clear cpu values
            _CPU.clearCpu();
            _CPU.isExecuting = true;
            this.addRow(_PCB);
        };
        Scheduler.prototype.validPID = function (pid) {
            //PID != pos in queue
            var out = false;
            for (var x = 0; x < this.residentQueue.getSize(); x++) {
                if (this.residentQueue.q[x].pid == pid) {
                    out = true;
                }
            }
            return out;
        };
        Scheduler.prototype.runAllPrograms = function () {
            //relates to new run all method
            //REM will use some kind of ROUND ROBIN scheduling 
            //ALL PROGRAMS IN RESIDENT QUEUE ACTIVATE AND PUT IN READY QUEUE
            while (!this.residentQueue.isEmpty()) {
                var temp = this.residentQueue.dequeue();
                this.readyQueue.enqueue(temp);
                this.addRow(temp);
            }
            _PCB = temp;
            _CPU.clearCpu();
            _CPU.isExecuting = true;
        };
        Scheduler.prototype.switcher = function () {
            if (this.mode == 1 || this.mode == 3) {
                //EACH CPU CYCLE
                this.counter++;
                //alert (this.readyQueue);
                if (this.counter >= this.quantum) {
                    //get next pcb in list	
                    var nextPCB = this.readyQueue.dequeue();
                    //PUT OLD PCB AT END OF QUEUE/ BOTTOM
                    this.readyQueue.q.push(_PCB);
                    _PCB = nextPCB;
                    _CPU.switchTo(nextPCB);
                    this.counter = 0;
                }
                if (this.readyQueue.isEmpty()) {
                    _CPU.isExecuting = false;
                }
            }
            else if (this.mode == 2) {
                if (_PCB.state == 3) {
                    // process terminated
                    _PCB = nextPCB;
                    _CPU.switchTo(nextPCB);
                    if (this.readyQueue.isEmpty()) {
                        _CPU.isExecuting = false;
                    }
                }
            }
        };
        Scheduler.prototype.updatePCBTable = function () {
            //IF PCB IS STATE READY MOVE TO READYQUEUE
            //ONCE THERE IT IS UPDATED TO TABLE AND HAS ITS OWN HTML ID's FOR REFERENCE 
            //THE CODE I WILL USE FOR THIS IS
            //   pid + (column name) 
            //EX     pid+pid , pid+PC , + pid+ACC
            //DISPLAY ONLY  (running) PCB's
            //row name
            var x = 0;
            while (x < this.readyQueue.getSize()) {
                var cell = document.getElementById("" + this.readyQueue.q[x].pid + "pid");
                cell.innerHTML = "" + this.readyQueue.q[x].pid;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "PC");
                cell.innerHTML = "" + this.readyQueue.q[x].PC;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "Acc");
                cell.innerHTML = "" + this.readyQueue.q[x].Acc;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "Xreg");
                cell.innerHTML = "" + this.readyQueue.q[x].Xreg;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "Yreg");
                cell.innerHTML = "" + this.readyQueue.q[x].Yreg;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "Zflag");
                cell.innerHTML = "" + this.readyQueue.q[x].Zflag;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "base");
                cell.innerHTML = "" + this.readyQueue.q[x].base;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "limit");
                cell.innerHTML = "" + this.readyQueue.q[x].limit;
                cell = document.getElementById("" + this.readyQueue.q[x].pid + "state");
                cell.innerHTML = "" + this.readyQueue.q[x].state;
                x++;
            }
        };
        Scheduler.prototype.addRow = function (temp) {
            //last row in ready Queue is new
            //need to give it html tag to refer to and add it to table 
            //this.readyQueue[this.readyQueue.length-1];
            var temppid = temp.pid;
            var thePcb = temp;
            var readyTable = document.getElementById("readyQueueTable");
            var footer = readyTable.createTFoot();
            var row = footer.insertRow(0);
            row.id = "PCB" + temppid;
            var cell = row.insertCell(0);
            cell.id = temppid + "pid";
            cell.innerHTML = "" + thePcb.pid;
            cell = row.insertCell(1);
            cell.id = temppid + "PC";
            cell.innerHTML = "" + thePcb.PC;
            cell = row.insertCell(2);
            cell.id = temppid + "Acc";
            cell.innerHTML = "" + thePcb.Acc;
            cell = row.insertCell(3);
            cell.id = temppid + "Xreg";
            cell.innerHTML = "" + thePcb.Xreg;
            cell = row.insertCell(4);
            cell.id = temppid + "Yreg";
            cell.innerHTML = "" + thePcb.Yreg;
            cell = row.insertCell(5);
            cell.id = temppid + "Zflag";
            cell.innerHTML = "" + thePcb.Zflag;
            cell = row.insertCell(6);
            cell.id = temppid + "base";
            cell.innerHTML = "" + thePcb.base;
            cell = row.insertCell(7);
            cell.id = temppid + "limit";
            cell.innerHTML = "" + thePcb.limit;
            cell = row.insertCell(8);
            cell.id = temppid + "state";
            cell.innerHTML = "" + thePcb.state;
        };
        Scheduler.prototype.removeRow = function (x) {
            var readyTable = document.getElementById("readyQueueTable");
            readyTable.deleteRow(x);
        };
        return Scheduler;
    })();
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
