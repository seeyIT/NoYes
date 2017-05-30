#include <iostream>
#include <cstdlib>
#include <vector>
#include <queue>   
using namespace std;

#define MAXN 1000
#define INF 1000000000

int n;
int m;
vector<int> edge[MAXN+1];
int father[MAXN+1];
bool visit[MAXN+1] = {false};

bool TAK = true;



void DFS(int v)
{
	visit[v]=true;
	
	for(int i=0;i<edge[v].size();i++)
	{
		
		if(!visit[edge[v][i]])
		{
			
			father[edge[v][i]]=v;
		
			DFS(edge[v][i]);
			
		}
		
		
	}
}


int main()
{
	int n,m;
  cin >> n >> m;
  
  while(m--)
  {
    int a,b,c;
    cin >> a >> b ;
    edge[a].push_back(b);
    edge[b].push_back(a);
    
  }
  cout<<endl;
	int x;
	cin >>x;
	
	while(x>0)
	{
		int start,finish;
		cin>>start >> finish;
		
		BFS(1);
		if(visit[start] == visit[finish])
		{
			cout<<"TAK";
		}
		else
		
		{
			cout << "NIE";
		}
		
		
		 visit[MAXN+1] = {false};			
		
		x--;
	}
	

	return 0;
}



