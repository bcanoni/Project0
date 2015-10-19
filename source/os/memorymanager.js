///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        //load and pid
        MemoryManager.prototype.loadProgram = function (program) {
            var toMemory;
            var index = 0;
            for (var i = 0; i < program.length; i++) {
                toMemory = program.slice(i, i + 2);
                _Memory.coreM[index] = toMemory;
                _Kernel.krnTrace("Index: " + index + " value: " + _Memory.coreM[index].toString());
                i++;
                index++;
            }
            _PCB = new PCB();
            _PCB.init();
            _StdOut.putText("new process, pid= " + _PCB.pid);
            _OsShell.pid++;
            Control.updateMemoryTable();
            /*

             toMemory=program.charAt(i)+program.charAt(i+1);
             _CPU.memory[_CPU.memory.length]=toMemory;
             _Kernel.krnTrace(toMemory);
             }
             */
        };
        MemoryManager.prototype.toAddress = function () {
            var index;
            _CPU.PC++;
            var b = _Memory.coreM[_CPU.PC];
            _CPU.PC++;
            var a = _Memory.coreM[_CPU.PC];
            var address = a.concat(b);
            index = parseInt(address, 16);
            return index;
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
