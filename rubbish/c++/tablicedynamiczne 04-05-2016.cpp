#include <iostream>
#include <cmath>
#include <cstdlib>
using namespace std;



int main()
{
	int **tab,n,m;
	cin>>n>>m;
	
	tab = new int*[n];
	
	
	for(int i =0;i<n;i++)
		tab[i] = new int[m];
		
	for(int i =0;i<n;i++)
	{
		for(int j=0;j<m;j++)
		{
			tab[i][j] = 0;
		}
	}
		
	for(int i =0;i<n;i++)
	{
		for(int j=0;j<m;j++)
		{
			cout<<tab[i][j];
			cout<<" ";
		}
	
		cout<<endl;
	}	
	
}



