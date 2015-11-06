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
            var index = 0;
            //wipe memory
            for (var i = 0; i < _Memory.Data.length; i++) {
                _Memory.Data[i] = "00";
            }
            //populate
            for (var c = 0; c < program.length; c += 2) {
                _Memory.Data[index] = program.charAt(c) + program.charAt(c + 1);
                index++;
            }
            _PCB = new TSOS.PCB();
            _PCB.init();
            //_StdOut.putText("new process, pid= " + _PCB.pid);
            this.updateMemoryTable();
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
            var curRow = 0;
            var curCell = 7;
            for (var z = 0; z < 256; z++) {
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
                cell.innerHTML = "0x" + x.toString(16);
            }
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
