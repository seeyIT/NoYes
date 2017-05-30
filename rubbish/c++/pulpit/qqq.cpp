#include <iostream>
#include <conio.h>
#include<math.h>
using namespace std;


class Base
{
protected:
	virtual void setNumbers();	
	
	virtual int Parimeter();
	
	virtual int Area();
};

class Triangle : public Base
{
	int a,b,c;
	
public:
	void setNumbers(int x, int y, int z)
	{
		a = x;
		b = y;
		c = z;
	}
	
	int Area()
	{
		int p = (a+b+c)/2;
	 	return sqrt(p*(p-a)*(p-b)*(p-c));
	}
	int Parimeter()
	{
		 return a+b+c;
	}
	
};

class Rectangle : public Base
{
	int a,b;
	
public:	
	void setNumbers(int x,int y)
	{
		a =x;
		b=y;
	}
	int Area()
	{
		
	 	return a*b;
	}
	int Parimeter()
	{
		return (a+b)*2;
	}
	
};

class Elipse : public Base
{
	int a,b;
	
public:	
	void setNumbers(int x,int y)
	{
		a =x;
		b=y;
	}
	int Area()
	{
		
		return a*b*M_PI;
	}
	int Parimeter()
	{
		return M_PI*(3*(a+b)-sqrt((a+3*b)*(3*a+b)));
	}
	
};

int main()
{
	cout<<1;
	Triangle *triangle = new Triangle;
//	Rectangle  *rect = new Rectangle;
//	Elipse *elipse = new Elipse;
	
//	triangle->setNumbers(2,3,4);
//	triangle->Area();
//	triangle->Parimeter();
	
	
//	rect->setNumbers(2,3);
//	rect->Area();
//	rect->Parimeter();
	
	//elipse->setNumbers(2,3);
//	elipse->Area();
	//elipse->Parimeter();
	
	delete triangle;
	//delete rect;
//	delete elipse;
	
	return 0;
}
