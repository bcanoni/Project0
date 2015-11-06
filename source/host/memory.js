///<reference path="../globals.ts" />
///<reference path="../os/memorymanager.ts" />
/*
Brian Canoni Memory


*/
var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(sizeMem, Data) {
            if (sizeMem === void 0) { sizeMem = 0; }
            if (Data === void 0) { Data = null; }
            this.sizeMem = sizeMem;
            this.Data = Data;
        }
        Memory.prototype.init = function () {
            this.sizeMem = 256;
            this.Data = new Array(256);
            //populate the mem table 
            for (var x = 0; x < this.sizeMem; x++) {
                this.Data[x] = "00";
            }
            _MemManager = new TSOS.MemoryManager();
            _MemManager.initMemoryTable();
            /*
            var memTable: HTMLTableElement = (<HTMLTableElement> document.getElementById("memTable"));
         
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
            */
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
