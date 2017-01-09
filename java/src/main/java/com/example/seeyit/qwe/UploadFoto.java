package com.example.seeyit.qwe;

import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.util.Log;

import org.apache.http.*;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;


/**
 * Created by seeyIT on 2016-12-01.
 */
public class UploadFoto extends AsyncTask<String, Void, String> {

    private ProgressDialog _dialog;
    private Context _context;
    public UploadFoto(Context context)
    {
        _context =  context;
    }

    public UploadFoto() {

    }

    @Override
    protected String doInBackground(String... params) {


        Bitmap bitmap = BitmapFactory.decodeResource(_context.getResources(),
                R.drawable.color_wheel_730);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 10, stream);
            byte[] bitmapdata = stream.toByteArray();
            Log.e("co",bitmapdata.toString());
            HttpPost httpPost = new HttpPost("http://seeyit.ugu.pl/JAVA/photo.php"); // URL_SERWERA proponuję zapisać w osobnej klasie np Settings w postaci stałej
        //httpPost.setEntity(new ByteArrayEntity(bitmapdata)); // bytes - nasze zdjęcie przekonwertowane na byte[]
        httpPost.setEntity(new ByteArrayEntity(bitmapdata)); // bytes - nasze zdjęcie przekonwertowane na byte[]
            DefaultHttpClient httpClient = new DefaultHttpClient(); // klient http
            HttpResponse httpResponse = null; // obiekt odpowiedzi z serwera
            try {
                httpResponse = httpClient.execute(httpPost); // wykonanie wysłania
            } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            String result = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8); // odebranie odpowiedzi z serwera, którą potem wyświetlimy w onPostExecute
            Log.e("result", result);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }



    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        _dialog = new ProgressDialog(_context);
        _dialog.setMessage("komunikat");
        _dialog.setCancelable(false); // nie da się zamknąć klikając w ekran
        _dialog.show();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        _dialog.dismiss();

    }

    public void showDialog()
    {
        // kontrolka wyswietlana podczas długotrwałych operacji

    }
}
