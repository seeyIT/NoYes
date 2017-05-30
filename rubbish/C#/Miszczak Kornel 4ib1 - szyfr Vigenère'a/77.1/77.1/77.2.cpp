// 77.1.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
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
	textFile.open("szyfr.txt");
	string text = "";
	string key ="";
	string pureKey = "";
	int keyCopies = 1;
	ofstream encycrypted;
	encycrypted.open("772odpowiedzi.txt");

	
	if (textFile.good())
	{
		getline(textFile, text);
		getline(textFile, key);
		pureKey = key;
	}
	cout<<text<<endl;
	cout<<key<<endl;
	
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
			//cout<<key<<endl;
		}
		for (int j = 0; j < 26; ++j)
		{
			if (key[i-spacesIterator] == tab[j][0])
			{
				for (int k = 0; k < 26; ++k)
				{
					if (tab[j][k] == text[i])
					{
						text[i] = tab[0][k];
						break;
					}
					
				}
				break;
			}
			
		}
		
	}
	encycrypted<<  text  ;
	textFile.close();
	encycrypted.close();
//	cout<< key<<endl;
	//cout<<keyCopies<<endl;
	system("pause");
    return 0;
}

