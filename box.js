function box(x,y)
{		
	this.x = x;
	this.y = y;
	// this.i = i;
	// this.j = j;
this.show = function()
{
	fill(255);
	rect(this.x,this.y,40,40);
}
}