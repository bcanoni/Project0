///<reference path="../globals.ts" />
/// <reference path="./PCB.ts"/>
/// <reference path="../host/memory.ts"/>
/*
Brian Canoni
MemoryManager
*/
module TSOS 
{
    export class MemoryManager 
	{


        constructor(){}
		
		//load 		
        public loadProgram(program, curPCB ):boolean
		{	
			// IF 1,2,3 HAVE MEMORY IN THEM
			// TODO WIPE NEXT IN CHAIN AND LOAD
			//FOR NOW JUST LOAD UNTIL NULL AND THEN THROW ERROR
			var firstFree = this.firstFreePartition();
			
			_PCB = curPCB;			
			
			//IF NULL MEMORY FULL
			if (firstFree != null)
			{			
				curPCB = new PCB();
				curPCB.base = this.firstFreePartition();
				
			
				//wipe memory
				this.wipeMem(curPCB);
				
			
				//populate					
				this.populateMem(curPCB ,program);
				
				
				this.updateMemoryTable();
				
				return true;
			
			
			}
			else
			{
				//MEMORY FULL?
				_StdOut.putText("Memory full. Please clear memory.");
				return false;
				
			}          
             
            
        }
		
		
		public insertMemory(x, dat): void
		{	
			_Memory.Data[x+_PCB.base] = dat;
		}
		
		public getMemory(x): String
		{
			return _Memory.Data[x+_PCB.base];
		}
		
		//Wipes only a specific partition
		public wipeMem(curPCB): void
		{
			for (var i = curPCB.base; i < curPCB.length ; i++) 
				{
					_Memory.Data[i] = "00";                
				}
		
		}
		
		//clears all mem 
		public clearMem(): void
		{
			for(var x = 0; x < _Memory.sizeMem; x++)
			{
				_Memory.Data[x] = "00"; 			
			}
			this.updateMemoryTable();
		
		}
		
		public populateMem(curPCB, program): void
		{
		    var index = curPCB.base;
			for (var c = 0; c < program.length; c+=2) 
			{
                _Memory.Data[index] = program.charAt(c)+program.charAt(c+1);
                index++;
            }	
		}
		
		public firstFreePartition(): number
		{
			if(_Memory.Data[0] == ("00"))
				return 0;
				
			else if(_Memory.Data[256] == ("00"))
				return 256;

			else if(_Memory.Data[513] == ("00"))
				return 512;
				
		    return null;
		}
		
		
		
		

        
        public toAddress(): number
		{
            var index;
            _CPU.PC++;
            var b=_Memory.Data[_CPU.PC];
            _CPU.PC++;
            var a: string =String(_Memory.Data[_CPU.PC]);
            var address: string =String(String(a).concat(String(b)));
            index=parseInt(address,16);
            return index;



        }
		
		
		
		public updateMemoryTable(): void
		{
            //var memoryIndex=0;
            //var rowIndex;
            //var colIndex;			
			
			//EACH ROW HAS AN ID   'row0' row + row num
			//EACH CELL HAS AN ID 'cell00'  cell + row num + cell num 0-7
			
			// EVERY 100 (in hex ) IS A PARTITION
			
			var curRow = 0;
			var curCell = 7;
			
			for(var z = 0; z < _Memory.sizeMem ; z++)
		    {
                			
				var temp: string = String(_Memory.Data[z]);	
				temp.toUpperCase();
				if(temp.length ==1)
				temp+= "0";
				
					
				var cell = <HTMLTableDataCellElement>document.getElementById("cell"+curRow+""+curCell);
				cell.innerHTML = temp;
				curCell--;
				if(curCell<0)
				{	
				    curRow+=8;
					curCell=7;
				}
						
			
			} 
		}
		
		public initMemoryTable(): void
		{
			var memTable: HTMLTableElement = (<HTMLTableElement> document.getElementById("memTable"));
		 
				//row name
				for(var x = _Memory.sizeMem; x>= 0; x-=8)
				{
					var footer = <HTMLTableElement>memTable.createTFoot();
					var row =  <HTMLTableRowElement> footer.insertRow(0);
					row.id = "row"+x;
					//each of 8 bits		
				
					for(var y = 0; y < 8; y++ ) 
					{
						var cell = row.insertCell(0);
						cell.innerHTML = "00";
						cell.id="cell"+x +""+ y;
						_Memory.Data[y] = "00";			
					}					                				
					var cell = row.insertCell(0);
					cell.innerHTML = ("0x"+x.toString(16));					
						
				}			
		}



    }

}