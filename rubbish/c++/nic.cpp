#include <iostream>
#include <time.h>  
#include <stdlib.h>  
#include <math.h>

#include <stdio.h>  
using namespace std;



class Bazowa
{
	public:
		int a,b;
		
	public:
		void Dane(int x, int y)
		{
			a=y;
			b=y;
		}
	 void Pokaz()
	{
		cout<< 0;
		
	}
};

int main()
{
	Bazowa *ptrB = new Bazowa;

	ptrB->Pokaz();
}




