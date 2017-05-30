#include <iostream>
#include <conio.h>
using namespace std;


class Bazowa
{
	protected:
		int a,b;
		
	public:
		void Dane(int x, int y)
		{
			a=y;
			b=y;
		}
	virtual void Pokaz()
	{
		cout<<"nic";
		
	}
};

class P1 : public Bazowa
{
public:
	virtual void Pokaz()
	{
		cout<<"prostokat"<<a*b;
	
	}
};

class P2 : public Bazowa
{
public:
	virtual void Pokaz()
	{
		cout<<"troj "<<a*b*0.5;
	}
};
int main()
{
	Bazowa *ptrB = new Bazowa;
	P1 *pt1 = new P1;
	P2 *pt2 = new P2;
	
	ptrB->Pokaz();

	pt1->Dane(2,2);
	pt1->Pokaz();
	

	pt2->Dane(2,2);
	pt2->Pokaz();

	delete ptrB;
	delete pt1;
	delete pt2;
	
	
	getch();
	
	return 0;
}
