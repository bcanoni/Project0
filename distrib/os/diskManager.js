/// <reference path="../host/harddrive.ts"/>
/*
Brian Canoni
DiskManager
*/
var TSOS;
(function (TSOS) {
    var DiskManager = (function () {
        function DiskManager(headerLen, dataLen, fileNames) {
            if (headerLen === void 0) { headerLen = 4; }
            if (dataLen === void 0) { dataLen = 60; }
            if (fileNames === void 0) { fileNames = []; }
            this.headerLen = headerLen;
            this.dataLen = dataLen;
            this.fileNames = fileNames;
        }
        DiskManager.prototype.init = function () {
            this.initHardDriveTable();
        };
        DiskManager.prototype.createFile = function (fileName) {
            /*
            for(var x = 0; x < this.fileNames.length ; x++)
            {
                if(this.fileNames[x] == fileName)
                {
                    //BAD!
                    return null;
                }
            }
            */
            //if no space 
            //return
            // if file too big
            //cannot be > 60
            //
            //OTHERWISE SET THIS
            //find first next free spot
            this.fileNames.push(fileName); //at end of array
            var loc = this.nextFree();
            if (loc != null) {
                _HardDrive.write(loc.charAt(0), loc.charAt(1), loc.charAt(2), fileName);
                return null;
            }
            return null;
        };
        DiskManager.prototype.nextFree = function () {
            var data;
            for (var t = 0; t <= 3; t++) {
                for (var s = 0; s <= 7; s++) {
                    for (var b = 0; b <= 7; b++) {
                        data = _HardDrive.read(t, s, b);
                        alert(data);
                        if (data.substring(0, 4) == "0000") {
                            return t + "" + s + "" + b;
                        }
                    }
                }
            }
            return null;
        };
        DiskManager.prototype.read = function (t, s, b) {
            //CONVERT HEX TO DEC
            return _HardDrive.read(t, s, b);
        };
        DiskManager.prototype.getContent = function (t, s, b) {
            //CONVERT HEX TO DEC
            return _HardDrive.read(t, s, b);
        };
        DiskManager.prototype.write = function (t, s, b, data) {
            var hdata = data.toString(16);
            return _HardDrive.write(t, s, b, hdata);
        };
        DiskManager.prototype.updateHardDriveTable = function () {
            for (var t = 0; t <= 3; t++) {
                for (var s = 0; s <= 7; s++) {
                    for (var b = 0; b <= 7; b++) {
                        var cell = document.getElementById(t + ":" + s + ":" + b + "d");
                        var updateData = _HardDrive.read(t, s, b);
                        cell.innerHTML = updateData;
                    }
                }
            }
        };
        DiskManager.prototype.initHardDriveTable = function () {
            var zero128 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            var hardTable = document.getElementById("hardTable");
            // 0:0:0 - 3:7:7
            var footer = hardTable.createTFoot();
            var row = footer.insertRow(0);
            for (var t = 0; t <= 3; t++) {
                for (var s = 0; s <= 7; s++) {
                    for (var b = 0; b <= 7; b++) {
                        var cell = row.insertCell(0);
                        cell.innerHTML = t + ":" + s + ":" + b;
                        cell.id = t + ":" + s + ":" + b;
                        cell = row.insertCell(1);
                        cell.id = t + ":" + s + ":" + b + "d";
                        cell.innerHTML = (zero128);
                        _HardDrive.write(t, s, b, zero128);
                        row.id = t + ":" + s + ":" + b;
                        row = footer.insertRow();
                    }
                }
            }
        };
        return DiskManager;
    })();
    TSOS.DiskManager = DiskManager;
})(TSOS || (TSOS = {}));
