#include <iostream>
using namespace std;

int main()
{
	
	
	string pattern = "as";
	string text = "aassd";
	
	for(int i =0;i<text.length();i++)
	{
		
		for(int j =0;;)
		{
			cout<<text[i]<<endl;
			if(text[i]==pattern[j])
			{
			
				//cout<<pattern[j]<<endl;
				if(pattern.length() ==j+1)
				{
					cout<<"znalazlo";
					break;
				}
				
				j++;
			}
			else
			{
				break;
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	return 0;
	
}
