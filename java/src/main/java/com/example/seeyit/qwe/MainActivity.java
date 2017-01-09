package com.example.seeyit.qwe;

import android.content.Intent;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

import android.os.Environment;
import android.Manifest;
import android.app.Activity;
import 	android.support.v4.app.ActivityCompat;
import android.content.pm.PackageManager;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.CAMERA,
            Manifest.permission.INTERNET,
            Manifest.permission.ACCESS_NETWORK_STATE
    };
    public static List<Drawable> finalImages = new ArrayList<Drawable>();
    public static List<String> images = new ArrayList<String>();

    private LinearLayout kolaz;
    private LinearLayout _galleryLayout;
    private LinearLayout _collageLayout;
    private LinearLayout _networkingLayout;
    private ImageView _leftArrow;
    private ImageView _rightArrow;
    private float _width,_height;


    public static TextView textView;
    public static ImageView mainImage;

    private int iterator =0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        verifyStoragePermissions(MainActivity.this);
        kolaz = (LinearLayout)findViewById(R.id.firstOne);
        _galleryLayout = (LinearLayout)findViewById(R.id.secondOne);
        _collageLayout = (LinearLayout)findViewById(R.id.thirdOne);
        mainImage = (ImageView)findViewById(R.id.mainImage);
        textView = (TextView)findViewById(R.id.textViewMain);
        _networkingLayout = (LinearLayout)findViewById(R.id.forthOne);
//        _leftArrow = (ImageView)findViewById(R.id.rightArrow);
//        _rightArrow = (ImageView)findViewById(R.id.leftArrow);
        kolaz.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
               // Intent intent = new Intent(MainActivity.this,AlbumsActivity.class);
                Intent intent = new Intent(MainActivity.this,PhotoEditActivity.class);
                startActivity(intent);
            }
        });
        _networkingLayout.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(MainActivity.this,NETActivity.class);
                startActivity(intent);
            }
        });
        _galleryLayout.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(MainActivity.this,CameraActivity.class);
                startActivity(intent);
            }
        });
        _collageLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this,ChooseCollageActivity.class);
                startActivity(intent);
            }
        });
        Display display = ((Activity)this).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        _width = size.x;
        _height = size.y;
        setSizes();
        GetSmall getSmall = (GetSmall) new GetSmall(MainActivity.this).execute();
        Log.e("po ","small");

        mainImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                iterator++;
                if(iterator>=finalImages.size())
                {
                    iterator = 0;
                }
                mainImage.setBackground(finalImages.get(iterator));
                textView.setText(images.get(iterator).substring(0, images.get(iterator).length() - 4));
            }
        });
    }

    private void setSizes()
    {
//        _leftArrow.setX(0);
////        _leftArrow.setY(0);
//        _leftArrow.getLayoutParams().width = (int)_width/8;
////        _leftArrow.getLayoutParams().height = (int)_height;
//        mainImage.setX(_width/8);
////        mainImage.setY(0);
//        _leftArrow.getLayoutParams().width = (int)_width/4;
////        _leftArrow.getLayoutParams().height = (int)_height;
//
//        _rightArrow.setX(_width*7/8);
////        _rightArrow.setY(0);
//        _rightArrow.getLayoutParams().width = (int)_width/8;
////        _leftArrow.getLayoutParams().height = (int)_height;


    }
    @Override
    protected void onPause() {
        super.onPause();
        Log.e("MainActivity","pasue");
    }

    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_NETWORK_STATE);
        ActivityCompat.requestPermissions(
                activity,
                PERMISSIONS_STORAGE,
                REQUEST_EXTERNAL_STORAGE
        );
        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
        }
    }
}
