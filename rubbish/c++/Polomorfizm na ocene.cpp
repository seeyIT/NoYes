#include <iostream>
#include <conio.h>
#include<math.h>
using namespace std;


class Base
{
protected:
	virtual void setNumbers(){;
	};	
	
	virtual double Parimeter(){;
	};
	
	virtual double Area(){;
	};
};

class Triangle : public Base
{
	
	double a,b,c;
	
public:
	void setNumbers(double x, double y, double z);
	double Area();
	double Parimeter();
	bool Exist();
};

class Rectangle : public Base
{
	double a,b;
	
public:	
	void setNumbers(double x,double y);
	
	double Area();
	
	double Parimeter();
	
};

class Elipse : public Base
{
	double a,b;
	
public:	
	void setNumbers(double x,double y);
	
	double Area();
	
	double Parimeter();
	
};

int main()
{
	double a,b,c;

	Triangle *triangle = new Triangle;
	Rectangle  *rect = new Rectangle;
	Elipse *elipse = new Elipse;
	
	cout<<"Boki trojkata: "<<endl;
	cin>>a;
	cin>>b;
	cin>>c;
	
	triangle->setNumbers(a,b,c);
	if(a<=0 || b<=0||c<=0)
		cout<<"Zle dane"<<endl;
		
	else if( triangle->Exist())
	{
		cout<<"pole: ";
		cout<<triangle->Area();
		cout<<endl;
		cout<<"obwod: ";
		cout<<triangle->Parimeter();
		cout<<endl;
	}
	else
		cout<<"bledne dane"<<endl;
	
	
	cout<<"boki prostokata"<<endl;
	cin>>a;
	cin>>b;
	if(a<=0||b<=0)
		cout<<"zle dane"<<endl;
		
	else
	{
		rect->setNumbers(a,b);
		cout<<"pole: ";
		cout<<rect->Area();
		cout<<endl;	
		cout<<"obwod: ";
		cout<<rect->Parimeter();
		cout<<endl;
	}
	
	cout<<"srednice elipsy:"<<endl;
	cin>>a;
	cin>>b;
	
	if(a<=0||b<=0)
		cout<<"zle dane"<<endl;
	
	else
	{
		elipse->setNumbers(a,b);
		cout<<"pole: ";
		cout<<elipse->Area();
		cout<<endl;
		cout<<"obwod: ";
		cout<<elipse->Parimeter();
		cout<<endl;
	}
	
	
	delete triangle;
	delete rect;
	delete elipse;
	
	return 0;
}


void Triangle::setNumbers(double x, double y, double z)
{
	a = x;
	b = y;
	c = z;
}

double Triangle::Area()
{
	double p = (a+b+c)/2;
 	return sqrt(p*(p-a)*(p-b)*(p-c));
}
double Triangle::Parimeter()
{
	 return a+b+c;
}

bool Triangle::Exist()
{
	double max;
	double min;
	
	if(a>b &&a>c)
	{
		max = a;
	}
	else if(b>c &&b>a)
	{
		max = b;		
	}
	else if(c>b &&c>a)
	{
		max = c;		
	}
	
	
	if(a+b+c-max > max)
		return true;
	else
		return false;
}


void Rectangle::setNumbers(double x,double y)
{
	a =x;
	b=y;
}
double  Rectangle::Area()
{
	return a*b;
}
double Rectangle::Parimeter()
{
	return (a+b)*2;
}

void Elipse::setNumbers(double x,double y)
{
	a =x;
	b=y;
}

double Elipse::Area()
{
	
	return a*b*M_PI;
}
double Elipse::Parimeter()
{
	return M_PI*((3*(a+b))/2-sqrt(a*b));
}

