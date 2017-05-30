#include <iostream>
#include <time.h>  
#include <stdlib.h>  
#include <math.h>
using namespace std;
#ifndef matrix_h
#define matrix_h

class Matrix
{
	int n,m;
	int **table;
	string name;
	
	
	
public:
	friend Matrix Multiply(Matrix mat1, Matrix mat2);
	friend Matrix MultipyByNumber(Matrix mat1, int x);
	friend Matrix Add(Matrix mat1, Matrix mat2);
	friend Matrix Transponate(Matrix mat1);
	friend Matrix operator +(Matrix mat1, Matrix mat2);
	friend Matrix operator *(float x,Matrix mat1);
	friend Matrix operator *(Matrix mat1, Matrix mat2);
	friend istream& operator >>(istream &wej, Matrix &mat1);
	friend ostream& operator <<(ostream &wyj, Matrix &mat1);
	
	//friend Matrix MakeItSmaller(Matrix mat,int row,int column);
	//friend int Determinant(Matrix mat);
	
	
	void setMatrix(void);
	void getMatrix(void);
	
	void det2x2(void);
	void det3x3(void);
	
	Matrix(int x,int y, string nam);
	

	void MakeMatrix();
	
	void WpiszRandom();
	void FillZeros();
	
	void FillMatrix();

	
	void Display();
	
	int Determinant(Matrix mat);

	Matrix MakeItSmaller(Matrix mat,int row,int column);
		
};


 ostream& operator <<(ostream &wyj, Matrix &mat1);
 istream& operator >>(istream &wej, Matrix &mat1);
 



Matrix operator +(Matrix mat1, Matrix mat2);

Matrix operator *(float x,Matrix mat1);
Matrix operator *(Matrix mat1, Matrix mat2);



Matrix Multiply(Matrix mat1, Matrix mat2);

Matrix MultipyByNumber(Matrix mat1,int x);

Matrix Add(Matrix mat1,Matrix mat2);

Matrix Transponate(Matrix mat1);


#endif
