///<reference path="../globals.ts" />
/// <reference path="./PCB.ts"/>
/// <reference path="../host/memory.ts"/>
/*
Brian Canoni
MemoryManager
*/
var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        //load 		
        MemoryManager.prototype.loadProgram = function (program) {
            // IF 1,2,3 HAVE MEMORY IN THEM
            // TODO WIPE NEXT IN CHAIN AND LOAD
            //FOR NOW JUST LOAD UNTIL NULL AND THEN THROW ERROR
            var firstFree = this.firstFreePartition();
            var curPCB = _PCB;
            //IF NULL MEMORY FULL
            if (firstFree != null) {
                curPCB = new TSOS.PCB();
                curPCB.base = this.firstFreePartition();
                //wipe memory
                this.wipeMem(curPCB);
                //populate
                //this.populateMem(curPCB, program);	
                this.populateMem(curPCB, program);
            }
            else {
            }
            this.updateMemoryTable();
        };
        MemoryManager.prototype.insertMemory = function (x, dat) {
            _Memory.Data[x] = dat;
        };
        MemoryManager.prototype.getMemory = function (x) {
            return _Memory.Data[x];
        };
        //Wipes only a specific partition
        MemoryManager.prototype.wipeMem = function (curPCB) {
            for (var i = curPCB.base; i < curPCB.length; i++) {
                _Memory.Data[i] = "00";
            }
        };
        //clears all mem 
        MemoryManager.prototype.clearMem = function () {
            for (var x = 0; x < _Memory.sizeMem; x++) {
                _Memory.Data[x] = "00";
            }
            this.updateMemoryTable();
        };
        MemoryManager.prototype.populateMem = function (curPCB, program) {
            var index = curPCB.base;
            for (var c = 0; c < program.length; c += 2) {
                _Memory.Data[index] = program.charAt(c) + program.charAt(c + 1);
                index++;
            }
        };
        MemoryManager.prototype.firstFreePartition = function () {
            if (_Memory.Data[0] == ("00"))
                return 0;
            else if (_Memory.Data[256] == ("00"))
                return 1;
            else if (_Memory.Data[513] == ("00"))
                return 2;
            else
                null;
        };
        MemoryManager.prototype.toAddress = function () {
            var index;
            _CPU.PC++;
            var b = _Memory.Data[_CPU.PC];
            _CPU.PC++;
            var a = String(_Memory.Data[_CPU.PC]);
            var address = String(String(a).concat(String(b)));
            index = parseInt(address, 16);
            return index;
        };
        MemoryManager.prototype.updateMemoryTable = function () {
            //var memoryIndex=0;
            //var rowIndex;
            //var colIndex;			
            //EACH ROW HAS AN ID   'row0' row + row num
            //EACH CELL HAS AN ID 'cell00'  cell + row num + cell num 0-7
            // EVERY 100 (in hex ) IS A PARTITION
            var curRow = 0;
            var curCell = 7;
            for (var z = 0; z < _Memory.sizeMem; z++) {
                var temp = String(_Memory.Data[z]);
                temp.toUpperCase();
                if (temp.length == 1)
                    temp += "0";
                var cell = document.getElementById("cell" + curRow + "" + curCell);
                cell.innerHTML = temp;
                curCell--;
                if (curCell < 0) {
                    curRow += 8;
                    curCell = 7;
                }
            }
        };
        MemoryManager.prototype.initMemoryTable = function () {
            var memTable = document.getElementById("memTable");
            //row name
            for (var x = _Memory.sizeMem; x >= 0; x -= 8) {
                var footer = memTable.createTFoot();
                var row = footer.insertRow(0);
                row.id = "row" + x;
                //each of 8 bits		
                for (var y = 0; y < 8; y++) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = "00";
                    cell.id = "cell" + x + "" + y;
                    _Memory.Data[y] = "00";
                }
                var cell = row.insertCell(0);
                cell.innerHTML = ("0x" + x.toString(16));
            }
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
