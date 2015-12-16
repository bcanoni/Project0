///<reference path="pcb.ts" />
///<reference path="queue.ts" />
///<reference path="../globals.ts" />
/*
Comments
*/
module TSOS
{
	export class Scheduler 
	{
		
		
		constructor(
					public readyQueue = new TSOS.Queue() ,
					public residentQueue = new TSOS.Queue(),
					public terminatedQueue = new TSOS.Queue(),
                    public counter : number =0,
					public quantum : number = 6					
                    ) {}
					
					
	
	
		public loadProgMem (program)
		{		   
			var curPCB = new TSOS.PCB();
			curPCB.pid = _PID; 			
			_MemManager.loadProgram(program,curPCB);
			
		}
	
		public runAProgram(pid) 
		{
			//relates to single run function
			var pos = 0;
			for(var x = 0; x < this.residentQueue.getSize(); x++)
			{
				if(this.residentQueue.q[x].pid == pid)
				{
					pos = x;
				}
			}
		    _PCB = this.residentQueue.q[pos];
			
			_PCB.state = 2; //running	
			
			//ADD to readyQueue;
			this.readyQueue.enqueue(_PCB);			
			//clear cpu values
			_CPU.clearCpu();
		    
			_CPU.isExecuting = true;
			this.addRow(_PCB);
		}
		
		public validPID(pid) : boolean
		{
			//PID != pos in queue
			var out = false;
			
			for(var x = 0; x < this.residentQueue.getSize(); x++)
			{
				if(this.residentQueue.q[x].pid == pid)
				{
					out = true;
				}
			}			
			return out;
		
		}
		
		
	
		public runAllPrograms()
		{
			//relates to new run all method
			//REM will use some kind of ROUND ROBIN scheduling 
			
		    //ALL PROGRAMS IN RESIDENT QUEUE ACTIVATE AND PUT IN READY QUEUE
			while(!this.residentQueue.isEmpty())
			{
				var temp: PCB = this.residentQueue.dequeue();
				this.readyQueue.enqueue(temp);	
				this.addRow(temp);				
			}			
			_PCB = temp;
			
			_CPU.clearCpu();
		    
			_CPU.isExecuting = true;		
			
		}
		
		public switcher(): void
		{	
			//EACH CPU CYCLE
			this.counter++;
			
			//alert (this.readyQueue);
			if(this.counter >= this.quantum) //A SWITCH MUST OCCUR
			{	
				//get next pcb in list	
				var nextPCB = this.readyQueue.dequeue();
				
				//PUT OLD PCB AT END OF QUEUE/ BOTTOM
				this.readyQueue.q.push(_PCB);			
				
				_PCB = nextPCB;
				_CPU.switchTo(nextPCB);
			
				this.counter = 0;
			}
			if(this.readyQueue.isEmpty())
			{
				_CPU.isExecuting = false;
			}
		
		}
		
		
		
		
		public updatePCBTable():void
		{				
			
			//IF PCB IS STATE READY MOVE TO READYQUEUE
			
			//ONCE THERE IT IS UPDATED TO TABLE AND HAS ITS OWN HTML ID's FOR REFERENCE 
			//THE CODE I WILL USE FOR THIS IS
			//   pid + (column name) 
			//EX     pid+pid , pid+PC , + pid+ACC
			
		
		
		
			//DISPLAY ONLY  (running) PCB's
			//row name
			var x = 0;
			while(x < this.readyQueue.getSize())
			{
				
				var cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"pid");
				cell.innerHTML = ""+this.readyQueue.q[x].pid;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"PC");
				cell.innerHTML = ""+this.readyQueue.q[x].PC;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"Acc");
				cell.innerHTML = ""+this.readyQueue.q[x].Acc;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"Xreg");
				cell.innerHTML = ""+this.readyQueue.q[x].Xreg;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"Yreg");
				cell.innerHTML = ""+this.readyQueue.q[x].Yreg;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"Zflag");
				cell.innerHTML = ""+this.readyQueue.q[x].Zflag;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"base");
				cell.innerHTML = ""+this.readyQueue.q[x].base;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"limit");
				cell.innerHTML = ""+this.readyQueue.q[x].limit;
				
				cell = <HTMLTableDataCellElement>document.getElementById(""+this.readyQueue.q[x].pid+"state");
				cell.innerHTML = ""+this.readyQueue.q[x].state;
				x++;
			}
				
				
			
			
			}
			
			public addRow(temp)
			{
				//last row in ready Queue is new
				//need to give it html tag to refer to and add it to table 
				
				//this.readyQueue[this.readyQueue.length-1];
				var temppid = temp.pid;
				var thePcb = temp;
				
				
				var readyTable: HTMLTableElement = (<HTMLTableElement> document.getElementById("readyQueueTable"));
				
				var footer = <HTMLTableElement>readyTable.createTFoot();
				var row =  <HTMLTableRowElement> footer.insertRow(0);
				row.id = "PCB"+temppid;			
			
				
				var cell = row.insertCell(0);			
				cell.id= temppid + "pid";
				cell.innerHTML = ""+thePcb.pid;
				
				
				
				cell = row.insertCell(1);
				cell.id= temppid + "PC";
				cell.innerHTML = ""+thePcb.PC;
				
				cell = row.insertCell(2);
				cell.id= temppid + "Acc";
				cell.innerHTML = ""+thePcb.Acc;
				
				cell = row.insertCell(3);
				cell.id= temppid + "Xreg";
				cell.innerHTML = ""+thePcb.Xreg;
				
				cell = row.insertCell(4);
				cell.id= temppid + "Yreg";
				cell.innerHTML = ""+thePcb.Yreg;
				
				cell = row.insertCell(5);
				cell.id= temppid + "Zflag";
				cell.innerHTML = ""+thePcb.Zflag;
				
				cell = row.insertCell(6);
				cell.id= temppid + "base";
				cell.innerHTML = ""+thePcb.base;
				
				cell = row.insertCell(7);
				cell.id= temppid + "limit";
				cell.innerHTML = ""+thePcb.limit;
				
				cell = row.insertCell(8);
				cell.id= temppid + "state";
				cell.innerHTML = ""+thePcb.state;
					
		
		}
		
		public removeRow(x)
		{
			var readyTable: HTMLTableElement = (<HTMLTableElement> document.getElementById("readyQueueTable"));
			readyTable.deleteRow(x);
		}
		
		
		
	
	}	
}