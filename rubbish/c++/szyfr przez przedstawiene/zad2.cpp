
#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;

int main()
{
	
	ifstream textFile;
	textFile.open("szyfr2.txt");
	
	ofstream encycrypted;
	encycrypted.open("wyniki_szyfr2.txt");
	string strings;

	int *intKeys = new int[15];
	string a;
	if (textFile.good())
	{
		
		getline(textFile, strings);
		
		for(int i = 0;i<15;++i)
		{
			textFile >> intKeys[i];
		}
	//	getline(textFile,a);
	}
	
//	for(int i = 0 ; i < 6 ; ++i)
//	{
//		cout<<strings[i]<<endl<<endl;
//	}
//	for(int i = 0;i<50;++i)
//	{
//		cout<< intKeys[i]<<endl;
//	}

		for(int i = 0 ; i < 50; ++i)
		{
			
			char newLetter = strings[intKeys[i%15]-1];
			char oldLetter = strings[i];
			strings[intKeys[i%15]-1] = oldLetter;
			strings[i] = newLetter;
			
		}
		encycrypted << strings << "\n";
	
	

	encycrypted.close();
	textFile.close();

	

	
	system("pause");
    return 0;
}

