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
					public fileNames = []
					//public newFile = {name:"",loc:""}				
					){}
		
		public init()
		{
			this.initHardDriveTable();
		
		}
		
		public createFile(fileName)
		{
			
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				if(this.fileNames[x][0] == fileName)
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
			
			
			var loc = this.nextFree();
			if(loc != null)
			{
				this.write(loc.charAt(0),loc.charAt(1),loc.charAt(2),fileName);
				
				
				this.addHeader(loc.charAt(0),loc.charAt(1),loc.charAt(2),"1000");
				
				this.updateHardDriveTable();
				
				//this.newFile.name = fileName;
				
				//this.newFile.loc = loc;
				var nf = [fileName,loc];
				this.fileNames.push(nf); //at end of array
				
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
		
		public nextFreeO(st , ss , sb) //OVERLOADED VERSION 
		{
			
			var data;
			
			for(var t = st ; t <= 3 ; t++)
			{			
				
				for(var s = ss; s <= 7 ; s++)
				{
					for(var b = sb; b <= 7 ; b++)
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
			var temp = _HardDrive.read(t,s,b);
			var output = "";
			
			for(var x = 4 ; x<temp.length ;x+=2)
			{
				var bit = temp.charAt(x) + temp.charAt(x+1)				
				output+= String.fromCharCode(parseInt(bit , 16));			
			}
			
			
			return output;
		}
		
		public writeFile(fileName,newData)
		{			
			var location = "";			
			
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				if(this.fileNames[x][0] == fileName)
				{
					location = this.fileNames[x][1];
					x = this.fileNames.length;				
				}
			
			}
			if(location == "")
			{
				return "file not found.";			
			}			
			
			//GRAB META DATA
			
			
			var meta = this.getHeader(location.charAt(0),location.charAt(1),location.charAt(2));
			var metalocation = meta.substring(1,4);			
			
			//If the meta isnt set give it the first free 
			//Starting at 1:0:0
			//CHECK DATA LENGTH AND BREAK IT INTO BLOCKS
			if(meta == "1000")
			{	
				
				var newlocation =  this.nextFreeO("1", "0", "0");
				
				this.setHeader(location.charAt(0),location.charAt(1),location.charAt(2),"1"+newlocation);				
				for(var x = 0 ; x < (newData.length/this.dataLen) ; x++)
				{
					newlocation = this.nextFreeO("1","0","0");
					this.write(newlocation.charAt(0),newlocation.charAt(1),newlocation.charAt(2),      newData.substring(64 * x,  60 * (x+1)));	
					var newmeta = this.nextFreeO("1","0","0");
					if(newData.length>120)
					{
						this.addHeader(newlocation.charAt(0),newlocation.charAt(1),newlocation.charAt(2),"1"+newmeta);
					}
					
					
				}
				//END OF DATA
				this.setHeader(newlocation.charAt(0),newlocation.charAt(1),newlocation.charAt(2),"1000");	
			
			}
			else //go to meta and clear and write
			{
				this.write(metalocation.charAt(0),metalocation.charAt(1),metalocation.charAt(2),newData);
				this.addHeader(metalocation.charAt(0),metalocation.charAt(1),metalocation.charAt(2),"1000");							
			}
			
			this.updateHardDriveTable();
			return "Success";
			
		}	
		
		
		//Memory is already in hex so I will use a separate method for dealing with it 
		public writeMemFile(fileName,newData)
		{			
			var location = "";			
			
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				if(this.fileNames[x][0] == fileName)
				{
					location = this.fileNames[x][1];
					x = this.fileNames.length;				
				}
			
			}
			if(location == "")
			{
				return "file not found.";			
			}			
			
			//GRAB META DATA
			
			
			var meta = this.getHeader(location.charAt(0),location.charAt(1),location.charAt(2));
			var metalocation = meta.substring(1,4);			
			
			//If the meta isnt set give it the first free 
			//Starting at 1:0:0
			//CHECK DATA LENGTH AND BREAK IT INTO BLOCKS
			if(meta == "1000")
			{	
				
				var newlocation =  this.nextFreeO("1", "0", "0");
				
				this.setHeader(location.charAt(0),location.charAt(1),location.charAt(2),"1"+newlocation);				
				for(var x = 0 ; x < (newData.length/this.dataLen) ; x++)
				{
					newlocation = this.nextFreeO("1","0","0");
					
					this.writeMem(newlocation.charAt(0),newlocation.charAt(1),newlocation.charAt(2), newData.substring(120 * x,  120 * (x+1)));	
					var newmeta = this.nextFreeO("1","0","0");
					
					
					if(newData.length>120)
					{
						this.addHeader(newlocation.charAt(0),newlocation.charAt(1),newlocation.charAt(2),"1"+newmeta);
					}					
					
				}
				//END OF DATA
				this.setHeader(newlocation.charAt(0),newlocation.charAt(1),newlocation.charAt(2),"1000");	
			
			}
			else //go to meta and clear and write
			{
				this.writeMem(metalocation.charAt(0),metalocation.charAt(1),metalocation.charAt(2),newData);
				this.addHeader(metalocation.charAt(0),metalocation.charAt(1),metalocation.charAt(2),"1000");							
			}
			
			this.updateHardDriveTable();
			return "Success";
			
		}
		
		//No hex to dec conversions here
		public writeMem(t,s,b,data)
		{
			var hdata = "";
			
			hdata = data;
		
			for (var i = data.length; i < 60; i++) 
			{
				hdata += "00";
			}
			
			return _HardDrive.write(t,s,b, hdata);
		
		}
		
		
		
		
		
		public getContent(t,s,b)
		{
			//CONVERT HEX TO DEC
			return _HardDrive.read(t,s,b);
		}
		
		public addHeader(t,s,b,head)
		{
		
			var data = _HardDrive.read(t,s,b);				
			
			var update = head + data;
		
			_HardDrive.write(t,s,b,update);	
		
		}
		
		public setHeader(t,s,b,head)
		{
			
			var data = _HardDrive.read(t,s,b);
			var content = data.slice(4);
			
			
			var update = head + content;
		
			_HardDrive.write(t,s,b,update);	
		
		}
		
		public getHeader(t,s,b)
		{
			return _HardDrive.read(t,s,b).substring(0,4);
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
			
			
			for (var i = data.length; i < 60; i++) 
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
			var meta = "000";
			var found = false;
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				
				if(this.fileNames[x][0] == fileName)
				{
					//GOOD!!
					found = true;
					
					meta = _HardDrive.read(this.fileNames[x][1].charAt(0),this.fileNames[x][1].charAt(1),this.fileNames[x][1].charAt(2)).substring(1,4);
				}
			}
			if(!found)
			{
				return "File not found.";
			}
			if(meta == "000")
			{
				return "File Empty.";
			}

				
		
			var result = this.read(meta.charAt(0),meta.charAt(1),meta.charAt(2));
			
			return result;
		
		
		}
		
		public deleteFile(fileName)
		{
			//does file exist
			var location = "";			
			
			for(var x = 0; x < this.fileNames.length ; x++)
			{
				if(this.fileNames[x][0] == fileName)
				{
					location = this.fileNames[x][1];
					x = this.fileNames.length;				
				}
			
			}
			if(location == "")
			{
				return "file not found.";			
			}			
			
			//location found
			//remove file from filename list
			 this.fileNames.splice(this.fileNames.indexOf(fileName), 1);
			 
			 //put in zeros
			 var zero128 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
			 _HardDrive.write(location.charAt(0),location.charAt(1),location.charAt(2),zero128);
			 this.updateHardDriveTable();
			 return "File Deleted.";
			
		
		
		
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
					cell.innerHTML = data.slice(4);					
					
					}
					
				}
				
			}				
		
		}
		
		
		public initHardDriveTable()
		{
			//saving time when executing
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

function newFile(n , l)
{
	this.name = n;
	this.loc = l;

}
