/// <reference path="../host/harddrive.ts"/>
/*
Brian Canoni
DiskManager
*/
var TSOS;
(function (TSOS) {
    var DiskManager = (function () {
        function DiskManager(headerLen, dataLen, fileNames, newFile) {
            if (headerLen === void 0) { headerLen = 4; }
            if (dataLen === void 0) { dataLen = 60; }
            if (fileNames === void 0) { fileNames = []; }
            if (newFile === void 0) { newFile = { name: "", loc: "" }; }
            this.headerLen = headerLen;
            this.dataLen = dataLen;
            this.fileNames = fileNames;
            this.newFile = newFile;
        }
        DiskManager.prototype.init = function () {
            this.initHardDriveTable();
        };
        DiskManager.prototype.createFile = function (fileName) {
            for (var x = 0; x < this.fileNames.length; x++) {
                if (this.fileNames[x].name == fileName) {
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
            if (loc != null) {
                this.write(loc.charAt(0), loc.charAt(1), loc.charAt(2), fileName);
                this.addHeader(loc.charAt(0), loc.charAt(1), loc.charAt(2), "1000");
                this.updateHardDriveTable();
                this.newFile.name = fileName;
                this.newFile.loc = loc;
                this.fileNames.push(this.newFile); //at end of array
                return "Success!"; //success
            }
            return null;
        };
        DiskManager.prototype.nextFree = function () {
            var data;
            for (var t = 0; t <= 3; t++) {
                for (var s = 0; s <= 7; s++) {
                    for (var b = 0; b <= 7; b++) {
                        data = _HardDrive.read(t, s, b);
                        if (data.substring(0, 4) == "0000") {
                            return t + "" + s + "" + b;
                        }
                    }
                }
            }
            return null;
        };
        DiskManager.prototype.nextFreeO = function (st, ss, sb) {
            var data;
            for (var t = st; t <= 3; t++) {
                for (var s = ss; s <= 7; s++) {
                    for (var b = sb; b <= 7; b++) {
                        data = _HardDrive.read(t, s, b);
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
            var temp = _HardDrive.read(t, s, b);
            var output = "";
            for (var x = 4; x < temp.length; x += 2) {
                var bit = temp.charAt(x) + temp.charAt(x + 1);
                output += String.fromCharCode(parseInt(bit, 16));
            }
            return output;
        };
        DiskManager.prototype.writeFile = function (fileName, newData) {
            var location = "";
            for (var x = 0; x < this.fileNames.length; x++) {
                if (this.fileNames[x].name == fileName) {
                    location = this.fileNames[x].loc;
                    x = this.fileNames.length;
                }
            }
            if (location == "") {
                return "file not found.";
            }
            //GRAB META DATA
            var meta = this.getHeader(location.charAt(0), location.charAt(1), location.charAt(2));
            location = meta.substring(1, 4);
            //If the meta isnt set give it the first free 
            //Starting at 1:0:0
            if (meta == "1000") {
                var newlocation = this.nextFreeO("1", "0", "0");
                this.setHeader(location.charAt(0), location.charAt(1), location.charAt(2), "1" + newlocation);
                this.write(newlocation.charAt(0), newlocation.charAt(1), newlocation.charAt(2), newData);
                this.addHeader(newlocation.charAt(0), newlocation.charAt(1), newlocation.charAt(2), "1000");
            }
            else {
                this.write(location.charAt(0), location.charAt(1), location.charAt(2), newData);
                this.addHeader(location.charAt(0), location.charAt(1), location.charAt(2), "1000");
            }
            this.updateHardDriveTable();
            return "Success";
        };
        DiskManager.prototype.getContent = function (t, s, b) {
            //CONVERT HEX TO DEC
            return _HardDrive.read(t, s, b);
        };
        DiskManager.prototype.addHeader = function (t, s, b, head) {
            var data = _HardDrive.read(t, s, b);
            var update = head + data;
            _HardDrive.write(t, s, b, update);
        };
        DiskManager.prototype.setHeader = function (t, s, b, head) {
            var data = _HardDrive.read(t, s, b);
            var content = data.slice(4);
            var update = head + content;
            _HardDrive.write(t, s, b, update);
        };
        DiskManager.prototype.getHeader = function (t, s, b) {
            return _HardDrive.read(t, s, b).substring(0, 4);
        };
        DiskManager.prototype.setContent = function (t, s, b, content) {
        };
        DiskManager.prototype.write = function (t, s, b, data) {
            var hdata = "";
            for (var x = 0; x < data.length; x++) {
                //char code of char at x 
                //
                //var b1 = ;//
                //var b2 = ;//
                var b1 = data.charCodeAt(x);
                var b2 = b1.toString(16);
                hdata += b2;
            }
            for (var i = data.length; i < 64; i++) {
                hdata += "00";
            }
            return _HardDrive.write(t, s, b, hdata);
        };
        DiskManager.prototype.format = function () {
            var zero128 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            //fill with all zeros
            for (var t = 0; t <= 3; t++) {
                for (var s = 0; s <= 7; s++) {
                    for (var b = 0; b <= 7; b++) {
                        _HardDrive.write(t, s, b, zero128);
                    }
                }
            }
            this.updateHardDriveTable();
        };
        DiskManager.prototype.readFile = function (fileName) {
            //IS IT ON THE LIST?
            var meta = "000";
            for (var x = 0; x < this.fileNames.length; x++) {
                alert(this.fileNames[x].name);
                if (this.fileNames[x].name == fileName) {
                    //GOOD!!
                    alert(this.fileNames[x].loc.charAt(0) + ":" + this.fileNames[x].loc.charAt(1) + this.fileNames[x].loc.charAt(2));
                    meta = _HardDrive.read(this.fileNames[x].loc.charAt(0), this.fileNames[x].loc.charAt(1), this.fileNames[x].loc.charAt(2)).substring(1, 4);
                }
            }
            alert("loc of data" + meta);
            var result = this.read(meta.charAt(0), meta.charAt(1), meta.charAt(2));
            return result;
        };
        //TABLE FUNCTIONS
        DiskManager.prototype.updateHardDriveTable = function () {
            for (var t = 0; t <= 3; t++) {
                for (var s = 0; s <= 7; s++) {
                    for (var b = 0; b <= 7; b++) {
                        var cell = document.getElementById(t + ":" + s + ":" + b + "m");
                        var data = _HardDrive.read(t, s, b);
                        var head = data.substring(0, 4);
                        cell.innerHTML = head;
                        cell = document.getElementById(t + ":" + s + ":" + b + "d");
                        //var updateData = _HardDrive.read(t,s,b);
                        cell.innerHTML = data.slice(4);
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
                        cell.id = t + ":" + s + ":" + b + "m";
                        cell.innerHTML = "0000";
                        cell = row.insertCell(2);
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
