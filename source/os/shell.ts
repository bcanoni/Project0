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

module TSOS 
{
    export class Shell 
	{
        // Properties
        public promptStr = ">";
        public commandList = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";    		
		
        constructor() 
		{
        }

        public init()
		{		    
            var sc;
            // Load the command list. 
  
			(<HTMLInputElement> document.getElementById("Status")).value = "Status: Running";
            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
			
			// status <string>
			sc = new ShellCommand(this.shellStatus,
								  "status",
								  "<string> - Sets the status.");									;
			 this.commandList[this.commandList.length] = sc;
			
			// date
            sc = new ShellCommand(this.shellDate,
                                  "date",
                                  "- Displays the current date.");
            this.commandList[this.commandList.length] = sc;
			
			// whereami
			sc = new ShellCommand(this.shellWhereAmI,
                                  "whereami",
                                  "- Displays the current location");
            this.commandList[this.commandList.length] = sc;
			
		    // Pizza
            sc = new ShellCommand(this.shellPizza,
                                  "pizza",
                                  "- Displays the current pizza.");
            this.commandList[this.commandList.length] = sc;
			
		     //bsod
            sc = new ShellCommand(this.shellBsod,
                                  "bsod",
                                  "- Test BSOD.");
            this.commandList[this.commandList.length] = sc;
			
			 //load
            sc = new ShellCommand(this.shellLoad,
                                  "load",
                                  "- Loads and validates user code.");
            this.commandList[this.commandList.length] = sc;

			 //run
            sc = new ShellCommand(this.shellRun,
                                  "run",
                                  "- Run <PID> program");
            this.commandList[this.commandList.length] = sc;
			
			//
			 sc = new ShellCommand(this.shellClearMem,
                                  "clearmem",
                                  "- Clear all Mem");
            this.commandList[this.commandList.length] = sc; 
			
			
			
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
			
			sc = new ShellCommand(this.shellRunAll,
                                  "runall",
                                  "- Runs All Loaded Programs");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellQuantum,
                                  "quantum",
                                  "- Change Scheduling quantum. RR ");
            this.commandList[this.commandList.length] = sc;
			
			
			sc = new ShellCommand(this.shellCreate,
                                  "create",
                                  "- Create <filename> ");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellRead,
                                  "read",
                                  "- Read <filename> ");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellWrite,
                                  "write",
                                  "- Write <filename> ");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellDelete,
                                  "delete",
                                  "- Delete <filename>");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellFormat,
                                  "format",
                                  "- initialize all blocks in all sectors in all tracks");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellLS,
                                  "ls",
                                  "- List Files");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellSetSchedule,
                                  "setschedule",
                                  "- Set sechedule [rr,fcfs,priority");
            this.commandList[this.commandList.length] = sc;
			
			sc = new ShellCommand(this.shellGetSchedule,
                                  "getschedule",
                                  "- Get current cpu scheduling algorithm");
            this.commandList[this.commandList.length] = sc;
			
			
            
            // Display the initial prompt.
            this.putPrompt();
        }

        public putPrompt() 
		{
            _StdOut.putText(this.promptStr);
        }

        public handleInput(buffer) 
		{
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
            var index: number = 0;
            var found: boolean = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) 
			{
                if (this.commandList[index].command === cmd) 
				{
                    found = true;
                    fn = this.commandList[index].func;
                } 
				else 
				{
                    ++index;
                }
            }
            if (found) 
			{
                this.execute(fn, args);
            } 
			else 
			{
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) 
				{     // Check for curses.
                    this.execute(this.shellCurse);
                } 
				else if (this.apologies.indexOf("[" + cmd + "]") >= 0) 
				{        // Check for apologies.
                    this.execute(this.shellApology);
                } 
				else 
				// It's just a bad command. 
				{
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        public execute(fn, args?)
		{
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0)
			{
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }

        public parseInput(buffer): UserCommand
		{
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList)
			{
                var arg = Utils.trim(tempList[i]);
                if (arg != "") 
				{
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }

        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        public shellInvalidCommand()
		{
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) 
			{
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            } else 
			{
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }

        public shellCurse() 
		{
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }

        public shellApology() 
		{
           if (_SarcasticMode) 
		   {
              _StdOut.putText("I think we can put our differences behind us.");
              _StdOut.advanceLine();
              _StdOut.putText("For science . . . You monster.");
              _SarcasticMode = false;
           } else 
		   {
              _StdOut.putText("For what?");
           }
        }

        public shellVer(args) 
		{
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }
		
		public shellDate(args) 
		{
			var d = new Date();
			var dat = d.toLocaleDateString() + " " + d.toLocaleTimeString(); 		 
		    _StdOut.putText(dat);
		}
		
		public shellWhereAmI(args) 
		{
		    _StdOut.putText(APP_LOC);
		}
		
		public shellPizza(args) 
		{
		   _StdOut.putText("Here it comes..");		  
		   _StdOut.advanceLine();
		   //TODO fix this 
			for (var x in APP_PIZZA)
			{
				_StdOut.advanceLine();
				_StdOut.putText("" + APP_PIZZA[x]);			
			}
			_StdOut.advanceLine();
			_StdOut.putText("What a delicious pizza.");
		}
		
		public shellStatus(args)
		{
		    if (args.length > 0)
			{
				var str = args[0];
				for( var x = 1; x<args.length ; x++)
				{
					str += " " + args[x];
				}
				var status = args[0];
				(<HTMLInputElement> document.getElementById("Status")).value = "Status: " + str;
			} 
			else
			{
				_StdOut.putText("Usage: Status <status>  Please supply a status.");
			}		
		}
		
		//display bsod
		public shellBsod(args) 
		{		
			var img = document.getElementById("bsod");
			(<HTMLInputElement> document.getElementById("Status")).value = "Status: dead";
			_DrawingContext.drawImage(img,0,0);
			_Kernel.krnShutdown();		
		}
		
		//clear memory all 3 partitions
	    public shellClearMem(args) 
		{		
			_StdOut.putText("Clearing Memory..");
			_StdOut.advanceLine();
			_MemManager.clearMem();
			_StdOut.putText("Memory Clear.");
		
		}
		
		public shellQuantum(args)
		{
			//isNAN wow I learned something new !
			if (args>0) //IS NUMBER & POSITIVE
			{
				_Scheduler.quantum = args;
				_StdOut.putText("Quantum Updated!");				
			}
			else
			_StdOut.putText("valid <quantum> required.");
		
		
		}
		
		
		
		public shellLoad(args)		
		{
					
			//take in user data?
			//taProgramInput
			//only hex and spaces accept
			//0-9 A-F and spaces 
			var success = false;
			var userCode = (<HTMLInputElement> document.getElementById("taProgramInput")).value;	
			userCode = userCode.replace(/\s/g, "")  ; //destroy all spaces
			var output = "";
			_ProgramSize = 0;
			
		
			//if i see any non hex display a warning message instead otherwise parse by twos
			for(var x = 0; x < userCode.length ; x+=2)
			{		
				//seems a regular expression would help here as well 
				var temp = userCode.charAt(x) + userCode.charAt(x+1); //this represents a grouping of hex
		
				var patHex = /[^g-z]/g;
				var isHex = temp.match(patHex);
		
				if(isHex == null || isHex.length<2 )
				{
					//alert("THIS ISNT HEX");
					x=userCode.length;
					success = false;
				}
				else 
				{
					success = true;
					//The code was hex so add it to output after converting it
					_ProgramSize++;
					output += temp;//String.fromCharCode(parseInt(temp , 16));
				}		
		
		
		
			}		
					
			if(success&&_MemManager.firstFreePartition()!=6969)
			{
				
				if(output.length>512) //256*2 
				{
					_StdOut.putText("User code too long for current amount of memory");		
				}
				else
				{			
					_Scheduler.loadProgMem(output);					
					_StdOut.putText("Program Successfully loaded at PID: " + _PID);
					_PID++; //increment pid
					success=false; 
								
				}	
			}
			else
			{
				if(_MemManager.firstFreePartition()==6969)
				{
					//_StdOut.putText("Memory is full!");
					//Now going to write this code as a file instead 
					//going to work on writing the file in hard drive first
							
					
				    				
					_StdOut.putText("Program Successfully loaded at PID: " + _PID);
					
					_DiskManager.createFile("." + _PID );	
					_DiskManager.writeMemFile("."+ _PID , output);					
					//_Scheduler.loadProgHd(_PID);	
					_PID++; //increment pid
					
				
				}
					
				else
					_StdOut.putText("Invalid Code");
			}				
    		 
		
		}		
		
	    public shellRun(args)
     	{			
			if(_Scheduler.validPID(args))
			{
				_Scheduler.runAProgram(args);		
			}
			else
				_StdOut.putText("Invalid PID");	
		}
		
		public shellRunAll(args)
     	{			
			if(_Scheduler.residentQueue.length !== 0) //There are programs to run
			{
				_Scheduler.runAllPrograms(args);		
			}
			else
				_StdOut.putText("Load some programs first!");	
		}

        public shellHelp(args) 
		{
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) 
			{
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }
		
		 public shellKill(args) 
		{
            //
			if (_Scheduler.readyQueue[args] == null)
			{
				_StdOut.putText("Invalid PID/ Process isn't running.");
				
			}
			else
			{
				_Scheduler.readyQueue[args].state = 3; //terminated 
				//TODO move from ready queue to terminated queue
				
			}
         
        }
		
		public shellPS(args)
		{
			for (var x = 0 ; x < _Scheduler.readyQueue.length; x++ )
			{
				_StdOut.advanceLine();
				_StdOut.putText("PID: " + _Scheduler.readyQueue[x].pid + " running.");			
			}
			
		}
		
		public shellCreate(args)
		{
			//create file
			
			_StdOut.putText("File " + args[0] + ". Result:" + _DiskManager.createFile(args[0]) );			
		
		
		}
		
		public shellRead(args)
		{
			//args[0] = file name
			_StdOut.putText("" + _DiskManager.readFile(args[0]));
			//alert(_DiskManager.read(args[0],args[1],args[2]));
		
		}
		
		public shellWrite(args)
		{
			//_DiskManager
			
			if (args.length >= 2 ) //needs to have at least ""
			{          
				var output = "";
				for (var x = 1; x < args.length; x++) //REM args 1 was filename
				{
					output += args[x] + " ";
				}

				if ((output.charAt(0) == "\"") && (output.charAt(output.length - 2) == "\"")) 
				{
					output = output.slice(1).slice(0, output.length - 3); // Took a while
					_StdOut.putText("" + _DiskManager.writeFile(args[0],output));
				} else 
				{
					_StdOut.putText("Need Quotes");
				}			
			}
			else
			_StdOut.putText("need filename");
			
			
		}
		
		public shellDelete(args)
		{
			//DELETE
			_StdOut.putText("" + _DiskManager.deleteFile(args[0]));
		
		}
		
		public shellFormat(args)
		{	
			_DiskManager.format();
			_StdOut.putText("Format Complete." );	
			
		}
		
		public shellLS(args)
		{
			_StdOut.putText("-Files" );
			_StdOut.advanceLine();
			for(var x = 0; x< _DiskManager.fileNames.length; x++)
			{
				_StdOut.putText("|-" + _DiskManager.fileNames[x][0]);
				_StdOut.advanceLine();
			
			
			}
			_StdOut.putText("|");
		
		
		}
		
		public shellSetSchedule(args)
		{
		  if(args[0] == "rr") //round robin
		  _Scheduler.mode = 1;
		  else if(args[0] == "fcfs")
		  _Scheduler.mode = 2;
		  else if(args[0] == "priority")
		  _Scheduler.mode = 3;
		  else 
		  _StdOut.putText("Pick valid Algorithm [rr, fcfs, priorty]");
		  
		  
		}
		
		public shellGetSchedule(args)
		{
			if(_Scheduler.mode == 1)
			_StdOut.putText("Running in: Round Robin");
			else if(_Scheduler.mode == 2)
			_StdOut.putText("Running in: First Come First Serve.");
			else if(_Scheduler.mode == 3)
			_StdOut.putText("Running in: Priorty");
			
		}
		
		

        public shellShutdown(args) 
		{		     
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        }

        public shellCls(args)
		{
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }

        public shellMan(args) 
		{
            if (args.length > 0) 
			{
                var topic = args[0];
                switch (topic) 
				{
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
			else 
			{
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args) 
		{
            if (args.length > 0) 
			{
                var setting = args[0];
                switch (setting) 
				{
                    case "on":
                        if (_Trace && _SarcasticMode) 
						{
                            _StdOut.putText("Trace is already on, doofus.");
                        } else
						{
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
            } else 
			{
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args)
		{
            if (args.length > 0) 
			{
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else 
			{
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args) 
		{
            if (args.length > 0)
			{
                _OsShell.promptStr = args[0];
            } else 
			{
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }

    }
}
