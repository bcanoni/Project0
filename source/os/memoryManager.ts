///<reference path="../globals.ts" />
/// <reference path="./PCB.ts"/>

module TSOS {

    export class MemoryManager {


        constructor(){}


		//load 
		
        public loadProgram(program: string):void {
            var toMemory;
            var index=0;
			/*
            for (var i = 0; i < program.length; i++) {


                toMemory = program.slice(i, i + 2);
                _Memory.coreM[index] = toMemory;
                _Kernel.krnTrace("Index: " + index + " value: " + _Memory.coreM[index].toString());
                i++;
                index++;


            }
			*/
            _PCB = new PCB();
            _PCB.init();
            _StdOut.putText("new process, pid= " + _PCB.pid);
             
            this.updateMemoryTable(program);

            /*

             toMemory=program.charAt(i)+program.charAt(i+1);
             _CPU.memory[_CPU.memory.length]=toMemory;
             _Kernel.krnTrace(toMemory);
             }
             */


        }


        public toAddress(): number{
            var index;
            _CPU.PC++;
            var b=_Memory.coreM[_CPU.PC];
            _CPU.PC++;
            var a=_Memory.coreM[_CPU.PC];
            var address=a.concat(b);
            index=parseInt(address,16);
            return index



        }
		
		
		public updateMemoryTable(program): void{
            //var memoryIndex=0;
            //var rowIndex;
            //var colIndex;
			
			
			//EACH ROW HAS AN ID   'row0' row + row num
			//EACH CELL HAS AN ID 'cell00'  cell + row num + cell num 0-7
			
			var curRow = 0;
			var curCell = 7;
			
			for(var z = 0; z < program.length ; z+=2)
		    {
			var temp = program.charAt(z) + program.charAt(z+1); //this represents a grouping of hex
			    
				
				
				
				
					
						var cell = <HTMLTableDataCellElement>document.getElementById("cell"+curRow+""+curCell);
						//alert("cell"+curRow+""+curCell);
						cell.innerHTML = temp;
					  
						curCell--;
					if(curCell<0)
					{
				    curRow+=8;
					curCell=7;
					}
						
			
			}
			
			
			/*
			//put prog in memory at first free available row.
			//free row Ill define as all zeros
			
			var freeRow;
			
			var checker = "00000000";
			var temp = "";
			for(var x = x<_Memory.Data.size(); x+=8)
			{
			  var c = 0;
              while(c <8 )
              {
                temp += _Memory.Data[x+c];

				c++;
			  }
			  if(temp === checker)
			  {
			  //row is empty start populating form here
			  //end loop
			
			   freeRow = x;
			   x = _Memory.Data.size();
			  }
			  else
			  temp ="";
			
			}
			*/
		    

            





                       
                    
                



            }





    }

}