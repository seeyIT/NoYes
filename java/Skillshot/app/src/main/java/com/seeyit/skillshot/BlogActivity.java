package com.seeyit.skillshot;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.text.Spanned;
import android.view.View;
import android.webkit.WebView;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class BlogActivity extends AppCompatActivity {

    private Context _context;
    private ArrayAdapter<String> _drawerAdaper;
    private ListView _drawerListView;
    private TextView _blogTextView;
    private DrawerLayout _drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_blog);
        getSupportActionBar().setTitle("Skillshot - Blog");
        init();
    }

    private void init() {
        _context = this;

        _drawerLayout = (DrawerLayout) findViewById(R.id.drawerLayout);
        _drawerListView = (ListView) findViewById(R.id.drawerListView);
        _blogTextView = (TextView) findViewById(R.id.blogTextView);
        _drawerAdaper = new DrawerAdapter(this, android.R.layout.simple_spinner_item, getResources().getStringArray(R.array.drawer_options), 1);
        _drawerListView.setAdapter(_drawerAdaper);

        _drawerListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                _drawerLayout.closeDrawers();
                finish();

                if (position == 0) {
                    startActivity(new Intent(_context, MainActivity.class));
                } else if (position == 2) {
                    startActivity(new Intent(_context, ContactActivity.class));

                } else if (position == 3) {
                    startActivity(new Intent(_context, LoginActivity.class));

                }

            }
        });

        String tempString = "&lt;p&gt;Dodałem dzisiaj dwie nowe rzeczy o które prosiło kilka osób:&lt;/p&gt;\n" +
                "&lt;p&gt;&lt;strong&gt;1. LEPSZE WYSZUKIWANIE&lt;/strong&gt;&lt;/p&gt;\n" +
                "&lt;p&gt;Kiedyś było lepiej, potem przenosiłem serwer na nową bazę danych (Postgres) i przy tej okazji trochę się popsuło. Teraz wróciłem do tematu i zrobiłem nawet lepiej niż było dawniej :) Teraz Skillshot szuka wpisanych słów w polach tytułu, firmy i miasta. Każde ze słów musi być znalezione, ale nie ma znaczenia, w którym polu wystąpi. &amp;quot;programista warszawa&amp;quot; zadziała. Co więcej teraz można już szukać tekstu tylko w obrębie wybranej kategorii. I żeby to było jasne, dodałem jeszcze info o filtrowaniu wyników. Można robić szaleństwa w stylu &amp;quot;szukam roboty przy programowaniu, dla seniora w wawie&amp;quot;:&lt;/p&gt;\n" +
                "&lt;p&gt;&lt;img src='http://www.orchidgames.com/media/skillshot/2017-04-26-skillshot_search.png' alt='' /&gt;&lt;/p&gt;\n" +
                "&lt;p&gt;&lt;strong&gt;2. DODATKOWE INFO O AUTORZE ZGŁOSZENIA&lt;/strong&gt;&lt;/p&gt;\n" +
                "&lt;p&gt;Tak jak pisałem poprzednio, musiałem trochę &lt;a href='http://www.skillshot.pl/blog/2-zmiany-w-wysylaniu-emaili'&gt;pozmieniać w sposobie wysyłania emaili&lt;/a&gt;. Teraz wszystko przychodzi ze Skillshota a adres nadawcy był w polu Reply-To. Ale po pierwsze nie dla każdego było to jasne (nie dziwię się) a po drugie jak ktoś zrobił forward/prześlij dalej, to info o nadawcy ginęło już na dobre.&lt;/p&gt;\n" +
                "&lt;p&gt;Teraz w stopce emaila znajdziecie dodatkową linijkę z info o nawisku i adresie email jaki osoba zgłaszająca wpisała w formularzu.&lt;/p&gt;\n" +
                "&lt;p&gt;&lt;img src='http://www.orchidgames.com/media/skillshot/2017-04-26-skillshot_sender_email.png' alt='' /&gt;&lt;/p&gt;";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            Spanned result;
            result = Html.fromHtml(tempString, Html.FROM_HTML_MODE_LEGACY);
            Spanned a = Html.fromHtml(result.toString(), Html.FROM_HTML_MODE_LEGACY);
            _blogTextView.setText(a);
        } else {
            Spanned result;
            result = Html.fromHtml(tempString);
            Spanned a = Html.fromHtml(result.toString());
            _blogTextView.setText(a);
        }

    }
}
