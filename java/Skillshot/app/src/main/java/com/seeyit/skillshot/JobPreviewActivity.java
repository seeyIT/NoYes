package com.seeyit.skillshot;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.text.Spanned;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;
import android.widget.TextView;
import android.widget.Toast;

public class JobPreviewActivity extends AppCompatActivity {

    private Context _context;
    private Job _job;
    private TextView _contentWebView;
    private TextView _titleTextView;
    private TextView _companyTextView;
    private TextView _placeTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_job_preview);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        init();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    private void init() {
        _context = this;
        _job = MainActivity._jobToPreview;
        _contentWebView = (TextView) findViewById(R.id.contentWebView);
        _titleTextView = (TextView) findViewById(R.id.jobDetailsTitle);
        _companyTextView = (TextView) findViewById(R.id.jobDetailsCompany);
        _placeTextView = (TextView) findViewById(R.id.jobDetailsPlace);
        _titleTextView.setText(_job.getTitle());
//        String test = "dla" + _job.getCompany() + "(" + _job.getPlace() + ")";
        _companyTextView.setText(_job.getCompany());
        _placeTextView.setText("(" + _job.getPlace() + ")");
        String tekst = "&lt;p&gt;Chcesz spróbować czegoś nowego i zacząć nowy rozdział w swoim życiu ?&lt;br&gt;\n" +
                "WAŻNE : Nie szukamy zawodowych programistów!!!&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;JEŻELI:&lt;/p&gt;\n" +
                "\n" +
                "&lt;ul&gt;\n" +
                "&lt;li&gt;Uwielbiasz gry komputerowe, mobilne i konsole?&lt;/li&gt;\n" +
                "&lt;li&gt;Kochasz programowanie (lub myślisz że tak jest)?&lt;/li&gt;\n" +
                "&lt;li&gt;Nie boisz się wyzwań i nietypowych problemów?&lt;/li&gt;\n" +
                "&lt;li&gt;Potrafisz się ciężko uczyć i masz zapał do poznawania nowych technologii?&lt;/li&gt;\n" +
                "&lt;li&gt;Masz wystarczająco przeorany beret, żeby zacząć coś nowego?&lt;/li&gt;\n" +
                "&lt;li&gt;Jesteś tak słaby życiowo że nawet w Biedronce nie ma dla Ciebie roboty :)&lt;/li&gt;\n" +
                "&lt;li&gt;Chcesz być częścią zespołów, które stworzą gry i będą w nie grały miliony osób na świecie?&lt;/li&gt;\n" +
                "&lt;li&gt;Chcesz poznać różne narzędzia np. Unity 3D, Unreal 4, Android Studio (w tym C# , Java ub inny język obiektowy)?&lt;/li&gt;\n" +
                "&lt;li&gt;Chcesz, aby Twoja kariera i Twój rozwój zależał od wyników Twojej pracy, a nie od widzimisię szefa?&lt;/li&gt;\n" +
                "&lt;li&gt;Nie lubisz korporacyjnych ograniczeń, sztywnych godzin pracy, godzinnych dojazdów do biura, garniturów, itp.?&lt;/li&gt;\n" +
                "&lt;/ul&gt;\n" +
                "\n" +
                "&lt;p&gt;... nasza oferta jest właśnie dla Ciebie!&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;NAUKA:&lt;br&gt;\n" +
                "Nauczymy Cię od ZERA: Unity v5, Unreala, Blendera, Android Studio i innych technologii.&lt;br&gt;\n" +
                "Ty wybierasz co Ci najbardziej pasuje :)&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;WYMAGAMY:&lt;/p&gt;\n" +
                "\n" +
                "&lt;ul&gt;\n" +
                "&lt;li&gt;laptopa z zainstalowanym Unity i Visual Studio &lt;/li&gt;\n" +
                "&lt;li&gt;zapału do nauki&lt;/li&gt;\n" +
                "&lt;li&gt;otwartej głowy i pasji rozwijania samego siebie&lt;/li&gt;\n" +
                "&lt;/ul&gt;\n" +
                "\n" +
                "&lt;p&gt;WYKSZTAŁCENIE:&lt;br&gt;\n" +
                "Twoje wykształcenie oraz nabyte kwalifikacje nas nie interesują (nie wysyłajcie CV ) !&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;START:&lt;br&gt;\n" +
                "Zaczynamy 2 październik (2.10) godz. 8.00.&lt;br&gt;\n" +
                "Nauka poniedziałek - piątek od 8- ... ile kto da radę :) ( w praktyce 12-13 bez przerw na fajka :)&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;LOKALIZACJA:&lt;br&gt;\n" +
                "Żoliborz - okolice Placu Wilsona ul. Kossaka 11.&lt;br&gt;\n" +
                "Dojazd metrem, autobusem, tramwajem i czym tam chcecie. &lt;br&gt;\n" +
                "Od Metra Plac Wilsona 5 min pieszo.&lt;br&gt;\n" +
                "( zdalnie nie szkolimy - zdalnie gramy w CS :)&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;PRZEBIEG SZKOLENIA:&lt;br&gt;\n" +
                "Szkolenie teoretyczne trwa 3 tygodnie.&lt;br&gt;\n" +
                "Później następuje właściwy etap szkolenia - PRAKTYKA w naszych ( lub przy naszych ) zespołach developerskich. &lt;br&gt;\n" +
                "Czas szkolenia praktycznego zależy od stopnia skomplikowania projektu i waha się od 6 do 8 miesięcy.&lt;br&gt;\n" +
                "Nauczymy Cię najnowszych zasad programowania, w przeciągu następnych osiągniesz więcej niż Twoi koledzy/koleżanki w kilka lat i poznasz zawód o jakim inni mogą tylko pomarzyć.&lt;br&gt;\n" +
                "Szkolenie jest BEZPŁATNE!!!&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;GWARANTUJEMY:&lt;/p&gt;\n" +
                "\n" +
                "&lt;ul&gt;\n" +
                "&lt;li&gt;ciężką harówkę &lt;/li&gt;\n" +
                "&lt;li&gt;ból głowy i bezsenność&lt;/li&gt;\n" +
                "&lt;li&gt;tony wiedzy praktycznej i teoretycznej&lt;/li&gt;\n" +
                "&lt;li&gt;litry potu &lt;/li&gt;\n" +
                "&lt;li&gt;turbo satysfakcję jak coś się uda :) &lt;/li&gt;\n" +
                "&lt;/ul&gt;\n" +
                "\n" +
                "&lt;p&gt;Jeżeli wytrwasz otrzymasz PRACĘ w jednym z naszych młodych i pełnych zapału zespołów i zostaniesz udziałowcem dev4play.&lt;br&gt;\n" +
                "Dajemy know how i wiedzę. Szukamy najlepszych, w których będziemy inwestować i którzy staną się członkami naszych zespołów.&lt;br&gt;\n" +
                "Uczymy za DARMO tego za co inni biorą góry pieniędzy:)&lt;br&gt;\n" +
                "Wszystko w Twoich rękach.&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;BARDZO WAŻNE:&lt;br&gt;\n" +
                "... jeżeli nie spełniasz jakiego kolwiek z poniższych punktów - ODPUŚĆ, szkoda Twojego czasu&lt;/p&gt;\n" +
                "\n" +
                "&lt;ul&gt;\n" +
                "&lt;li&gt;musisz mieć zabezpieczenie FINANSOWE na 6 miesięcy PRAKTYCZNEJ NAUKI !&lt;/li&gt;\n" +
                "&lt;li&gt;nie lubisz się uczyć a komputer traktujesz jako źródło rozrywki&lt;/li&gt;\n" +
                "&lt;li&gt;chcesz przyjść na szkolenie bo słyszałeś że to łatwa robota za duże pieniądze&lt;/li&gt;\n" +
                "&lt;/ul&gt;\n" +
                "\n" +
                "&lt;p&gt;W ciągu roku wyszkoliliśmy już kilkadziesiąt osób, pracujemy nad kilkunastoma projektami gier na PC/mobile/VR... a chcemy więcej i więcej.&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;Ilość miejsc ograniczona - maksymalnie 8 osób na jedno szkolenie.&lt;br&gt;\n" +
                "Szkolenia są cykliczne. Jeżeli nie załapiesz się teraz - masz szanse w pierwszej kolejności dostać się na następne szkolenie.&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;Dołącz do nas, programowanie jest naprawdę sexi :)&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;&lt;a href=\"http://www.dev4play.com\"&gt;www.dev4play.com&lt;/a&gt;&lt;/p&gt;\n" +
                "\n" +
                "&lt;p&gt;Masz pytania dzwoń&lt;br&gt;\n" +
                "Piotrek 604-843-892&lt;/p&gt;";
        tekst.replace("\n", "");
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
//            _contentWebView.setText(Html.fromHtml(tekst, Html.FROM_HTML_MODE_COMPACT));
//        }
//        else
//        {
//            Log.e("a","aa");
//        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            Spanned result;
            result = Html.fromHtml(tekst, Html.FROM_HTML_MODE_LEGACY);
            Spanned spanned = Html.fromHtml(result.toString(), Html.FROM_HTML_MODE_LEGACY);
            _contentWebView.setText(spanned);
        } else {
            Spanned result;
            result = Html.fromHtml(tekst);
            Spanned spanned = Html.fromHtml(result.toString());
            _contentWebView.setText(spanned);
        }
//        _contentWebView.loadDataWithBaseURL(null, tekst, "text/html", "utf-8", "about:blank");
//        _contentWebView.loadData(tekst, "text/html", "UTF-8");
    }

    public void applyForJob(View view) {
        startActivity(new Intent(_context, ApplyForJobActivity.class));
    }

}
