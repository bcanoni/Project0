///<reference path="../globals.ts" />


/*
comments

*/


module TSOS {

export class Memory {

 constructor(public sizeMem: number = 0,
                    public Data: Array<String> = null) {

        }
		
		

	 
	  public init(): void {
	 
	    //alert("wut");
		
		this.sizeMem = 256;
		this.Data = new Array(256);
		
		
	 
	    //populate the mem table 
	 
	     //var memTable = document.getElementById("memTable");
	     var memTable: HTMLTableElement = (<HTMLTableElement> document.getElementById("memTable"));
		  //var memTable = (<HTMLTableElement>document.getElementById("memTable")).value
		 
		 //row name
		 for(var x = this.sizeMem; x>= 0; x-=8)
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
						this.Data[y] = "00";
			
					}
					var cell = row.insertCell(0);
					cell.innerHTML = "0x"+x.toString(16);
					
					
		 }
		 
		 
		 }
		 
		 }
		 }
	