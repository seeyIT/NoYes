package com.example.seeyit.qwe;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.media.Image;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class NETActivity extends AppCompatActivity {
    private LinearLayout _linearLayout;

    public static List<Drawable> finalImages = new ArrayList<Drawable>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_net);

        _linearLayout= (LinearLayout)findViewById(R.id.linearNet);

        showImages();
    }
    private void showImages()
    {
        Log.e("tal", MainActivity.images.size()+"");
        for(int i =0;i<MainActivity.finalImages.size();++i)
        {
            ImageView imageView = new ImageView(NETActivity.this);
            imageView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT, 1f));

            imageView.setBackground(MainActivity.finalImages.get(i));
//            imageView.setBackgroundColor(Color.RED);
            _linearLayout.addView(imageView);

            Bitmap b = ((BitmapDrawable)imageView.getBackground()).getBitmap();
            Log.e("with",b.getByteCount()/1024+"");


            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            b.compress(Bitmap.CompressFormat.PNG, 100, stream);
            byte[] byteArray = stream.toByteArray();



            final int finalI = i;
            imageView.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {
                    Intent intent = new Intent(
                            Intent.ACTION_VIEW,
                            Uri.parse("http://seeyit.ugu.pl/JAVA/d/"+MainActivity.images.get(finalI)));
                    startActivity(intent);
//                    Log.e("a",MainActivity.images.get(finalI));

                    return false;
                }
            });
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_net, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
