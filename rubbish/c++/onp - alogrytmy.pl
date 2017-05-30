#include <iostream>
#include <string>
using namespace std;
 
int main()
{
char stos[20];
int wierzcholek_stosu = 0;
string wyrazenie;
cout << "Podaj wyrazenie: ";
getline(cin, wyrazenie);
int dlugosc = wyrazenie.length();
for (int i = 0; i < dlugosc; i++)
{
switch (wyrazenie[i])
{
case '(':
stos[wierzcholek_stosu] = wyrazenie[i];
wierzcholek_stosu++;
break;
case ')':
for ( ; stos[wierzcholek_stosu-1] != '('; wierzcholek_stosu--)
cout << " " << stos[wierzcholek_stosu-1];
break;
case '+':
case '-':
while (wierzcholek_stosu > 0 && stos[wierzcholek_stosu-1] != '(')
{
cout << stos[wierzcholek_stosu-1] << " ";
wierzcholek_stosu--;
}
stos[wierzcholek_stosu] = wyrazenie[i];
wierzcholek_stosu++;
break;
case '*':
case '/':
case '%':
while (wierzcholek_stosu > 0 && (stos[wierzcholek_stosu-1] == '*' || stos[wierzcholek_stosu-1] == '/' || stos[wierzcholek_stosu-1] == '%'))
{
cout << stos[wierzcholek_stosu-1] << " ";
wierzcholek_stosu--;
}
stos[wierzcholek_stosu] = wyrazenie[i];
wierzcholek_stosu++;
break;
default:
cout << wyrazenie[i];
break;
}
}
wierzcholek_stosu--;
while (wierzcholek_stosu > 0)
{
wierzcholek_stosu--;
cout << " " << stos[wierzcholek_stosu];
}
cout << endl;
return 0;
}
