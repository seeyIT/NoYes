#include <iostream>
#include <time.h>  
#include <stdlib.h>  
#include <math.h>
using namespace std;



class Matrix
{
	int n,m;
	int **table;
	string name;
	
	
	
public:
	//friend Matrix Multiply(Matrix mat1, Matrix mat2);
	//friend Matrix MultipyByNumber(Matrix mat1, int x);
	//friend Matrix Add(Matrix mat1, Matrix mat2);
	//friend Matrix Transponate(Matrix mat1);
	friend Matrix operator +(Matrix mat1, Matrix mat2);
	friend Matrix operator *(float x,Matrix mat1);
	friend Matrix operator *(Matrix mat1, Matrix mat2);
	friend istream& operator >>(istream &wej, Matrix &Y);
	friend ostream& operator <<(ostream &wyj, Matrix &Y);
	
	//friend Matrix MakeItSmaller(Matrix mat,int row,int column);
	//friend int Determinant(Matrix mat);
	
	
	void setMatrix(void);
	void getMatrix(void);
	
	void det2x2(void);
	void det3x3(void);
	
	Matrix(int x,int y,string nam)
	{
		n = x;
		m = y;
		name = nam;
		
		MakeMatrix();
		
	};
	

	void MakeMatrix()
	{
		table = new int*[n];
		
		for(int i=0;i<n;i++)
		{
			table[i] = new int[m];
		}		
	}
	
	void FillZeros()
	{
		for(int i=0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				table[i][j] = 0;
			}
		}
	}
	
	void FillMatrix()
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
	void FillMatrixRandom()
	{
	
		for(int i =0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				
				table[i][j] =rand()%20+1;
				
			}
		}				
	}
		
	
	void Display()
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
	
	int Determinant(Matrix mat)
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


	Matrix MakeItSmaller(Matrix mat,int row,int column)
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
		
};


Matrix Multiply(Matrix mat1, Matrix mat2);
Matrix MultipyByNumber(Matrix mat1, int x);
Matrix Add(Matrix mat1, Matrix mat2);
Matrix Transponate(Matrix mat1);
//Matrix MakeItSmaller(Matrix mat,int row,int column);
//int Determinant(Matrix mat);

int main()
{
	srand (time(NULL));
	
	Matrix m1(4,4,"asd");
	m1.FillMatrixRandom();
	m1.Display();
	cout<<endl;
	Matrix m2(4,4,"dd");
	m2.FillMatrixRandom();
	m2.Display();
	cout<<endl;
	Matrix m3 = m1+m2;
	m3.Display();
	cout<<endl;
	
	
	Matrix m4 = 3*m1;
	m4.Display();
	Matrix m5 = m1*m2;
	m5.Display();
}





/*
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

*/
/*
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
*/
