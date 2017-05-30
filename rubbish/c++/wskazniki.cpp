#include<iostream>

using namespace std;

void Swap(int &x, int &y)
{
	int foo = x;
	x=y;
	y=foo;
}

int main()
{
	int a=5,b=2;
	cout<<&a<<endl;
	cout<<a<<endl;
	
	int* pointer = NULL;
	pointer = &a;
	*pointer = 3;
	
	cout<<a<<endl;
	cout<<*pointer<<endl;
	
	cout<<&a<<endl;
	cout<<pointer<<endl;
	
	pointer = &b;
	
	cout<<b<<endl;
	cout<<*pointer<<endl;
	cout<<&b<<endl;
	
	cout<<"-----"<<endl;
	cout<<a<<" "<<b<<endl;
	Swap(a,b);
	cout<<"-----"<<endl;
	cout<<a<<" "<<b<<endl;
	return 0;
	
}
