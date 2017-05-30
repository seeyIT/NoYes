#include "stdafx.h"
#include "RPN.h"
#include <string>
#include <iostream>

using namespace std ;

class RPN
{
	string *_expressionSplited;
	string _expression;
	string _finalResult = "";
	string _buffor;
	int _expressionLength;
	int _expressionIterator = 0;
	int _stackPeak = 0;
	string _stack[300];

	RPN::RPN(string exp)
	{
		_expressionSplited = new string[];
		_expression = exp;
	}

	void SetExpression()
	{
		_expressionLength = _expression.length;
		for (int i = 0; i < _expressionLength; ++i)
		{
			string oneChar(1, _expression[i]);

			if (IsSign(oneChar))
			{
				_buffor.append(oneChar);
			}
			else
			{
				if (_buffor.compare("") != 0)
				{
					_expressionSplited[_expressionIterator] = _buffor;
					_buffor = "";
					++_expressionIterator;
				}
				_expressionSplited[_expressionIterator] = oneChar;
				++_expressionIterator;

			}
		}

	}
	void MakeRPN()
	{
		for (int i = 0; i < _expressionIterator; ++i)
		{
			if (_expressionSplited[i] == "+" || _expressionSplited[i] == "-")
			{
				for (int j = _stackPeak - 1; j >= 0; --j)
				{
					if (_stack[j] == "(")
					{
						break;
					}

					_finalResult += _stack[j] /*<< endl*/;
					--_stackPeak;
				}

				_stack[_stackPeak] = _expressionSplited[i];
				++_stackPeak;
			}
			else if (_expressionSplited[i] == "*" || _expressionSplited[i] == "/" || _expressionSplited[i] == "%")
			{
				for (int j = _stackPeak - 1; j >= 0; --j)
				{
					if (_stack[j] == "*" || _stack[j] == "/" || _stack[j] == "%")
					{
						_finalResult += _stack[j] /*<< endl*/;
						--_stackPeak;
					}
					else if (_stack[j] == "(")
					{
						break;
					}
				}

				_stack[_stackPeak] = _expressionSplited[i];
				++_stackPeak;
			}
			else if (_expressionSplited[i] == "(")
			{
				_stack[_stackPeak] = _expressionSplited[i];
				++_stackPeak;
			}
			else if (_expressionSplited[i] == ")")
			{
				while (_stack[_stackPeak - 1] != "(")
				{
					--_stackPeak;
					_finalResult += _stack[_stackPeak] /*<< endl*/;

				}
				--_stackPeak;
			}
			else
			{
				cout << _expressionSplited[i]/*<<endl*/;
			}
		}

		while (_stackPeak > 0)
		{
			--_stackPeak;
			_finalResult += _stack[_stackPeak]/*<<endl*/;

		}

	}

	string GetRPN()
	{
		return _finalResult;
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
};