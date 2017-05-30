// SzyfrCezara.cpp : Defines the entry point for the console application.
//
//#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;


int main()
{
	string text = "";
	int shift = 1;
	int alphabetLen = 46;
	char table[] =
	{ 'a','b','c',
		'd','e','f' ,'g'
		,'h' ,'i' ,'j' ,'k',
		'l',	'm' ,'n',
		'o','p' ,'r' ,'s' ,'t','u' ,'w' ,'y',
		'z' ,	'A' ,
		'B' ,'C'  ,'D' ,'E' ,
		'F','G' ,'H' ,'I' ,
		'J' ,'K' ,'L' ,'M',
		'N' ,'O'  ,'P' ,
		'R' ,'S' ,'T' ,'U'
		,'W' ,'Y' ,'Z'  };
	ifstream textFile;
	textFile.open("text.txt");
	
	if (textFile.good())
	{
		getline(textFile, text);
		//textFile >> text;
	}
	int textLen = text.length();
	ofstream encycrypted;
	encycrypted.open("zaszyfrowane.txt");
	ofstream plain;
	plain.open("odszyfrowane.txt");
	cin >> shift;

	for (int i = 0; i < textLen; ++i)
	{
		for (int j = 0; j < alphabetLen; ++j)
		{
			if (text[i] == table[j])
			{
				//cout << j << " ";
				//ency
				text[i] = table[(j + shift) <= alphabetLen ? (j + shift) : (j + shift) % alphabetLen];
				//deccy
				//text[i] = table[(j - shift) >= 0 ? (j - shift) : (j - shift) + alphabetLen];
				//cout << text[i] ;

				break;
			}
			if(text[i] == ' ')
			{
				text[i] = ' ';
			}
		}
	}
	encycrypted << text;
	textFile.close();
	encycrypted.close();

	for (int i = 0; i < textLen; ++i)
	{
		for (int j = 0; j < alphabetLen; ++j)
		{
			if (text[i] == table[j])
			{
				//deccy
				int foo =  (j - shift) % alphabetLen;
				//cout << foo;
				text[i] = table[(j - shift) >= 0 ? (j - shift) : alphabetLen + foo ];
				//cout << text[i];

				break;
			}
			if (text[i] == ' ')
			{
				text[i] = ' ';
			}
		}
	}
	plain << text;
	plain.close();
	cout << endl;
	system("pause");

    return 0;
}
