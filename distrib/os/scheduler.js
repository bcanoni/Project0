///<reference path="pcb.ts" />
///<reference path="../globals.ts" />
/*
Comments
*/
var TSOS;
(function (TSOS) {
    var Scheduler = (function () {
        function Scheduler(readyQueue, residentQueue, terminatedQueue, counter, quantum) {
            if (readyQueue === void 0) { readyQueue = []; }
            if (residentQueue === void 0) { residentQueue = []; }
            if (terminatedQueue === void 0) { terminatedQueue = []; }
            if (counter === void 0) { counter = 0; }
            if (quantum === void 0) { quantum = 6; }
            this.readyQueue = readyQueue;
            this.residentQueue = residentQueue;
            this.terminatedQueue = terminatedQueue;
            this.counter = counter;
            this.quantum = quantum;
        }
        Scheduler.prototype.loadProgMem = function (program) {
            var curPCB = new TSOS.PCB();
            curPCB.pid = _PID;
            _MemManager.loadProgram(program, curPCB);
        };
        Scheduler.prototype.runAProgram = function (pid) {
            //relates to single run function
            _PCB = this.residentQueue[pid];
            _PCB.state = 2; //running	
            //ADD to readyQueue;
            this.readyQueue.push(_PCB);
            //clear cpu values
            _CPU.clearCpu();
            _CPU.isExecuting = true;
            this.addRow();
        };
        Scheduler.prototype.validPID = function (pid) {
            if (this.residentQueue[pid] != null)
                return true;
            return false;
        };
        Scheduler.prototype.runAllPrograms = function () {
            //relates to new run all method
            //REM will use some kind of ROUND ROBIN scheduling 
            //ALL PROGRAMS IN RESIDENT QUEUE ACTIVATE AND PUT IN READY QUEUE
            for (var a = 0; a < this.residentQueue.length; a++) {
                var temp = this.residentQueue[a];
                this.residentQueue.pop();
                this.readyQueue.push(temp);
            }
            this.readyQueue.push(temp);
            //TODO FLESH OUT SWITCHER PROGRAM TO SWITCH BASED ON SET QUANTUM 
            _PCB = temp;
            _CPU.clearCpu();
            _CPU.isExecuting = true;
        };
        Scheduler.prototype.switcher = function () {
            //EACH CPU CYCLE
            this.counter++;
            //alert (this.readyQueue);
            if (this.counter >= this.quantum) {
                //get index by finding index of pcb in ready queue
                var curIndex = this.readyQueue.indexOf(_PCB);
                //alert(curIndex);
                var nextPCB;
                //get next pcb in list				
                //go to start of list if reached end
                if (curIndex == 0) {
                    curIndex = 1;
                }
                else if (curIndex == 1) {
                    curIndex = 2;
                }
                else if (curIndex == 2) {
                    curIndex = 0;
                }
                nextPCB = this.readyQueue[curIndex];
                _PCB = nextPCB;
                _CPU.switchTo(nextPCB);
                this.counter = 0;
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
            for (var x = 0; x < this.readyQueue.length; x++) {
                if (this.readyQueue[x] != null) {
                    var cell = document.getElementById("" + this.readyQueue[x].pid + "pid");
                    cell.innerHTML = "" + this.readyQueue[x].pid;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "PC");
                    cell.innerHTML = "" + this.readyQueue[x].PC;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "Acc");
                    cell.innerHTML = "" + this.readyQueue[x].Acc;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "Xreg");
                    cell.innerHTML = "" + this.readyQueue[x].Xreg;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "Yreg");
                    cell.innerHTML = "" + this.readyQueue[x].Yreg;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "Zflag");
                    cell.innerHTML = "" + this.readyQueue[x].Zflag;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "base");
                    cell.innerHTML = "" + this.readyQueue[x].base;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "limit");
                    cell.innerHTML = "" + this.readyQueue[x].limit;
                    cell = document.getElementById("" + this.readyQueue[x].pid + "state");
                    cell.innerHTML = "" + this.readyQueue[x].state;
                }
            }
        };
        Scheduler.prototype.addRow = function () {
            //last row in ready Queue is new
            //need to give it html tag to refer to and add it to table 
            //this.readyQueue[this.readyQueue.length-1];
            var temppid = this.readyQueue[0].pid;
            var thePcb = this.readyQueue[0];
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
