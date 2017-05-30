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
	
	void WpiszRandom()
	{
			for(int i =0;i<n;i++)
		{
			for(int j=0;j<m;j++)
			{
				
				table[i][j] = rand()%20+1;
				
			}
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

