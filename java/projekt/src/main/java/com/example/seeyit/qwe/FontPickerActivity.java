package com.example.seeyit.qwe;

import android.app.Activity;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import java.io.IOException;

public class FontPickerActivity extends AppCompatActivity  {

    private EditText _editText;
    private RelativeLayout _preview;
    private RelativeLayout _menu;
    private LinearLayout _scrollList;
    private ScrollView _scrollView;
    private ImageView _submitImageView;
    private ImageView _borderImageView;
    private ImageView _textImageView;
    private float _width;
    private float _height;
    private String[] _fontsArray;
    private PreviewTextView _previewTextView;
    private Typeface _typeface;
    private String _fontName;
    private int _borderColor = 0;
    private int _textColor = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_font_picker);
        getSupportActionBar().hide();
        declerateAllObjects(); // nie rozdzielac !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        calcScreenSizes();
        positionLayoutElements();
        fillScrollView();
        makeListeners();

        Typeface _typeface = Typeface.createFromAsset(getAssets(),"fonts/"+_fontsArray[0]);//"+_fontsArray[i]);
        _previewTextView = new PreviewTextView(FontPickerActivity.this,_typeface,"foobar",_borderColor,_textColor);
        _preview.addView(_previewTextView);
        _editText.addTextChangedListener(textWatcher);
    }
    private void declerateAllObjects()
    {
        _editText = (EditText)findViewById(R.id.fontPickerEditText);
        _preview = (RelativeLayout)findViewById(R.id.fontPickerPreview);
        _scrollView = (ScrollView)findViewById(R.id.fontPickerScrollView);
        _scrollList = (LinearLayout)findViewById(R.id.fontPickerScrollList);
        _menu = (RelativeLayout)findViewById(R.id.fontPickerMenu);
        _submitImageView = (ImageView)findViewById(R.id.fontPickerConfirm);
        _borderImageView = (ImageView)findViewById(R.id.fontPickerBorderColor);
        _textImageView = (ImageView)findViewById(R.id.fontPickerTextColor);
    }
   private void makeListeners()
   {
       _submitImageView.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               Intent intent = new Intent(FontPickerActivity.this,PhotoEditActivity.class);
               intent.putExtra("text", _editText.getText().toString());
               intent.putExtra("font", _fontName);
               intent.putExtra("textColor", _textColor);
               intent.putExtra("border", _borderColor);
               setResult(0, intent);
               finish();
           }
       });
       _borderImageView.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               Intent intent = new Intent(FontPickerActivity.this,ColorActivity.class);
               intent.putExtra("id", 1);
              startActivityForResult(intent, 1);
           }
       });
       _textImageView.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               Intent intent = new Intent(FontPickerActivity.this,ColorActivity.class);
               intent.putExtra("id", 2);
               startActivityForResult(intent,2);
           }
       });
   }
    private void refreshPreview()
    {
        _previewTextView = new PreviewTextView(FontPickerActivity.this,_typeface,_editText.getText().toString(),_borderColor,_textColor);
        _preview.removeAllViews();
        _preview.addView (_previewTextView);
    }
    private void fillScrollView()
    {
        AssetManager assetManager = getAssets();
        try {
            _fontsArray = assetManager.list("fonts");
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }
        int fontsLength = _fontsArray.length;

        for(int i = 0 ; i<fontsLength;++i)
        {
            TextView tv = new TextView(FontPickerActivity.this);
            String text = _fontsArray[i].substring(0, _fontsArray[i].indexOf("."));
            tv.setText(text);
            tv.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT, 1f));
            Typeface tf= Typeface.createFromAsset(getAssets(),"fonts/"+_fontsArray[i]);//"+_fontsArray[i]);
            tv.setTypeface(tf);
            _scrollList.addView(tv);
            final int finalI = i;
            tv.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    _typeface = Typeface.createFromAsset(getAssets(),"fonts/"+_fontsArray[finalI]);
                    _fontName = "fonts/"+_fontsArray[finalI];
                    refreshPreview();
                }
            });
        }

    }
    private void calcScreenSizes()
    {
        Display display = ((Activity)this).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        _width = size.x;
        _height = size.y;
    }
    private void positionLayoutElements()
    {
        _preview.setX(0);
        _preview.setY(0);
        _preview.getLayoutParams().width = (int)_width;
        _preview.getLayoutParams().height = (int)_height/6;
        _preview.setBackgroundColor(Color.GREEN);

        _editText.setX(0);
        _editText.setY(_height / 6);
        _editText.getLayoutParams().width = (int)_width;
        _editText.getLayoutParams().height = (int)_height/12;
        _editText.setBackgroundColor(Color.RED);

        _scrollView.setX(0);
        _scrollView.setY(_height * 3 / 12);
        _scrollView.getLayoutParams().width = (int)_width;
        _scrollView.getLayoutParams().height = (int)_height*15/24;
        _scrollView.setBackgroundColor(Color.CYAN);

        _menu.setX(0);
        _menu.setY(_height * 21 / 24);
        _menu.getLayoutParams().width = (int)_width;
        _menu.getLayoutParams().height = (int)_height / 12;
        _menu.setBackgroundColor(Color.RED);

        _borderImageView.setX(_width/4);
//        _borderImageView.setY(_height * 21 / 24);
        _borderImageView.getLayoutParams().width = (int)_width/5;
        _borderImageView.getLayoutParams().height = (int)_height / 12;
//        _borderImageView.setBackgroundColor(Color.RED);

        _textImageView.setX(_width*2/3);
//        _textImageView.setY(_height * 21 / 24);
        _textImageView.getLayoutParams().width = (int)_width/5;
        _textImageView.getLayoutParams().height = (int)_height / 12;
//        _textImageView.setBackgroundColor(Color.RED);
        _submitImageView.setX(_width/2);
//        _textImageView.setY(_height * 21 / 24);
        _submitImageView.getLayoutParams().width = (int)_width/5;
        _submitImageView.getLayoutParams().height = (int)_height / 12;

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 1)
        {
            //border
            Bundle bundle = data.getExtras();
            int color = bundle.getInt("color");
            _borderColor = color;
            Log.e("border",color+"");
        }
        else if(requestCode == 2)
        {
            //text
            Bundle bundle = data.getExtras();
            int color = bundle.getInt("color");
            _textColor = color;
            Log.e("text",color+"");
        }
        refreshPreview();
    }

    TextWatcher textWatcher = new TextWatcher(){

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            refreshPreview();
        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    };

}
