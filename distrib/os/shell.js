///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
/* ------------
   Brian Canoni

   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            // Properties
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            var sc;
            // Load the command list. 
            document.getElementById("Status").value = "Status: Running";
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            // status <string>
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string> - Sets the status.");
            ;
            this.commandList[this.commandList.length] = sc;
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- Displays the current date.");
            this.commandList[this.commandList.length] = sc;
            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereAmI, "whereami", "- Displays the current location");
            this.commandList[this.commandList.length] = sc;
            // Pizza
            sc = new TSOS.ShellCommand(this.shellPizza, "pizza", "- Displays the current pizza.");
            this.commandList[this.commandList.length] = sc;
            //bsod
            sc = new TSOS.ShellCommand(this.shellBsod, "bsod", "- Test BSOD.");
            this.commandList[this.commandList.length] = sc;
            //load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- Loads and validates user code.");
            this.commandList[this.commandList.length] = sc;
            //run
            sc = new TSOS.ShellCommand(this.shellRun, "run", "- Run <PID> program");
            this.commandList[this.commandList.length] = sc;
            //
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", "- Clear all Mem");
            this.commandList[this.commandList.length] = sc;
            /*
            // ps  - list the running processes and their IDs
            sc = new ShellCommand(this.shellPS,
                                  "ps",
                                  "- display running processes and their IDs");
            this.commandList[this.commandList.length] = sc;
            // kill <id> - kills the specified process id.
            sc = new ShellCommand(this.shellKill,
                                  "kill",
                                  "- Kill <PID> program");
            this.commandList[this.commandList.length] = sc;
            */
            // Display the initial prompt.
            this.putPrompt();
        };
        Shell.prototype.putPrompt = function () {
            _StdOut.putText(this.promptStr);
        };
        Shell.prototype.handleInput = function (buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match.  TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else 
                // It's just a bad command. 
                {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };
        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        Shell.prototype.execute = function (fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        };
        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Lower-case it.
            buffer = buffer.toLowerCase();
            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift(); // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };
        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };
        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };
        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        };
        Shell.prototype.shellVer = function (args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        };
        Shell.prototype.shellDate = function (args) {
            var d = new Date();
            var dat = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            _StdOut.putText(dat);
        };
        Shell.prototype.shellWhereAmI = function (args) {
            _StdOut.putText(APP_LOC);
        };
        Shell.prototype.shellPizza = function (args) {
            _StdOut.putText("Here it comes..");
            _StdOut.advanceLine();
            //TODO fix this 
            for (var x in APP_PIZZA) {
                _StdOut.advanceLine();
                _StdOut.putText("" + APP_PIZZA[x]);
            }
            _StdOut.advanceLine();
            _StdOut.putText("What a delicious pizza.");
        };
        Shell.prototype.shellStatus = function (args) {
            if (args.length > 0) {
                var str = args[0];
                for (var x = 1; x < args.length; x++) {
                    str += " " + args[x];
                }
                var status = args[0];
                document.getElementById("Status").value = "Status: " + str;
            }
            else {
                _StdOut.putText("Usage: Status <status>  Please supply a status.");
            }
        };
        //display bsod
        Shell.prototype.shellBsod = function (args) {
            var img = document.getElementById("bsod");
            document.getElementById("Status").value = "Status: dead";
            _DrawingContext.drawImage(img, 0, 0);
            _Kernel.krnShutdown();
        };
        //clear memory all 3 partitions
        Shell.prototype.shellClearMem = function (args) {
            _StdOut.putText("Clearing Memory..");
            _StdOut.advanceLine();
            _MemManager.clearMem();
            _StdOut.putText("Memory Clear.");
        };
        Shell.prototype.shellLoad = function (args) {
            //CLEAR MEM TABLE FOR NOW
            for (var x = 0; x <= _Memory.sizeMem; x += 8) {
                //each of 8 bits
                for (var y = 7; y >= 0; y--) {
                    var cell = document.getElementById("cell" + x + "" + y);
                    cell.innerHTML = "00";
                }
            }
            //take in user data?
            //taProgramInput
            //only hex and spaces accept
            //0-9 A-F and spaces 
            var success = false;
            var userCode = document.getElementById("taProgramInput").value;
            userCode = userCode.replace(/\s/g, ""); //destroy all spaces
            var output = "";
            _ProgramSize = 0;
            //if i see any non hex display a warning message instead otherwise parse by twos
            for (var x = 0; x < userCode.length; x += 2) {
                //seems a regular expression would help here as well 
                var temp = userCode.charAt(x) + userCode.charAt(x + 1); //this represents a grouping of hex
                var patHex = /[^g-z]/g;
                var isHex = temp.match(patHex);
                if (isHex == null || isHex.length < 2) {
                    //alert("THIS ISNT HEX");
                    x = userCode.length;
                    success = false;
                }
                else {
                    success = true;
                    //The code was hex so add it to output after converting it
                    _ProgramSize++;
                    output += temp; //String.fromCharCode(parseInt(temp , 16));
                }
            }
            if (success) {
                if (output.length >= _Memory.sizeMem) {
                    _StdOut.putText("User code too long for current amount of memory");
                }
                else {
                    success = false;
                    //_MemManager.loadProgram(output);
                    _Scheduler.loadProgMem(output);
                    _StdOut.putText("Program Successfully loaded at PID: " + _PID);
                    _PID++; //increment pid
                }
            }
            else
                _StdOut.putText("Invalid Code");
        };
        Shell.prototype.shellRun = function (args) {
            if (_Scheduler.validPID(args)) {
                _Scheduler.runAProgram(args);
            }
            else
                _StdOut.putText("Invalid PID");
        };
        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };
        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };
        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };
        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    // TODO: Make descriptive MANual page entries for the the rest of the shell commands here.
                    //Providing manual for each command
                    case "ver":
                        _StdOut.putText("Ver displays current version.");
                        break;
                    case "shutdown":
                        _StdOut.putText("Shutdown shutsdown the OS ");
                        break;
                    case "cls":
                        _StdOut.putText("Cls clears the screen and resets cursor position");
                        break;
                    case "man":
                        _StdOut.putText("Man <topic> provides a manual for the command in the topic field");
                        break;
                    case "trace":
                        _StdOut.putText("Trace <on | off> turns off or on the trace function of the OS");
                        break;
                    case "rot13":
                        _StdOut.putText("rot13 <string> provides the rot13 obfuscation of the provided string");
                        break;
                    case "prompt":
                        _StdOut.putText("Prompt <string> sets the prompt");
                        break;
                    case "date":
                        _StdOut.putText("Date displays the date");
                        break;
                    case "status":
                        _StdOut.putText("status <string> updates the status to the provided string");
                        break;
                    case "whereami":
                        _StdOut.putText("whereami displays where you are");
                        break;
                    case "pizza":
                        _StdOut.putText("Makes a perfect pizza");
                        break;
                    case "bsod":
                        _StdOut.putText("displays bsod and shutsdown");
                        break;
                    case "load":
                        _StdOut.putText("load takes in and processes user code");
                        break;
                    case "run":
                        _StdOut.putText("run <pid> runs program at specified location");
                        break;
                    case "clearMem":
                        _StdOut.putText("Clears All Memory");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        };
        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };
        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };
        return Shell;
    })();
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
