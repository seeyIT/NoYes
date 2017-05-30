#include <iostream>
#include <conio.h>
using namespace std;


class Bazowa
{
public:
		
	int i;
	int Pokaz()
	{
		cout<<"jestem virtual";
		return i;
	}
};

class P1 : virtual public Bazowa
{
public:
	int j;
	int Pokaz1()
	{
		cout<<"jestem 1"<<endl;
		return j;
	}
};

class P2 : virtual public Bazowa
{
public:
	int k;
	int Pokaz2()
	{
		cout<<"jestem 2k"<<endl;
		return k;
	}
};

class P3 : public P1, public P2
{
	public:
		int l;
		int Pokaz3()
		{
			cout<<"jestem 3"<<endl;
			return l;
		}
};


int main()
{

	P3 k;
	k.i = 100;
	
	k.j = 200;
	k.k = 300;
	k.l = 400;
	
	cout<<k.Pokaz()<<endl;
		cout<<k.Pokaz1()<<endl;
			cout<<k.Pokaz2()<<endl;
				cout<<k.Pokaz3()<<endl;
				
	
	
	
	getch();
	
	return 0;
}
