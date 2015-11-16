///<reference path="../globals.ts" />
/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            //6D ADC add with carry adds constants of address to the contents of accumulator and puts results in accumulator
            //A2 LDX loads x register with a constant
            //AE LDX loads the X register from memory
            //A0 LDY loads y register with a constant 
            //ACloads the y register from memory
            //EA NOP no operation
            //00 Break (really a system call)
            //EC CPX compare a byte in memory to x regi sets the z zero flag if equal 
            //D0 BNE branch n bytes if z flag is 0-470-12872-5
            //EE INC increment the value of a byte
            //FF SYS system call
            //IR means 
            var ir;
            var i;
            var a;
            var b;
            _Kernel.krnTrace('CPU cycle');
            if (this.isExecuting) {
                ir = _Memory.Data[this.PC];
                //ir = _MemManager.getMemory(_PCB.PC);
                //alert(ir + "@" + this.PC);
                //step by step loool
                switch (ir) {
                    case "A9":
                        this.PC++;
                        this.Acc = parseInt(_MemManager.getMemory(this.PC), 16);
                        this.PC++;
                        break;
                    case "AD":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        //i=_MemManager.toAddress();
                        this.Acc = parseInt(_MemManager.getMemory(decAddress), 16);
                        this.PC++;
                        break;
                    case "8D":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        _MemManager.insertMemory(decAddress, this.Acc.toString(16));
                        this.PC++;
                        break;
                    case "6D":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        this.Acc += parseInt(_MemManager.getMemory(decAddress), 16);
                        this.PC++;
                        break;
                    case "A2":
                        this.PC++;
                        this.Xreg = parseInt(_MemManager.getMemory(this.PC), 16);
                        this.PC++;
                        break;
                    case "AE":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        this.Xreg = parseInt(_MemManager.getMemory(decAddress), 16);
                        this.PC++;
                        break;
                    case "A0":
                        this.PC++;
                        this.Yreg = parseInt(_MemManager.getMemory(this.PC), 16);
                        this.PC++;
                        break;
                    case "AC":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        this.Yreg = parseInt(_MemManager.getMemory(decAddress), 16);
                        this.PC++;
                        break;
                    case "EA":
                        this.PC++;
                        break;
                    case "00":
                        this.isExecuting = false;
                        _PCB.state = 3; //terminated
                        _Scheduler.removeRow(1);
                        //this.PC=0;
                        break;
                    case "EC":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        if (this.Xreg === parseInt(_MemManager.getMemory(decAddress)))
                            this.Zflag = 0;
                        else
                            this.Zflag = 1;
                        this.PC++;
                        break;
                    case "D0":
                        //this.PC++;
                        if (this.Zflag === 1) {
                            //alert(parseInt(_MemManager.getMemory(this.PC+1),16)+1);
                            this.PC += parseInt(_MemManager.getMemory(this.PC + 1), 16) + 2;
                            var check = this.PC + _PCB.base;
                            if (check >= _PCB.limit) {
                                this.PC -= 256;
                            }
                        }
                        else {
                            this.PC++;
                            this.PC++;
                        }
                        break;
                    case "EE":
                        var byteOne = _MemManager.getMemory(this.PC + 1);
                        var byteTwo = _MemManager.getMemory(this.PC + 2);
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        a = parseInt(_MemManager.getMemory(decAddress), 16);
                        a = a + 1;
                        _MemManager.insertMemory(decAddress, a.toString(16));
                        this.PC++;
                        break;
                    case "FF":
                        //_StdOut.putPrompt();
                        if (this.Xreg == 1) {
                            _StdOut.putText("" + this.Yreg);
                            _StdOut.advanceLine();
                            _OsShell.putPrompt();
                            this.PC++;
                        }
                        else if (this.Xreg == 2) {
                            //00 terminated
                            var temp = true;
                            var c = 0;
                            while (temp) {
                                _StdOut.putText("" + String.fromCharCode(parseInt(_MemManager.getMemory(this.Yreg + c), 16)));
                                c++;
                                temp = ("00" !== _MemManager.getMemory(this.Yreg + c));
                            }
                            _StdOut.advanceLine();
                            _OsShell.putPrompt();
                            this.PC++;
                        }
                        else {
                            _StdOut.putText("Value in Xreg must be 1 or 0");
                            this.isExecuting = false;
                            _OsShell.putPrompt();
                        }
                        break;
                    default:
                        this.isExecuting = false;
                        _StdOut.putText("missing code : " + _MemManager.getMemory(this.PC));
                        _StdOut.advanceLine();
                        _OsShell.putPrompt();
                }
                //Update cpu registers 
                var cell = document.getElementById("pcDisplay");
                cell.innerHTML = "" + this.PC;
                cell = document.getElementById("accDisplay");
                cell.innerHTML = "" + this.Acc;
                cell = document.getElementById("xRegDisplay");
                cell.innerHTML = "" + this.Xreg;
                cell = document.getElementById("yRegDisplay");
                cell.innerHTML = "" + this.Yreg;
                cell = document.getElementById("zRegDisplay");
                cell.innerHTML = "" + this.Zflag;
                //UPDATE PCB REGISTERS
                _PCB.PC = this.PC;
                _PCB.Acc = this.Acc;
                _PCB.Xreg = this.Xreg;
                _PCB.Yreg = this.Yreg;
                _PCB.Zflag = this.Zflag;
                _PCB.state = 2; // RUNNING
                _Scheduler.updatePCBTable();
                _MemManager.updateMemoryTable();
            }
        };
        Cpu.prototype.getConstantNumber = function (num) {
            var v = parseInt(num, 16);
            return v;
        };
        Cpu.prototype.clearCpu = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
