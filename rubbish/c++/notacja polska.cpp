#include <iostream>
#include <string>
#include <cstdlib>
#include <sstream>
using namespace std;

bool IsSign(string sign);
int main()
{
	
	int brackets = 0;
	//cin>>numbers;
	string expression,foo;
	for(int loop =0; loop<1/*numbers*/; ++loop)
	{
		int value;
		cin>>value;
		cin>>expression;
		
		//int value = atoi(expression.substr(0).c_str()); // string to int
		//int firstNumberLength = expression.substr(0).length();
		
		string tab[value];
		int expressionLen = expression.length();
		
		string buffor = "";
		int tabIterator = 0;
		
		for(int i = 0;i<expressionLen; i++)
		{
			string foo;
		
			string oneChar(1, expression[i]);
			
			if(IsSign(oneChar))
			{
				buffor.append(oneChar);
			}
			else
			{
				if(buffor.compare("") != 0)
				{
					tab[tabIterator] = buffor;
					buffor = "";
					++tabIterator;
				}
				
		
				tab[tabIterator] = oneChar;
				++tabIterator;
						
		
			}
		}
		if(buffor != "")
		{
			tab[tabIterator] = buffor;
			buffor = "";
			++tabIterator;
		}
		
		for(int i =0;i<tabIterator ; i++)
		{
			//cout<<"----"<<endl;
			cout<<tab[i]<<endl;
		}
		
	
			int start,end;
			for(int i = 0 ; i < tabIterator ; ++i)
			{
				if(tab[i] == "(")
				{
					start =i;
				}
				else if( tab[i] == ")")
				{
					end = i;
					cout<<start<<endl;
					cout<<end<<endl;
					end--;
					start ++;
					for(;end>start;)
					{
						int sign;
						int number;
						int foo = end-1;
						while(tab[foo]!="")
						{
							sign = foo;
						}
						--foo;
						while(tab[foo]!="")
						{
							number = foo;
						}
						
						tab[number].append(tab[end]);
						tab[number].append(tab[sign]);
						tab[end] = "";
						tab[sign] = "";
						end-=3;
					}
					
					i=0;	
				}
				else if ( i+1 == tabIterator)
				{
					break;
				} 
			}
		
		cout<<"after --"<<endl;
		for(int i =0;i<tabIterator ; i++)
		{
			//cout<<"----"<<endl;
			cout<<tab[i]<<endl;
		}
	}
	
	
}


bool IsSign(string sign)
{
	//cout<<sign<<endl;
	if(sign.compare("+") == 0 ||
	 	sign.compare("-") == 0 ||
	 	sign.compare("*") == 0 ||
		sign.compare("/") == 0 ||
	    sign.compare("%") == 0 ||
		sign.compare("(") == 0 ||
	  	sign.compare(")") == 0 )	  	
	{
		//cout<<"I: "<<sign<<endl;
		
		return false; 
	}
	else
	{
		//cout<<"a : "<<sign<<endl;
		return true; // number or letter
	}
}
