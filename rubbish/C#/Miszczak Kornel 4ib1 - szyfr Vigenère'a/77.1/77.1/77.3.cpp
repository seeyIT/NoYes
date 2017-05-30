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

	int numbers[26];
	ifstream textFile;
	textFile.open("szyfr.txt");
	string text = "";
	string key = "";
	double k = 0;
	int spacesIterator = 0 ;	
	int keyCopies = 1;
	int numbersAllletters = 0;
	ofstream encycrypted;
	encycrypted.open("773odpowiedzi.txt");
	
	
	if (textFile.good())
	{
		getline(textFile, text);
		getline(textFile, key);
		
	}
	for(int i = 0;i<26;++i)
	{
		numbers[i] = 0;
	}
	
	for(int i = 0 ;i < text.length();++i)
	{
		for(int j =0;j<26;++j)
		{
			if(text[i] == tab[j][0])
			{
				++numbers[j];
				break;
			}
		}
	}
	
	
	
	for(int i = 0;i<26;++i)
	{
		numbersAllletters += numbers[i];
		k = k + (numbers[i]* (numbers[i]-1));
		encycrypted << tab[i][0] << " " << numbers[i] << "\n";
	}
	k =k/ (numbersAllletters* (numbersAllletters-1));
	
	
	k = (0.0285) / (k - 0.0385);
	k *= 100;
	int foo = k;
	k = foo;
	k/=100;	
	cout<<"Przyblizona: " << k <<" Prawdziwa dlugosz: "<<key.length();
	encycrypted << "Przyblizona: " << k <<" Prawdziwa dlugosz: "<< key.length();
	textFile.close();
	encycrypted.close();	
	system("pause");
    return 0;
}

