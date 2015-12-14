///<reference path="../globals.ts" />



module TSOS 
{

    export class HardDrive
	{
		private diskDrive 
		
		
		
		
		
		//What is a track?
		//what is a sector?
		//what is a block?
		
		
		constructor(public tracks = 0,
					public sectors = 0,
					public blocks = 128	 
		 
					 ){}
					 
					 
		public write(t, s, b, data)
		{
			var key = this.getKey(t, s, b);
			sessionStorage.setItem(key, data);

		}	
		
	    public read(t, s, b)
		{
			var key = this.getKey(t, s, b);
			sessionStorage.getItem(key);

		}



		public getKey( t, s, b)
		{
			return t + ":" + s + ":" + b;
		
		}
					 
					 

		
		
	
	}
	
	
}

