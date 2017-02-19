package com.example.seeyit.qwe;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Point;
import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class ColorActivity extends AppCompatActivity {

    private ImageView _colorCircle;
    private ImageView _confirmButtonBorder;
    private ImageView _confirmButtonText;
    private RelativeLayout _preview;
    private float _width;
    private float _height;
    private int _color;
    private int _sourceId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_color);
        getSupportActionBar().hide();
        initInstances();
        calcDisplaySize();
        initPositions();
        initListeners();

        _colorCircle.setDrawingCacheEnabled(true);
        Bundle bundle = getIntent().getExtras();
        _sourceId = bundle.getInt("id");
        Log.e("id",_sourceId+"");
    }
    private void initInstances()
    {
        _colorCircle = (ImageView)findViewById(R.id.colorPickerImage);
        _confirmButtonBorder = (ImageView)findViewById(R.id.colorPickerConfirmBorder);
        _confirmButtonText = (ImageView)findViewById(R.id.colorPickerConfirmText);
        _preview = (RelativeLayout)findViewById(R.id.colorPickerPreview);
    }
    private void initPositions()
    {
        _preview.setX(0);
        _preview.setY(0);
        _preview.getLayoutParams().width = (int)_width;
        _preview.getLayoutParams().height = (int)_height/6;
        _preview.setBackgroundColor(Color.GREEN);

        _colorCircle.setX(0);
        _colorCircle.setY(_height / 5);
        _colorCircle.getLayoutParams().width = (int)_width;
        _colorCircle.getLayoutParams().height = (int)_height/2;

        _confirmButtonBorder.setX(_width*2/3);
        _confirmButtonBorder.setY(_height * 5 / 6);
        _confirmButtonBorder.getLayoutParams().width = (int)_width;
        _confirmButtonBorder.getLayoutParams().height = (int)_height/6;
        _confirmButtonBorder.setBackgroundColor(Color.GREEN);

        _confirmButtonText.setX(_width/3);
        _confirmButtonText.setY(_height*5/6);
        _confirmButtonText.getLayoutParams().width = (int)_width;
        _confirmButtonText.getLayoutParams().height = (int)_height/6;
        _confirmButtonText.setBackgroundColor(Color.BLUE);
    }
    private void initListeners()
    {
        _confirmButtonBorder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ColorActivity.this,FontPickerActivity.class);
                intent.putExtra("color", _color);

                setResult(_sourceId, intent);
                finish();
            }
        });
        _confirmButtonText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ColorActivity.this, FontPickerActivity.class);
                intent.putExtra("color", _color);
                setResult(2, intent);
                finish();
            }
        });
        _colorCircle.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction())
                {
                    case MotionEvent.ACTION_DOWN:
                        Log.e("move","tak");

                    case MotionEvent.ACTION_MOVE:
                        //pobranie Bitmapy z obrazka:
                        Bitmap bmp = v.getDrawingCache();

                        //pobranie koloru piksela z odpowiedniego miejsca bitmapy:
                        _color = bmp.getPixel((int)event.getX(), (int)event.getY());
                        //tu sprawdzaj i ustawiaj na bieżąco podgląd koloru:
                        _preview.setBackgroundColor(_color);
                        break;

                }
                return false;
            }
        });
    }
    private void calcDisplaySize()
    {
        Display display = ((Activity)this).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        _width = size.x;
        _height = size.y;
    }
}
