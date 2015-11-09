/*
Comments
*/

module TSOS
	export class scheduler 
	{
		constructor(
					public readyQueue: Queue = new Queue(),
					public residentQueue: Queue = new Queue(),
					public terminatedQueue:Queue = new Queue(),
                    public counter :number =0,
                    ) {}
					
					
	}
	
	public loadProgMem (program)
	{
		var curPCB = new TSOS.PCB();
		
		curPCB.base = _MemoryManager.firstFreePartition()*256;
		curPCB.limit = curPCB.base + 255;
		
		this.residentQueue.enqueue(curPCB);
	
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