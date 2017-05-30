
#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;

int main()
{
	
	ifstream textFile;
	textFile.open("szyfr3.txt");
	
	ofstream encycrypted;
	encycrypted.open("wyniki_szyfr3.txt");
	string strings;

	int intKeys[6] = {6,2,4,1,5,3};
	string a;
	if (textFile.good())
	{
		
		getline(textFile, strings);
		
		
	}
	


	for(int i = 49 ; i >= 0; --i)
	{
		
		char newLetter = strings[intKeys[i%6]-1];
		char oldLetter = strings[i];
		
		strings[intKeys[i%6]-1] = oldLetter;
		strings[i] = newLetter;
		
		
	}
	cout<<strings<<endl;
	encycrypted << strings << "\n";
	
	

	encycrypted.close();
	textFile.close();

	

	
	system("pause");
    return 0;
}

