#include <iostream>
#include <cmath>
using namespace std;
class Cricle
{

	double r,x,y;	
	
public:
	
	Cricle(double radius,double k,double l);
	void SetR(double radius);
	void SetX(double xPos);
	void SetY(double yPos);
	double GetX();
	double GetR();
	double GetY();
	double Perimeter();
	double Area();
	double GetValues();
	
	
	
};



int main()
{
	Cricle circle(10,10,10);
	cout<<circle.GetR();
	cout<<circle.GetX();
	cout<<circle.GetY();
	circle.SetR(5);
	circle.SetY(4);
	circle.SetX(3);
	cout<<circle.GetR();
	cout<<circle.GetX();
	cout<<circle.GetY();
	return 0;
}

Cricle::Cricle(double radius,double k,double l)
{
		r = radius;
		x = k;
		y = l;
}
double Cricle::Perimeter(){
	return r*2*M_PI;
	
};
double Cricle::Area()
{
	return r*r*M_PI;
};

void Cricle::SetR(double radius)
{
	r = radius;
};
void Cricle::SetX(double xPos)
{
	x = xPos;
}
void Cricle::SetY(double yPos)
{
	y = yPos;
};
double Cricle::GetR()
{
	return r;
};
double Cricle::GetX()
{
	return x;
};
double Cricle::GetY()
{
	return y;
};
