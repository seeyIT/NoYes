#include <iostream>
#include <time.h>  
#include <stdlib.h>  
#include <math.h>
using namespace std;
#include "matrix.h"

Matrix::Matrix(int x,int y,string nam)
	{
		n = x;
		m = y;
		name = nam;
		
		MakeMatrix();
		
	};
	

	void Matrix::MakeMatrix()
	{
		table = new int*[n];
		
		for(int i=0;i<n;i++)
		{
			table[i] = new int[m];
		}		
	}
	
	void Matrix::WpiszRandom()
	{
			for(int i =0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				
				table[i][j] = rand()%20+1;
				
			}
		}			
	}
	void Matrix::FillZeros()
	{
		for(int i=0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				table[i][j] = 0;
			}
		}
	}
	
	void Matrix::FillMatrix()
	{
	
		for(int i =0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				cout<<i<<" "<<j<<endl;
				
				int x;
				cin>>x;
				table[i][j] = x;
				
			}
		}				
	}

	
	void Matrix::Display()
	{
		for(int i =0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				cout<<table[i][j];
				cout<<" ";
			}
			cout<<endl;
		}
	}
	
	int Matrix::Determinant(Matrix mat)
	{
		if(mat.n!=mat.m)
			return 0;
		
		int det=0;
		int zera=0;
		int row=0;
		int counter=0;
		
		if(mat.n==1)
			return mat.table[0][0];
		else if(mat.n==2)	
			return (mat.table[0][0]*mat.table[1][1] - mat.table[0][1]*mat.table[1][0]);
		
		Matrix foo(mat.n-1,mat.m-1,"foo");
		
		int len = mat.n;
		for(int i =0;i<len;i++)
		{
			counter=0;
			for(int j =0;j<len;j++)
			{
				if(mat.table[i][j] ==0)
					counter++;
			}
			if(zera<counter)
			{
				zera=counter;
				row = i;
			}
	}
	
	
	
	
		for(int i =0;i<len;i++)
		{
			Matrix foo = MakeItSmaller(mat,zera,i);
			det += mat.table[row][i]*pow((-1),(row+i))*(Determinant(foo));
		}
		
		return det;
	}


	Matrix Matrix::MakeItSmaller(Matrix mat,int row,int column)
	{
		Matrix foo(mat.n-1,mat.m-1,"foo");
		
		int len = mat.m;
		
		for(int i =0,  j =0;i<len;i++)
		{
			if(i==row)
				continue;
				
			for(int k=0,  o=0;k<len;k++)
			{
				if(k==column)
					continue;
					
				foo.table[j][o] = mat.table[i][k];
				o++;
			}
			
			j++;
		}
		
		return foo;
	}
	
	
	
 ostream& operator <<(ostream &wyj, Matrix &mat1)
 {
 		for(int i =0;i<mat1.n;i++)
		{
			for(int j=0;j<mat1.m;j++)
			{
				wyj<<mat1.table[i][j];
				wyj<<" ";
			}
			wyj<<endl;
		}
 }
 istream& operator >>(istream &wej, Matrix &mat1)
 {
 	int x;
 	for(int i =0;i<mat1.n;i++)
		{
			for(int j=0;j<mat1.m;j++)
			{
				
				wej>>x;
				mat1.table[i][j] = x;
				
			}
		}
 }
 



Matrix operator +(Matrix mat1, Matrix mat2){
	if(mat1.n!=mat2.n||mat1.m!=mat2.m)
		return  Matrix(0,0,"foo");
		
	Matrix foo(mat1.n,mat1.m,"foo");	
	foo.FillZeros();
	
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat1.m;j++)
		{
			foo.table[i][j] =mat1.table[i][j] + mat2.table[i][j]; 
		}
	}
	
	return foo;
}

Matrix operator *(float x,Matrix mat1)
{
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat1.m;j++)
		{
			mat1.table[i][j] =mat1.table[i][j] * x; 
		}
	}
	
	return mat1;
}

Matrix operator *(Matrix mat1, Matrix mat2)
{
	if(mat1.m != mat2.n)
	{
		cout<<"error, zle wymiary";
		return  Matrix(0,0,"foo");
	}
		
	Matrix foo(mat1.n,mat2.m,"foo");	
	foo.FillZeros();
	
	
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat2.m;j++)
		{
			for(int k=0;k<mat2.n;k++)
			{
				foo.table[i][j] = foo.table[i][j] + (mat1.table[i][k] * mat2.table[k][j]);
			}
		
		}
	}	
	
	
	return foo;
}



Matrix Multiply(Matrix mat1, Matrix mat2)
{
	if(mat1.m != mat2.n)
	{
		return  Matrix(0,0,"foo");
	}
		
	Matrix foo(mat1.n,mat2.m,"foo");	
	foo.FillZeros();
	
	
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat2.m;j++)
		{
			for(int k=0;k<mat2.n;k++)
			{
				foo.table[i][j] = foo.table[i][j] + (mat1.table[i][k] * mat2.table[k][j]);
			}
		
		}
	}	
	
	
	return foo;
}

Matrix MultipyByNumber(Matrix mat1,int x)
{
	
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat1.m;j++)
		{
			mat1.table[i][j] =mat1.table[i][j] * x; 
		}
	}
	
	return mat1;
}

Matrix Add(Matrix mat1,Matrix mat2)
{
	if(mat1.n!=mat2.n||mat1.m!=mat2.m)
		return  Matrix(0,0,"foo");
		
	Matrix foo(mat1.n,mat1.m,"foo");	
	foo.FillZeros();
	
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat1.m;j++)
		{
			foo.table[i][j] =mat1.table[i][j] + mat2.table[i][j]; 
		}
	}
	
	return foo;
}

Matrix Transponate(Matrix mat1)
{
	Matrix foo(mat1.m,mat1.n,"foo");
	for(int i=0;i<mat1.n;i++)
	{
		for(int j=0;j<mat1.m;j++)
		{
			foo.table[j][i] = mat1.table[i][j];
		}
	}
		
	
	return foo;
}	
