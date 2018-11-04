function clock()
{
	this.x=500;
	this.y=500;
}

clock.prototype.show =function()
{
	fill(255);
	rect(this.x,this.y,30,30);
}