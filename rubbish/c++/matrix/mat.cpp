#include <iostream>
#include <time.h>  
#include <stdlib.h>  
#include <math.h>

#include "matrix.cpp"
#include "matrix.h"

using namespace std;





Matrix Multiply(Matrix mat1, Matrix mat2);
Matrix MultipyByNumber(Matrix mat1, int x);
Matrix Add(Matrix mat1, Matrix mat2);
Matrix Transponate(Matrix mat1);
//Matrix MakeItSmaller(Matrix mat,int row,int column);
//int Determinant(Matrix mat);

int main()
{
	srand (time(NULL));
	
	Matrix m2(3,4,"a");
	cout<<"wpisz macierz 3x4";
	cout<<endl;
	cin>>m2;
	cout<<"macierz 3x4";
	cout<<endl;
	cout<<m2;
	cout<<endl;
	
	Matrix m3 = 3*m2;
	cout<<"macierz 3x4 razy 3";
	cout<<endl;
	cout<<m3;
	cout<<endl;
	
	cout<<endl;
	cout<<"wpisz macierz 3x4 do dadania"<<endl;
	Matrix m10(3,4,"aaa");
	cin>>m10;
	cout<<m10;
	cout<<endl;
	cout<<"po dodaniu"<<endl;
	Matrix m11 =m10+m2;	
	cout<<m11;
	cout<<endl;
	
	cout<<"wpisz macierz 4x3";
	cout<<endl;
	Matrix m4(4,3,"aa");
	cin>>m4;
	
	Matrix m5 = m2*m4;
	cout<<"macierz 3x4 * 4x3";
	cout<<endl;
	cout<<m5;
	cout<<endl;
	
	cout<<"macierz 3x5 do transponowania (random)";
	cout<<endl;
	Matrix m12(3,5,"asd");
	m12.WpiszRandom();
	cout<<m12;
	cout<<"macierz 5x3 po transponowaniu";
	cout<<endl;
	Matrix m6 = Transponate(m12);
	cout<<m6;
	
	
	cout<<endl;
	cout<<"wysnacznik 3x3";
	Matrix m8(3,3,"asd");
	cout<<endl;
	m8.WpiszRandom();
	cout<<m8;
	cout<<endl;
	cout<<m8.Determinant(m8);
	cout<<endl;
	
	
	
	cout<<endl;
	cout<<"wyznacznik 6x6"<<endl;
	Matrix m9(6,6,"asd");
	m9.WpiszRandom();
	cout<<m9;
	cout<<m9.Determinant(m9);
	
}




















