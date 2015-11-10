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
	
	public runAProgram() 
	{
	//relates to single run function
	
	}
	
	public runAllPrograms()
	{
	//relates to new run all method
	//REM will use some kind of ROUND ROBIN scheduling 
	
	
	}
	
	}	
}