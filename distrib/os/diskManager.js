/// <reference path="../host/harddrive.ts"/>
/*
Brian Canoni
DiskManager
*/
var TSOS;
(function (TSOS) {
    var DiskManager = (function () {
        function DiskManager() {
        }
        DiskManager.prototype.init = function () {
            this.initHardDriveTable();
        };
        DiskManager.prototype.updateHardDriveTable = function () {
        };
        DiskManager.prototype.initHardDriveTable = function () {
            var hardTable = document.getElementById("hardTable");
            // 0:0:0 - 3:7:7
            for (var t = 0; t < 3; t++) {
                var footer = hardTable.createTFoot();
                var row = footer.insertRow(0);
                for (var s = 0; s < 7; s++) {
                    for (var b = 0; b < 7; b++) {
                        var cell = row.insertCell(0);
                        cell.innerHTML = t + ":" + s + ":" + b;
                        cell = row.insertCell(1);
                        row.id = t + ":" + s + ":" + b;
                    }
                }
            }
        };
        return DiskManager;
    })();
    TSOS.DiskManager = DiskManager;
})(TSOS || (TSOS = {}));
