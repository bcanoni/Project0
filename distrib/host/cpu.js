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
            var ir;
            var i;
            var a;
            var b;
            _Kernel.krnTrace('CPU cycle');
            if (this.isExecuting) {
                ir = _Memory.Data[this.PC];
                //alert(ir + "@" + this.PC);
                //step by step loool
                switch (ir) {
                    case "A9":
                        this.PC++;
                        this.Acc = parseInt(_Memory.Data[this.PC], 16);
                        this.PC++;
                        break;
                    case "AD":
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        //i=_MemManager.toAddress();
                        this.Acc = parseInt(_Memory.Data[decAddress], 16);
                        this.PC++;
                        //this.PC++;
                        //this.PC++;
                        break;
                    case "8D":
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        _Memory.Data[decAddress] = this.Acc.toString(16);
                        this.PC++;
                        // this.PC++;
                        //this.PC++;
                        break;
                    case "6D":
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        this.Acc += parseInt(_Memory.Data[decAddress], 16);
                        this.PC++;
                        //this.PC++;
                        //this.PC++;
                        break;
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
                    case "A2":
                        this.PC++;
                        this.Xreg = parseInt(_Memory.Data[this.PC], 16);
                        this.PC++;
                        break;
                    case "AE":
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        this.Xreg = parseInt(_Memory.Data[decAddress], 16);
                        this.PC++;
                        //this.PC++;
                        //this.PC++;
                        break;
                    case "A0":
                        this.PC++;
                        this.Yreg = parseInt(_Memory.Data[this.PC], 16);
                        this.PC++;
                        break;
                    case "AC":
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        this.Yreg = parseInt(_Memory.Data[decAddress], 16);
                        this.PC++;
                        break;
                    case "EA":
                        this.PC++;
                        break;
                    case "00":
                        this.isExecuting = false;
                        //this.PC=0;
                        break;
                    case "EC":
                        /*
                        i = parseInt(_Memory.Data[this.PC+1] + "" + _Memory.Data[this.PC+2]);
                        alert(i);
                       // i=_MemManager.toAddress();
                        //alert(i);
                        a=this.getConstantNumber(_Memory.Data[i]);
                        b=this.Xreg;
                        alert(a + " " + b);
                        if(a===b){
                            this.Zflag=0;
                        }else{
                            this.Zflag=1;
                        }
                        this.PC++;
                    this.PC++;
                    */
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        if (this.Xreg === parseInt(_Memory.Data[decAddress]))
                            this.Zflag = 0;
                        else
                            this.Zflag = 1;
                        this.PC++;
                        //this.PC++;
                        break;
                    case "D0":
                        //alert("magic");
                        this.PC++;
                        // i=parseInt(_Memory.Data[this.PC],16);
                        //i._MemManager.toAddress()
                        //alert(i);
                        if (this.Zflag === 1) {
                            var check = this.PC + parseInt(_Memory.Data[this.PC], 16);
                            this.PC += parseInt(_Memory.Data[this.PC], 16) + 1;
                            //alert(_ProgramSize + " " + this.PC);
                            if (check >= 256) {
                                this.PC -= 256;
                            }
                        }
                        else {
                            this.PC++;
                        }
                        break;
                    case "EE":
                        var byteOne = _Memory.Data[this.PC + 1];
                        var byteTwo = _Memory.Data[this.PC + 2];
                        var hexAddress = (byteTwo + byteOne);
                        var decAddress = _MemManager.toAddress(hexAddress);
                        a = parseInt(_Memory.Data[decAddress], 16);
                        a = a + 1;
                        _Memory.Data[decAddress] = a.toString(16);
                        this.PC++;
                        break;
                    case "FF":
                        if (this.Xreg == 1) {
                            _StdOut.putText("" + this.Yreg);
                            _StdOut.advanceLine();
                            this.PC++;
                        }
                        else if (this.Xreg == 2) {
                            //00 terminated
                            var temp = true;
                            var c = 0;
                            while (temp) {
                                _StdOut.putText("" + String.fromCharCode(parseInt(_Memory.Data[this.Yreg + c], 16)));
                                c++;
                                temp = ("00" !== _Memory.Data[this.Yreg + c]);
                            }
                            _StdOut.advanceLine();
                            this.PC++;
                        }
                        else {
                            _StdOut.putText("Value in Xreg must be 1 or 0");
                            this.isExecuting = false;
                        }
                        break;
                    default:
                        this.isExecuting = false;
                        _StdOut.putText("missing code : " + _Memory.Data[this.PC]);
                        _StdOut.advanceLine();
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
