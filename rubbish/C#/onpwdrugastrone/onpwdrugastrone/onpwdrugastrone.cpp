// onpwdrugastrone.cpp : Defines the entry point for the console application.
//

//#include "stdafx.h"
#include <iostream>
#include <string>

using namespace std;
bool IsSign(string sign);

int main()
{
	string expression;
	string buffor;
	string stack[300];
	string tab[300];
	int stackPeak = 0;
	int loops;
	int value;
	int tabIterator;
	cin >> loops;

	for (int q = 0; q < loops; ++q)
	{
		expression = "";
		value = 0;
		buffor = "";
		tabIterator = 0;
		stackPeak = 0;

		cin >> value;
		getline(cin, expression);
		expression = expression.substr(1, expression.length() - 1);
		//int value = atoi(expression.substr(0).c_str()); // string to int
		
		for (int i = 0; i<value; ++i)
		{
			string oneChar(1, expression[i]);
			if (oneChar == " ")
			{
				tab[tabIterator] = buffor;
				buffor = "";
				++tabIterator;
			}
			else if (IsSign(oneChar))
			{
				buffor.append(oneChar);
			}
			else
			{
				if (buffor.compare("") != 0)
				{
					tab[tabIterator] = buffor;
					buffor = "";
					++tabIterator;
				}
				tab[tabIterator] = oneChar;
				++tabIterator;
			}
		}
		if (buffor != "")
		{
			tab[tabIterator] = buffor;
			buffor = "";
			++tabIterator;
		}
		
		for (int i = 0; i <tabIterator; ++i)
		{
			if (tab[i] == "+" || tab[i] == "-")
			{
				stack[stackPeak - 2] = '(' + stack[stackPeak - 2] + tab[i] + stack[stackPeak - 1] + ')';
				--stackPeak;
			}
			else if (tab[i] == "*" || tab[i] == "/" || tab[i] == "%")
			{
				stack[stackPeak - 2] = '(' + stack[stackPeak - 2] + tab[i] + stack[stackPeak - 1] + ')';
				--stackPeak;
			}
			else
			{
				stack[stackPeak] = tab[i];
				++stackPeak;
			}
		}
		stack[0] = stack[0].substr(1, stack[0].length() - 2);
		cout << stack[0];
		
		cout << endl;
	}

	system("pause");
	return 0;
}


bool IsSign(string sign)
{
	if (sign.compare("+") == 0 ||
		sign.compare("-") == 0 ||
		sign.compare("*") == 0 ||
		sign.compare("/") == 0 ||
		sign.compare("%") == 0 ||
		sign.compare("(") == 0 ||
		sign.compare(")") == 0 )
	{
		return false;
	}
	else
	{
		return true; // number or letter
	}
}
