// 77.1.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;

int main()
{
	char tab[26][26] = {
		{ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' },
		{ 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A' },
		{ 'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B' },
		{ 'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C' },
		{ 'E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D' },
		{ 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E' },
		{ 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F' },
		{ 'H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G' },
		{ 'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H' },
		{ 'J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I' },
		{ 'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J' },
		{ 'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K' },
		{ 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L' },
		{ 'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M' },
		{ 'O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N' },
		{ 'P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O' },
		{ 'Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P' },
		{ 'R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q' },
		{ 'S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R' },
		{ 'T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S' },
		{ 'U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T' },
		{ 'V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U' },
		{ 'W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V' },
		{ 'X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W' },
		{ 'Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X' },
		{ 'Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y' }
	};
	ifstream textFile;
	textFile.open("dokad.txt");
	string text = "";
	string key ="LUBIMYCZYTAC";
	string pureKey = "LUBIMYCZYTAC";
	int keyCopies = 1;
	ofstream encycrypted;
	encycrypted.open("771odpowiedzi.txt");
	
	if (textFile.good())
	{
		getline(textFile, text);
	}
	//text = "JEST OK";
	int spacesIterator = 0 ;
	for (int i = 0; i < text.length(); ++i)
	{
		if(text[i]==' ' || text[i]==',' || text[i]=='.')
		{
			++spacesIterator;
			continue;
		}
		if(key.length()+spacesIterator<=i)
		{
			key = key + pureKey;
			++keyCopies;
		}
		int textIndex = -1, keyIndex = -1;
		for (int j = 0; j<26; ++j)
		{

			if (text[i] == tab[0][j])
			{
				textIndex = j;
			}
			if (key[i-spacesIterator] == tab[0][j])
			{
				keyIndex = j;
			}
		}
		if (textIndex != -1 && keyIndex != -1)
		{

			text[i] = tab[keyIndex][textIndex];

		}
	}
	encycrypted<< keyCopies << "\n"<< text  ;
	encycrypted.close();
	textFile.close();
	//772
	
	ifstream textFile2;
	textFile2.open("szyfr.txt");
	string text2 = "";
	string key2 ="";
	string pureKey2 = "";
	int keyCopies2 = 1;
	ofstream encycrypted2;
	encycrypted2.open("772odpowiedzi.txt");

	
	if (textFile2.good())
	{
		getline(textFile2, text2);
		getline(textFile2, key2);
		pureKey2 = key2;
	}

	int spacesIterator2 = 0 ;

	for (int i = 0; i < text2.length(); ++i)
	{
		if(text2[i]==' ' || text2[i]==',' || text2[i]=='.')
		{
			++spacesIterator2;
			continue;
		}
		if(key2.length()+spacesIterator2<=i)
		{
			key2 = key2 + pureKey2;
			++keyCopies2;
			//cout<<key<<endl;
		}
		for (int j = 0; j < 26; ++j)
		{
			if (key2[i-spacesIterator2] == tab[j][0])
			{
				for (int k = 0; k < 26; ++k)
				{
					if (tab[j][k] == text2[i])
					{
						text2[i] = tab[0][k];
						break;
					}
					
				}
				break;
			}
			
		}
		
	}
	encycrypted2<<  text2  ;
	textFile2.close();
	encycrypted2.close();
	
	
	//773
	int numbers3[26];
	ifstream textFile3;
	textFile3.open("szyfr.txt");
	string text3 = "";
	string key3 = "";
	double k = 0;
	int spacesIterator3 = 0 ;	
	int keyCopies3 = 1;
	int numbersAllletters3 = 0;
	ofstream encycrypted3;
	encycrypted3.open("773odpowiedzi.txt");
	
	
	if (textFile3.good())
	{
		getline(textFile3, text3);
		getline(textFile3, key3);
		
	}
	for(int i = 0;i<26;++i)
	{
		numbers3[i] = 0;
	}
	
	for(int i = 0 ;i < text3.length();++i)
	{
		for(int j =0;j<26;++j)
		{
			if(text3[i] == tab[j][0])
			{
				++numbers3[j];
				break;
			}
		}
	}
	
	
	
	for(int i = 0;i<26;++i)
	{
		numbersAllletters3 += numbers3[i];
		k = k + (numbers3[i]* (numbers3[i]-1));
		encycrypted3 << tab[i][0] << " " << numbers3[i] << "\n";
	}
	k =k/ (numbersAllletters3* (numbersAllletters3-1));
	
	
	k = (0.0285) / (k - 0.0385);
	k *= 100;
	int foo = k;
	k = foo;
	k/=100;	
//	cout<<"Przyblizona: " << k <<" Prawdziwa dlugosz: "<<key3.length();
	encycrypted3 << "Przyblizona: " << k <<" Prawdziwa dlugosz: "<< key3.length();
	textFile3.close();
	encycrypted3.close();	
	
	system("pause");
    return 0;
}

