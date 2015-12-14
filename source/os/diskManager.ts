/// <reference path="../host/harddrive.ts"/>

/*
Brian Canoni
DiskManager
*/

module TSOS 
{
    export class DiskManager
	{
		

	
		constructor(public headerLen = 4,
					public dataLen = 60,
					public fileNames = []){}
		
		public init()
		{
			this.initHardDriveTable();
		
		}
		
		public createFile(fileName)
		{
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				if(this.fileNames[x] == fileName)
				{
					//BAD!
					return null;
				}
			}
				
			//if no space 
			//return
			
			// if file too big
			//cannot be > 60
			//
			
			
			//OTHERWISE SET THIS
			
			//find first next free spot
			this.fileNames.push(fileName); //at end of array
			
			var loc = this.nextFree();
			if(loc != null)
			{
				_HardDrive.write(loc.substring(0,1),loc.substring(2,3),loc.substring(4,5),fileName);
				return null;
			}
			
			
			

			return null;	
			
		
		
		}
		
		public nextFree()
		{
			var data;
			
			for(var t = 0 ; t <= 3 ; t++)
			{
				
				
				
				for(var s = 0; s <= 7 ; s++)
				{
					for(var b = 0; b <= 7 ; b++)
					{
						data = _HardDrive.read(t,s,b);
						if( data.substring(0,4) == "0000")
						{
							return t+":"+s+":"+b;
						}
					 
					}
					
				}
				
			}
			return null;
			
			
		
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
			var hdata = data.toString(16);
			return _HardDrive.write(t,s,b, hdata);
		}
		
		
		public updateHardDriveTable()
		{
			
			
			for(var t = 0 ; t <= 3 ; t++)
			{		
				for(var s = 0; s <= 7 ; s++)
				{
					for(var b = 0; b <= 7 ; b++)
					{
					var cell =  <HTMLTableDataCellElement>document.getElementById(t + ":" + s + ":" + b + "d");
					
					var updateData = _HardDrive.read(t,s,b);
					cell.innerHTML = updateData;					
					
					}
					
				}
				
			}				
		
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
					cell.id=t + ":" + s + ":" + b;
					
					cell = row.insertCell(1);
					cell.id=t + ":" + s + ":" + b + "d";
					
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