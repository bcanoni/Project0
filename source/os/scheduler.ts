///<reference path="pcb.ts" />
///<reference path="../globals.ts" />
/*
Comments
*/
module TSOS
{
	export class Scheduler 
	{
		constructor(
					public readyQueue: PCB[] = [] ,
					public residentQueue: PCB[] = [],
					public terminatedQueue: PCB[] = [],
                    public counter :number =0
                    ) {}
					
					
	
	
		public loadProgMem (program)
		{
			var curPCB = new TSOS.PCB();
			curPCB.pid = _PID; 
			
			curPCB.base = _MemManager.firstFreePartition()*256;
			curPCB.limit = curPCB.base + 255;
			curPCB.state = 1; //RESIDENT 
			
			this.residentQueue.push(curPCB);
			_MemManager.loadProgram(program,curPCB);
		}
	
		public runAProgram(pid) 
		{
			//relates to single run function
		    _PCB = this.residentQueue[pid];
			_PCB.state = 2; //running
			
			//ADD to readyQueue;
			this.readyQueue.push(_PCB);			
			//clear cpu values
			_CPU.clearCpu();
		    //dont need to run on pid yet but keep that in mind for later
			_CPU.isExecuting = true;
		}
		
		public validPID(pid) : boolean
		{
			if( this.residentQueue[pid] != null)
			return true;
			
			return false;
		
		}
		
		
	
		public runAllPrograms()
		{
			//relates to new run all method
			//REM will use some kind of ROUND ROBIN scheduling 
			
		    //ALL PROGRAMS IN RESIDENT QUEUE ACTIVATE AND PUT IN READY QUEUE
			for(PCB : this.residentQueue)
			{
			this.readyQueue.push(this.residentQueue.pop);			
			}
			
			//TODO FLESH OUT SWITCHER PROGRAM TO SWITCH BASED ON SET QUANTUM 
			
			
			_CPU.clearCpu();
		    
			_CPU.isExecuting = true;		
			
		}
		
		public switcher()
		{
		//inc 1 until reach quantum 
		counter ++;
		
		if(counter >= 
		
		
		
		}
		
		
		
		
		public updatePCBTable():void
		{		
			//3 FUNCT
			
			//CHECK STATES OF ALL PCB IN RESIDENT if 2 add to ready queue and display
			//if 1 remain in resident 
			//if 3 put in terminated.
			
			for(var x = 0; x< this.residentQueue.length; x++)
			{
				//stay in resident 
			    if(this.residentQueue[x].state == 1)
			    {					
			    //NO ACTION REQUIRED			   
			    }
				//mMOVE TO READY
				else if(temp.state == 2)
				{
					this.readyQueue.push(this.residentQueue[x]);
					//Remove this from resident
					this.residentQueue.splice(1,x);
                    //ADD ROW 
					this.addRow();
				}
					else if(temp.state == 3)
				{
					this.terminatedQueue.push(this.residentQueue[x]);
					//Remove this from resident
					this.residentQueue.splice(1,x);				
				}			
			}
			
			
			
			//IF PCB IS STATE READY MOVE TO READYQUEUE
			
			//ONCE THERE IT IS UPDATED TO TABLE AND HAS ITS OWN HTML ID's FOR REFERENCE 
			//THE CODE I WILL USE FOR THIS IS
			//   PID + (column name) 
			//EX     PID+PID , PID+PC , + PID+ACC
			
			
			
			//IF A PCB IS STATE FINISHED REMOVE IT FROM READY QUEUE AND PUT IN TERMINATED QUEUE
		
		
			//DISPLAY ONLY  (running) PCB's
			//row name
			for(var x = 0; x< this.readyQueue.length ; x++)
			{
			
			var cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"PID");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"PC");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"Acc");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"Xreg");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"Yreg");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"Zflag");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"base");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"limit");
			cell.innerHTML = this.readyQueue[x].state;
			
			cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue[x].PID+"state");
			cell.innerHTML = this.readyQueue[x].state;

			
			
			}
			
			
		
		
		}
		
		public addRow()
		{
			//last row in ready Queue is new
			//need to give it html tag to refer to and add it to table 
			
			//this.readyQueue[this.readyQueue.length-1];
			var tempPid = this.readyQueue[this.readyQueue.length-1].PID;
			var thePcb = this.readyQueue[this.readyQueue.length-1];
			
			
			var footer = <HTMLTableElement>ReadyQueueTable.createTFoot();
			var row =  <HTMLTableRowElement> footer.insertRow(0);
			row.id = "PCB"+tempPid;			
		
			
			var cell = row.insertCell(0);			
			cell.id= tempPid + "PID";
			cell.innerHTML = thePcb.PID;
			
			
			
			cell = row.insertCell(1);
			cell.id= tempPid + "PC";
			cell.innerHTML = thePcb.PC;
			
			cell = row.insertCell(2);
			cell.id= tempPid + "Acc";
			cell.innerHTML = thePcb.Acc;
			
			cell = row.insertCell(3);
			cell.id= tempPid + "Xreg";
			cell.innerHTML = thePcb.Xreg;
			
			cell = row.insertCell(4);
			cell.id= tempPid + "Yreg";
			cell.innerHTML = thePcb.Yreg;
			
			cell = row.insertCell(5);
			cell.id= tempPid + "Zflag";
			cell.innerHTML = thePcb.Zflag;
			
			cell = row.insertCell(6);
			cell.id= tempPid + "base";
			cell.innerHTML = thePcb.base;
			
			cell = row.insertCell(7);
			cell.id= tempPid + "limit";
			cell.innerHTML = thePcb.limit;
			
			cell = row.insertCell(8);
			cell.id= tempPid + "state";
			cell.innerHTML = thePcb.state;
				
		
		}
		
		
		
	
	}	
}