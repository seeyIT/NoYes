#include <iostream>
#include <conio.h>
#include<math.h>
using namespace std;


class Base
{
protected:
	virtual void setNumbers();	
	
	virtual void Parimeter();
	
	virtual void Area();
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
	
	void Area()
	{
		int p = (a+b+c)/2;
		cout<<sqrt(p*(p-a)*(p-b)*(p-c));
	}
	void Parimeter()
	{
		cout<<a+b+c;
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
	void Area()
	{
		
		cout<<a*b;
	}
	void Parimeter()
	{
		cout<<(a+b)*2;
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
	void Area()
	{
		
		cout<<a*b*M_PI;
	}
	void Parimeter()
	{
		cout<<M_PI*(3*(a+b)-sqrt((a+3*b)*(3*a+b)));
	}
	
};

int main()
{
	Triangle *triangle = new Triangle;
	Rectangle  *rect = new Rectangle;
	Elipse *elipse = new Elipse;
	

	
	return 0;
}
