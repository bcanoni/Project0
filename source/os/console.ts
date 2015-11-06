///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {
         
        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "") {
        }

        public init(): void {
		   
            this.clearScreen();
            this.resetXY();
        }

        private clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        private resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }
        
        public handleInput(): void {
		     var commands = [];
			
		     //var pos = 1;
		
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
               


			   if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
					//pos++;
					_CommandHistory.push(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                }
				else if (chr === String.fromCharCode(8)) { // delete
				//delete letter right before
				
				
				     //clear from canvas in form of rectangles the width of letters? hopefully this works...
                     var bufferlength = this.buffer.length;


                    var deleteAmount = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.substr(bufferlength - 1, bufferlength));
				    _DrawingContext.clearRect(this.currentXPosition - deleteAmount , this.currentYPosition - 14, 18, 18);
                    
					//kept forgetting to put the cursor back
					this.currentXPosition = this.currentXPosition - deleteAmount;

                    this.buffer = this.buffer.substr(0, bufferlength - 1);	
				
				
				
				
				}
				
			    else if (chr === String.fromCharCode(9)) { //tab
				
				var output = "";
				
				
				//take currently entered stuff in the buffer and see if itll auto complete to anything
				//alert("wow it made it here");
				
				//go through all commands
				  for (var x= 0 ; x < _OsShell.commandList.length; x++) {
				  
				        //if command contains part of current buffer
                        if(_OsShell.commandList[x].command.search(this.buffer) == 0){
                            commands.push(_OsShell.commandList[x].command);
                        }
                    }
					
					//pop the command off now and output it 
					
					
					
					
					if(commands.length >= 1)
					{
					//multi tab...? just do the first one
					output = commands.pop();
					}
					else if (commands.length == 0 )
					{
					 output="help"; //help as default command seems helpful
					
					}
					else 
					{
					// input doesnt match anything
				    //just put back the stuff
					output = this.buffer;
					}
					
					
					 var deleteAmount = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.substr(bufferlength - 1, bufferlength));
				    
					//Just delete the whole line?
					_DrawingContext.clearRect(10 , this.currentYPosition - 14, 500, 19);
                    
					//kept forgetting to put the cursor back
					this.currentXPosition = this.currentXPosition - deleteAmount;

                    this.buffer = output;
					
                        _StdOut.putText(this.buffer);
				
				}
				
				else if (chr === String.fromCharCode(38)) { //up
				
				    if(_CommandHistory.length>1)//there is a history
					{
				    //DELETE LINE 
				    var deleteAmount = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.substr(bufferlength - 1, bufferlength));
				    
					//Just delete the whole line?
					_DrawingContext.clearRect(10 , this.currentYPosition - 14, 500, 19);
                    
					//kept forgetting to put the cursor back
					this.currentXPosition = this.currentXPosition - deleteAmount;
				    //DELETE COMPLETE
					
					//ok now I have to use my command history global 
					
					  //add popped commands to a down array 
					   this.buffer = _CommandHistory.pop();
					  _DownCommands.push(this.buffer);
					 
					  _StdOut.putText(this.buffer);
					  
					  
					}
					
					
					
				}
				
				else if (chr === String.fromCharCode(40)) { //down
				
				
				  if(_DownCommands.length>1)//there is stuff in the down array
					{
				    //DELETE LINE 
				    var deleteAmount = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.substr(bufferlength - 1, bufferlength));
				    
					//Just delete the whole line?
					_DrawingContext.clearRect(10 , this.currentYPosition - 14, 500, 19);
                    
					//kept forgetting to put the cursor back
					this.currentXPosition = this.currentXPosition - deleteAmount;
				    //DELETE COMPLETE
					
					//now take the first element in the array and delete that 
					this.buffer = _DownCommands[0];
					 _StdOut.putText(this.buffer);
					//now slice that ish
					_DownCommands= _DownCommands.slice(1);
					
					}
				
				}
				
				
				
				
				else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        }

        public putText(text): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            //
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            //         Consider fixing that.
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
         }

        public advanceLine(): void {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize + 
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin;

			
			
            // TODO: Handle scrolling. (iProject 1)
			// uhhh might have the right idea here but not sure
			//This will move up in increments of one line until it is above the height
			//I wonder if I can move up in multiples .. Nah....
			if(this.currentYPosition >= _Canvas.height)
			{
			var diff = _DefaultFontSize +
		    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
			_FontHeightMargin; //just using the same formula as the current y position above 
			
			
			
			
		
			var img = _DrawingContext.getImageData(0,diff,_Canvas.width, _Canvas.height);
			_DrawingContext.clearRect(0,0,_Canvas.width,_Canvas.height);
			_DrawingContext.putImageData(img, 0, 0);
			
			this.currentYPosition = _Canvas.height - this.currentFontSize;
			
			
			
			}
			
		
			
		
			
        }
    }
 }
