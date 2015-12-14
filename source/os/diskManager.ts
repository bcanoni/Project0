/// <reference path="../host/harddrive.ts"/>

/*
Brian Canoni
DiskManager
*/

module TSOS 
{
    export class DiskManager
	{
	
	
		constructor(){}
		
		public init()
		{
			this.initHardDriveTable();
		
		}
		
		
		public updateHardDriveTable()
		{
		
		}
		
		
		public initHardDriveTable()
		{
			var hardTable: HTMLTableElement = (<HTMLTableElement> document.getElementById("hardTable"));
			
			// 0:0:0 - 3:7:7
			var footer = <HTMLTableElement>hardTable.createTFoot();
			var row =  <HTMLTableRowElement> footer.insertRow(0);
			
			for(var t = 0 ; t <= 3 ; t++)
			{
				
				
				
				for(var s = 0; s <= 7 ; s++)
				{
					for(var b = 0; b <= 7 ; b++)
					{
					var cell = row.insertCell(0);
					cell.innerHTML = t + ":" + s + ":" + b;
					
					//cell = row.insertCell(1);
					
					
					row.id = t + ":" + s + ":" + b;
					
					
					row = <HTMLTableRowElement> footer.insertRow();
					}
					
				}
				
			}
			
			
			
		
		}
	
	
	}
	
	
}