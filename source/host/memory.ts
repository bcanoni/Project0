///<reference path="../globals.ts" />
///<reference path="../os/memorymanager.ts" />

/*
Brian Canoni Memory


*/


module TSOS {

    export class Memory {

        constructor(public sizeMem: number = 0,
                    public Data: Array<String> = null) {
					
		}
		
	    public init(): void 
		{		
			this.sizeMem = 768;
			this.Data = new Array(768);	
			
			//populate the mem table 
			for(var x = 0; x < this.sizeMem; x++)
			{
            this.Data[x] = "00";
			}
			
				
			_MemManager = new MemoryManager();
			_MemManager.initMemoryTable();		 
		 
		}	
		
		 
	}
}
	