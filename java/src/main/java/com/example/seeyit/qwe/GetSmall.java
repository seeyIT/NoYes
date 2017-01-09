package com.example.seeyit.qwe;

import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.util.Log;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by seeyIT on 2016-12-14.
 */
public class GetSmall extends AsyncTask<String, Void, String> {

    private ProgressDialog _dialog;
    private Context _context;
    private JSONArray allImagesJson = null; //obiekt JSONArray
//    public static List<Drawable> finalImages = new ArrayList<Drawable>();
    public GetSmall(Context context)
    {
        _context =  context;
    }



    @Override
    protected String doInBackground(String... params) {
        HttpPost httpPost = new HttpPost("http://seeyit.ugu.pl/JAVA/getSmall.php");
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpResponse httpResponse = null;
        try {
            httpResponse = httpClient.execute(httpPost);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String jsonString = null;
        try {
            jsonString = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
            Log.e("pliki",jsonString+"");
        } catch (IOException e) {
            e.printStackTrace();
        }
//jesli jsonString nie jest pusty wtedy parsuje go na obiekt JSON
        JSONObject jsonObj = null;
        try {
            Log.e("json",jsonString.getClass().getName()+"");
            jsonObj = new JSONObject(jsonString);
            Log.e("bylobyfajnie",jsonObj+"");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        jsonString = jsonString.substring(1,jsonString.length()-1);
        String[] a = jsonString.split(",");
        for(int i =0;i<a.length;++i)
        {
            String foo = a[i];
            foo = foo.substring(1,foo.length()-1);
            MainActivity.images.add(foo);
            Log.e("cs"+i,MainActivity.images.get(i));
          Drawable loadedImage;
            loadedImage = LoadImageFromWeb("http://seeyit.ugu.pl/JAVA/m/"+MainActivity.images.get(i));

            MainActivity.finalImages.add(loadedImage);
//            NETActivity.finalImages.add(loadedImage);

        }
        Log.e("ile obrazkow", MainActivity.finalImages.size() + "");

        return null;
    }
    public Drawable LoadImageFromWeb(String url) {

        InputStream inputStream = null;
        try {
            inputStream = (InputStream) new URL(url).getContent();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Drawable.createFromStream(inputStream, url);

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
        MainActivity.mainImage.setBackground(MainActivity.finalImages.get(0));
        MainActivity.textView.setText(MainActivity.images.get(0).substring(0, MainActivity.images.get(0).length() - 4));
        _dialog.dismiss();

    }
}
