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
int values[MAXN+1] = {0};
bool TAK = true;


void DFS(int v,int value)
{
	if(values[v]!=0)
	{
		return;
	}
	values[v] = value;
	value = value * (-1);
	visit[v]=true;
	
	for(int i=0;i<edge[v].size();i++)
	{
		
		if(!visit[edge[v][i]])
		{
			
			father[edge[v][i]]=v;
		
			DFS(edge[v][i],value);
			
		}
		else
		{
			if(values[edge[v][i]] == values[v])
			{
				TAK = false;
			}
		}
		
	}
}
void DFSS(int v)
{
	visit[v]=true;
	cout<<1<<"a"<<endl;
	for(int i=0;i<edge[v].size();i++)
	{
		if(!visit[edge[v][i]])
		{
			//cout<<v<<" "<<i<<endl;
			father[edge[v][i]]=v;
//			cout<<father[edge[v][i]]<<endl;
			DFSS(edge[v][i]);
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

	DFS(1,1);
	if(TAK)
	{
		cout <<"TAK";
	}
	else
	{
		cout <<"NIE";
	}
	return 0;
}



//void BFS(int n)
//{
//	queue<int> Q;
//	visit[n]=1;
//	Q.push(n);
//	while(!Q.empty())
//	{
//		int v=Q.front();
//		Q.pop();
//		for(int i=0;i<(int)edge[v].size();i++)
//		{
//			if(!visit[edge[v][i]])
//			{
//				visit[edge[v][i]]=1;
//				Q.push(edge[v][i]);
//			}
//		}
//	}
//}
