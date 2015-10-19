///<reference path="../globals.ts" />

//changed pcb to an object instead using code from cpu for constructor and init 
module TSOS {

    export class PCB {

        constructor(public pid:number=0,
                    public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public base: number=0,
                    public limit: number=0){

        }

        public init(): void {
            this.pid=_OsShell.pid;
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.base=0;
            this.limit=0;
			
			
        }


    }
}