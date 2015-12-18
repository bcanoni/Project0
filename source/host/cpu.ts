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

module TSOS 
{

    export class Cpu 
	{

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void 
		{
			_CPU = this;
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void 
		{           
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
			
			//6D ADC add with carry adds constants of address to the contents of accumulator and puts results in accumulator
		    //A2 LDX loads x register with a constant
		    //AE LDX loads the X register from memory
		    //A0 LDY loads y register with a constant 
		    //AC loads the y register from memory
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
			if(this.isExecuting)
			{
			
			
			ir = _Memory.Data[this.PC];
			//ir = _MemManager.getMemory(_PCB.PC);
			//alert(ir + "@" + this.PC);
			
			//step by step loool
			switch(ir)
			{
			    case "A9":  //A9 LDA  load acc with constant
                    this.PC++;
                    this.Acc =parseInt(_MemManager.getMemory(this.PC), 16);
                    this.PC++;
                break;			
				
				case "AD": //AD LDA  load acc from memory
					
					var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
					//i=_MemManager.toAddress();
                    this.Acc=parseInt(_MemManager.getMemory(decAddress),16);
                    this.PC++;
					
                    		
				break;
				
				case "8D": //8D STA store acc in memory
                    var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
                    _MemManager.insertMemory(decAddress,this.Acc.toString(16));
                    this.PC++;
					
                break;
				
				case "6D": //6D ADC Add with Carry
                    var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
                    this.Acc+= parseInt(_MemManager.getMemory(decAddress),16);
                    this.PC++;
					
                break;				
				
				case "A2": //A2 LDX loads x register with a constant
                        this.PC++;
                        this.Xreg=parseInt(_MemManager.getMemory(this.PC),16);
                        this.PC++;
                break;
				
				case "AE": //AE LDX loads the X register from memory
                    var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
					
					
                        
                    this.Xreg=parseInt(_MemManager.getMemory(decAddress), 16);
                    this.PC++;
				break;
				
				case "A0": //A0 LDY loads y register with a constant 
                    this.PC++;
                    this.Yreg=parseInt(_MemManager.getMemory(this.PC),16);
                    this.PC++;
                break;
				
				case "AC"://AC loads the y register from memory
                    var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
                    this.Yreg=parseInt(_MemManager.getMemory(decAddress),16);
                    this.PC++;
						
                break;
				
				case "EA": //EA NOP no operation
                    
                    this.PC++;
                break;			
				
				case "00": //end
                        
                        this.isExecuting = false;
						_PCB.state=3; //terminated
						_Scheduler.removeRow(1);
						_Scheduler.switcher();
                        //this.PC=0;
                break;
				
				case "EC": //EC CPX compare a byte in memory to x regi sets the z zero flag if equal 
                    				
					var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
					
					
					
					
					if(this.Xreg === parseInt(_MemManager.getMemory(decAddress)))
					this.Zflag = 0;
					else
					this.Zflag = 1;
					
					this.PC++;
									
					
                break;
				
				case "D0": //D0 BNE branch n bytes if z flag is 1 NOT EQUAL
                    
                   
                    //this.PC++;
					
					if(this.Zflag === 1 )
					{	
						//alert(parseInt(_MemManager.getMemory(this.PC+1),16)+1);
						this.PC += parseInt(_MemManager.getMemory(this.PC+1),16)+2;
						var check = this.PC + _PCB.base;
						
						if (check >= _PCB.limit ) 
						{                    
							this.PC -= 256;
					    }
						
						
					}
					else
					{
					this.PC++;	
					this.PC++;					
											
					}
                  
            
                        
                break;
				
				case "EE": //EE INC increment the value of a byte
                   
					var byteOne = _MemManager.getMemory(this.PC+1);					
					var byteTwo = _MemManager.getMemory(this.PC+2);
					
					var hexAddress = (byteTwo + byteOne);
					
					var decAddress = _MemManager.toAddress(hexAddress);
                        a=parseInt(_MemManager.getMemory(decAddress),16);
                        a=a+1;
                        
						_MemManager.insertMemory(decAddress, a.toString(16));
                        this.PC++;
                break;
				
				case "FF": //FF SYS system call
				    
					//_StdOut.putPrompt();
                    

                        if(this.Xreg==1)
						{
                            _StdOut.putText(""+this.Yreg);
							_StdOut.advanceLine();
							_OsShell.putPrompt();
                            this.PC++;


                        }
						else if(this.Xreg==2)
						{
                            //00 terminated
							var temp = true;
							var c = 0;							
							
							while(temp)
							{
								_StdOut.putText(""+String.fromCharCode(parseInt(_MemManager.getMemory(this.Yreg+c),16)));
								c++;
								temp = ("00" !== _MemManager.getMemory(this.Yreg+c));
							
							}
							
							_StdOut.advanceLine();
							_OsShell.putPrompt();
                            this.PC++;

                        }
						else
						{
                            _StdOut.putText("Value in Xreg must be 1 or 0");
                            this.isExecuting=false;
							_OsShell.putPrompt();
                        }
                break;
				
				
				default:
                        this.isExecuting=false;
                        _StdOut.putText("missing code : " + _MemManager.getMemory(this.PC));
						_StdOut.advanceLine();
						_OsShell.putPrompt();
						
					
                  
			 
			}
			 
			 
		    //Update cpu registers 
			var cell = <HTMLTableDataCellElement>document.getElementById("pcDisplay");
			cell.innerHTML = ""+this.PC;
			cell = <HTMLTableDataCellElement>document.getElementById("accDisplay");
			cell.innerHTML = ""+this.Acc;
			cell = <HTMLTableDataCellElement>document.getElementById("xRegDisplay");
			cell.innerHTML = ""+this.Xreg;
			cell = <HTMLTableDataCellElement>document.getElementById("yRegDisplay");
			cell.innerHTML = ""+this.Yreg;
			cell = <HTMLTableDataCellElement>document.getElementById("zRegDisplay");
			cell.innerHTML = ""+this.Zflag;
			
			//UPDATE PCB REGISTERS
			_PCB.PC = this.PC;
			_PCB.Acc = this.Acc;
			_PCB.Xreg = this.Xreg;
			_PCB.Yreg = this.Yreg;
			_PCB.Zflag = this.Zflag;			
			_PCB.state = 2; // RUNNING
			_Scheduler.updatePCBTable();
			
			
			
			_MemManager.updateMemoryTable();
			
			_Scheduler.switcher();
			
			_DiskManager.updateHardDriveTable();
			
			}
			
			
			
        }
		
		public getConstantNumber(num:string):number 
		{		
            var v = parseInt(num, 16);
            return v;
        }
		
		public clearCpu(): void 
		{
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;

        }
		
		public switchTo(newpcb) : void
		{
			_PCB = newpcb;
			this.PC = newpcb.PC;
            this.Acc = newpcb.Acc;
            this.Xreg = newpcb.Xreg;
            this.Yreg = newpcb.Yreg;
            this.Zflag = newpcb.Zflag;	
			_Kernel.krnTrace('Switch to PID[' + _PCB.pid + ']');			
		
		}
		
		
    }
}
