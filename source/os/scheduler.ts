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
		
		public updatePCBTable():void
		{	
		
			//3 FUNCT
			
			//CHECK STATES OF ALL PCB IN RESIDENT 
			//POSSIBLE SUB FUNCTION
			
			//IF PCB IS STATE READY MOVE TO READYQUEUE
			
			//ONCE THERE IT IS UPDATED TO TABLE AND HAS ITS OWN HTML ID's FOR REFERENCE 
			//THE CODE I WILL USE FOR THIS IS
			//   PID + (column name) 
			//EX     PID+PID , PID+PC , + PID+ACC
			
			
			
			//IF A PCB IS STATE FINISHED REMOVE IT FROM READY QUEUE AND PUT IN TERMINATED QUEUE
			
		
			
			
		
		
		
		
		
		
		
		
			//DISPLAY ONLY  (running) PCB's
			//row name
			for(var x = 0; x< _Scheduler.residentQueue.size() ; x++)
			{
				
				var footer = <HTMLTableElement>ReadyQueueTable.createTFoot();
				var row =  <HTMLTableRowElement> footer.insertRow(0);
				row.id = "row"+x;						
			
				
				var cell = row.insertCell(0);
				cell.innerHTML = this.residentQueue[x].PID;
			    cell.id="cell"+x +""+ this.residentQueue[x].PID;
				cell = row.insertCell(1);
				
				cell = row.insertCell(2);
				
				cell = row.insertCell(3);
				
				cell = row.insertCell(4);
				
				cell = row.insertCell(5);
				
				cell = row.insertCell(6);
				
				cell = row.insertCell(7);
				
				cell = row.insertCell(8);
				
				
				
							
				                				
				var cell = row.insertCell(0);
				cell.innerHTML = ("0x"+x.toString(16));	
		
		
		}
		
		
		
	
	}	
}