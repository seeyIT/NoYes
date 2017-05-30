// onp.cpp : Defines the entry point for the console application.
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
	int loops = 0;
	int value;
	cin >> loops;

	for (int i = 0; i < loops; ++i)
	{
		cin >> value;
		cin >> expression;

		int expressionLen = expression.length();
		buffor = "";
		int tabIterator = 0;

		for (int i = 0; i<expressionLen; i++)
		{
			string oneChar(1, expression[i]);
			if (IsSign(oneChar))
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

		for (int i = 0; i < tabIterator; ++i)
		{
			if (tab[i] == "+" || tab[i] == "-")
			{
				for (int j = stackPeak - 1; j >= 0; --j)
				{
					if (stack[j] == "(")
					{
						break;
					}
					cout << stack[j];
					--stackPeak;
				}
				stack[stackPeak] = tab[i];
				++stackPeak;
			}
			else if (tab[i] == "*" || tab[i] == "/" || tab[i] == "%")
			{
				for (int j = stackPeak - 1; j >= 0; --j)
				{
					if (stack[j] == "*" || stack[j] == "/" || stack[j] == "%")
					{
						cout << stack[j];
						--stackPeak;
					}
					else if (stack[j] == "(")
					{
						break;
					}
				}

				stack[stackPeak] = tab[i];
				++stackPeak;
			}
			else if (tab[i] == "(")
			{
				stack[stackPeak] = tab[i];
				++stackPeak;
			}
			else if (tab[i] == ")")
			{
				while (stack[stackPeak - 1] != "(")
				{
					--stackPeak;
					cout << stack[stackPeak];

				}
				--stackPeak;
			}
			else
			{
				cout << tab[i];
			}
		}

		while (stackPeak > 0)
		{
			--stackPeak;
			cout << stack[stackPeak];
		}
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
		sign.compare(")") == 0)
	{
		return false;
	}
	else
	{
		return true; // number or letter
	}
}
