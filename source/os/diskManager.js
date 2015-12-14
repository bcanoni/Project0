/// <reference path="../host/harddrive.ts"/>
/*
Brian Canoni
DiskManager
*/
var TSOS;
(function (TSOS) {
    var DiskManager = (function () {
        function DiskManager() {
            //REM BLOCKS OF 2 CAUSE HEX
            var headerLen = 4;
            var dataLen = 60;
            //for init purposes
        }
        DiskManager.prototype.init = function () {
            this.initHardDriveTable();
        };
        DiskManager.prototype.read = function (t, s, b) {
            return _HardDrive.read(t, s, b);
        };
        DiskManager.prototype.write = function (t, s, b, data) {
            return _HardDrive.write(t, s, b, data);
        };
        DiskManager.prototype.updateHardDriveTable = function () {
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
                        cell = row.insertCell(1);
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
