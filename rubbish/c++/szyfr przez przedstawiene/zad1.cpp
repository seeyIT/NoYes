
#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;

int main()
{
	
	ifstream textFile;
	textFile.open("szyfr1.txt");
	
	ofstream encycrypted;
	encycrypted.open("wyniki_szyfr1.txt");
	string *strings = new string[6];
	string *keys = new string[50];
	int *intKeys = new int[50];
	string a;
	if (textFile.good())
	{
		for(int i = 0 ; i < 6 ; ++i)
		{
			getline(textFile, strings[i]);
		}
		for(int i = 0;i<50;++i)
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
	for(int j=0;j<6;++j)
	{
		string row = strings[j];
		for(int i = 0 ; i < 50; ++i)
		{
			
			char newLetter = row[intKeys[i]-1];
			char oldLetter = row[i];
			row[intKeys[i]-1] = oldLetter;
			row[i] = newLetter;
			
		}
		encycrypted << row << "\n";
	}
	

	encycrypted.close();
	textFile.close();

	

	
	system("pause");
    return 0;
}

