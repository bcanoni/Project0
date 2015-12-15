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
					return fileName + "already exists!";
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
				
				this.write(loc.charAt(0),loc.charAt(1),loc.charAt(2),fileName);
				this.setHeader(loc.charAt(0),loc.charAt(1),loc.charAt(2),"1000");
				this.updateHardDriveTable();
				return "Success!"; //success
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
							return t + "" + s + "" + b;
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
		
		public setHeader(t,s,b,head)
		{
			var data = this.read(t,s,b);
			var content = data.slice(this.headerLen);
			var update = head + content;
			_HardDrive.write(t,s,b,update);	
		
		}
		
		public setContent(t,s,b,content)
		{
		
		}
		
		
		public write(t,s,b, data)
		{
			var hdata = ""
			for( var x = 0; x < data.length; x++)
			{
				//char code of char at x 
				//
				//var b1 = ;//
				//var b2 = ;//
				var b1 = data.charCodeAt(x);	
				var b2 = b1.toString(16);
				
				hdata += b2;
			
			}	
			
			
			for (var i = data.length; i < 64; i++) 
			{
				hdata += "00";
			}
			return _HardDrive.write(t,s,b, hdata);
		}
		
		
		public format()
		{
			var zero128 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
			//fill with all zeros
			for(var t = 0 ; t <= 3 ; t++)
			{		
				for(var s = 0; s <= 7 ; s++)
				{
					for(var b = 0; b <= 7 ; b++)
					{
						_HardDrive.write(t,s,b,zero128);
					}
				}
			}			
		
			this.updateHardDriveTable();
		}
		
		
		
		public readFile(fileName)
		{
			//IS IT ON THE LIST?
			var yesfile = false;
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				if(this.fileNames[x] == fileName)
				{
					//GOOD!!
					yesfile = true;
				}
			}		
		
		
			var meta;
			//FIND FILE 
			if(yesfile)
			{
				for(var t = 0 ; t <= 3 ; t++)
				{		
					for(var s = 0; s <= 7 ; s++)
					{
						for(var b = 0; b <= 7 ; b++)
						{
							var data = _HardDrive.read(t,s,b);
						
							if(data.substring(4) == fileName)
							{
							//MATCH!
							meta =  data.substring(1,4);						
							}					
						}
					}	
				}
				
				
			}
			else
			return "No such file found.";
			
			//GET METADATA 
			return this.read(meta.charAt(0),meta.charAt(1),meta.charAt(2));
		
		
		}
		
		
		
		//TABLE FUNCTIONS
		
		public updateHardDriveTable()
		{
			
			
			for(var t = 0 ; t <= 3 ; t++)
			{		
				for(var s = 0; s <= 7 ; s++)
				{
					for(var b = 0; b <= 7 ; b++)
					{
					var cell =  <HTMLTableDataCellElement>document.getElementById(t + ":" + s + ":" + b + "m");
					var data = _HardDrive.read(t,s,b)
					var head =  data.substring(0,4);
					cell.innerHTML = head;
					
					
					cell =  <HTMLTableDataCellElement>document.getElementById(t + ":" + s + ":" + b + "d");
					
					//var updateData = _HardDrive.read(t,s,b);
					cell.innerHTML = data;					
					
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
					cell.id=t + ":" + s + ":" + b + "m";					
					cell.innerHTML = "0000";
					
					
					cell = row.insertCell(2);
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