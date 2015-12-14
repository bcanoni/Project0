/// <reference path="../host/harddrive.ts"/>

/*
Brian Canoni
DiskManager
*/

module TSOS 
{
    export class DiskManager
	{
		
	
		constructor()
		{	
		//REM BLOCKS OF 2 CAUSE HEX
		var headerLen = 4;
		var dataLen = 60;
		var fileNames = [];
		
		}
		
		public init()
		{
			this.initHardDriveTable();
		
		}
		
		public createFile(fileName)
		{
			for(var fn : this.fileNames)
			{
				if(fn == fileName)
				{
					//BAD!
					return null;
				}
				
				//if no space 
				//return
				
				// if file too big
				//cannot be > 60
				//
				
				
				//OTHERWISE SET THIS
				
				//find first next free spot
				
				
				

				return null;
			
			}
		
		
		}
		
		public nextFree()
		{
			var data = this.getContent(0, 0, 0);
			//var fileLocation = slice data and ;
			return fileLocation;
		
		}
		
		public read(t,s,b)
		{
			//CONVERT HEX TO DEC
			return _HardDrive.read(t,s,b);
		}
		
		public getContent(t,s,b)
		{
			//CONVERT HEX TO DEC
			return _HardDrive.read(t,s,b);
		}
		
		public write(t,s,b, data)
		{
			return _HardDrive.write(t,s,b, data);
		}
		
		
		public updateHardDriveTable()
		{
		
		}
		
		
		public initHardDriveTable()
		{
			var zero128 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
		
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
					
					cell = row.insertCell(1);
					
					cell.innerHTML = (zero128);
					_HardDrive.write(t,s,b,zero128);
					
					row.id = t + ":" + s + ":" + b;
					
					
					row = <HTMLTableRowElement> footer.insertRow();
					}
					
				}
				
			}
			
			
			
		
		}
	
	
	}
	
	
}