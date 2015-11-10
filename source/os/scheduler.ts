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
			
			this.residentQueue.push(curPCB);
			_MemManager.loadProgram(program,curPCB);
		}
	
		public runAProgram(pid) 
		{
			//relates to single run function
		    _PCB = this.residentQueue[pid];
			
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
		}
	
	}	
}