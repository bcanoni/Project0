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

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
        }
		
		/*
		
		
		//public execute(input) : void 
		//{
		var IR = input;
		switch(ir) {
		//A9 LDA  load acc with constant
		case "A9": 
		{
		
		
		break;
		}
		
		
		
		
		//AD LDA  load acc from memory
		case "AD":
		{
		
		break;
		}
		
		
		//8D STA store acc in memory
		
			case "8D":
		{
		
		break;
		}
		
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
		
		*/
    }
}
