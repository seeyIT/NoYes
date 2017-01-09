package com.example.seeyit.qwe;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ExpandableListActivity;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.Point;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TableLayout;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CollageActivity extends AppCompatActivity {

    private FrameLayout _frameLayout;
    private FrameLayout _menuFrameLayout;
    private ImageView _firstOption;
    private ImageView _secondOption;
    private ImageView _thirdOption;
    private ImageView _rotateButton;
    private ImageView _reflectButton;
    private ImageView _saveCollage;
    private ImageView _selectedImageView;
    private float _width;
    private float _height;
    private List<ImageView> _imagesList = new ArrayList<ImageView>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collage);
        getSupportActionBar().hide();
        _frameLayout = (FrameLayout)findViewById(R.id.collageFrameLayout);
        _menuFrameLayout = (FrameLayout)findViewById(R.id.collageMenuBar);
        Display display = ((Activity)this).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        _width = size.x;
        _height = size.y;

        Bundle bundle = getIntent().getExtras();
        int id = Integer.parseInt(bundle.getString("id").toString());
        initMode(id);

        addListeners();
    }

    private void addListeners()
    {
        _rotateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                rotatePicture();
                Log.e("a", "rotate");
            }
        });
        _reflectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                reflectPicture();
                Log.e("a", "ref");

            }
        });
        _saveCollage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveCollage();
                Log.e("a", "save");

            }
        });

        for(int i = 0; i<_imagesList.size();++i)
        {

            final View child = _imagesList.get(i);
            child.setBackgroundColor(0x0F000F00);

            child.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    _selectedImageView = (ImageView) child;
                    Log.e("nie long ",child.getId()+"");
                }
            });
            child.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {
                    _selectedImageView = (ImageView) child;
                    AlertDialog.Builder alert = new AlertDialog.Builder(CollageActivity.this);
                    alert.setTitle("Uwaga!");
                    String[] opcje = {"Gallery","Aparat","Super Hiper w kosmos aparat :)"};
                    alert.setItems(opcje, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            if(which == 0)
                            {
                                Log.e("which",0+"");
                                Intent intent = new Intent(Intent.ACTION_PICK);
                                intent.setType("image/*");
                                startActivityForResult(intent, 100);
                            }
                            else if(which == 1)
                            {
                                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                                //jesli jest dostepna zewnetrzny aparat
                                if (intent.resolveActivity(getPackageManager()) != null) {
                                    startActivityForResult(intent, 200); // 200 - jw
                                }
                                Log.e("which",1+"");
                            }
                            else if(which == 2)
                            {
                                Intent intent = new Intent(CollageActivity.this,CameraActivity.class);
                                startActivityForResult(intent,300);
                                Log.e("which",2+"");
                            }
                        }
                    });
//
                    alert.show();
                    return false;
                }
            });
        }
    }
    private void rotatePicture()
    {
        if(_selectedImageView == null)
        {
            return;
        }
        Matrix matrix = new Matrix();
        matrix.postRotate(90);
        Bitmap oryginal = ((BitmapDrawable) _selectedImageView.getDrawable()).getBitmap();
        Bitmap rotated = Bitmap.createBitmap(oryginal, 0, 0, oryginal.getWidth(), oryginal.getHeight(), matrix, true);
        _selectedImageView.setImageBitmap(rotated);
    }
    private void reflectPicture()
    {
        if(_selectedImageView == null)
        {
            return;
        }
        Matrix matrix = new Matrix();
        matrix.postRotate(180);

        Bitmap oryginal = ((BitmapDrawable) _selectedImageView.getDrawable()).getBitmap();
        Bitmap rotated = Bitmap.createBitmap(oryginal, 0, 0, oryginal.getWidth(), oryginal.getHeight(), matrix, true);
        _selectedImageView.setImageBitmap(rotated);
    }
    private void saveCollage()
    {
        try
        {
            _frameLayout.setDrawingCacheEnabled(true);

            Bitmap b = _frameLayout.getDrawingCache(true);
            SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
            String d = dFormat.format(new Date());
            FileOutputStream fs = new FileOutputStream("/storage/emulated/0/Pictures/KornelMiszczak/kolaż/superZdjecie"+d+".png");

            Matrix matrix = new Matrix();
            // setup rotation degree

            Bitmap bmp = Bitmap.createBitmap(b, 0, 0, b.getWidth(), b.getHeight(), matrix, true);
            bmp.compress(Bitmap.CompressFormat.JPEG, 10, fs);
            fs.close();
        }
        catch(Exception exp)
        {
            Log.e("Save Error",exp.getMessage());
        }

    }
    private void initMode(int mode)
    {

        if(mode == 1)
        {
            ImageView _one = new ImageView(CollageActivity.this);
            _one.setImageResource(R.drawable.left);
            _one.setScaleType(ImageView.ScaleType.MATRIX);
            _one.setX(0);
            _one.setY(0);
            _frameLayout.addView(_one);
            _one.getLayoutParams().width = (int)_width/2;
            _one.getLayoutParams().height = (int)_height - 270;
            _one.requestLayout();
            _imagesList.add(_one);

            ImageView _two = new ImageView(CollageActivity.this);
            _two.setScaleType(ImageView.ScaleType.MATRIX);
            _two.setX(_width / 2);
            _two.setY(0);
            _two.setImageResource(R.drawable.right);
            _frameLayout.addView(_two);
            _two.getLayoutParams().width = (int)_width/2;
            _two.getLayoutParams().height = (int)_height - 270;
            _two.requestLayout();
            _imagesList.add(_two);


        }
        else if(mode == 2)
        {
            ImageView _one = new ImageView(CollageActivity.this);
            _one.setScaleType(ImageView.ScaleType.MATRIX);
            _one.setImageResource(R.drawable.left);
            _one.setX(0);
            _one.setY(0);
            _frameLayout.addView(_one);
            _one.getLayoutParams().width = (int)_width;
            _one.getLayoutParams().height = (int)_height/2 - 135;
            _one.requestLayout();
            _imagesList.add(_one);

            ImageView _two = new ImageView(CollageActivity.this);
            _two.setScaleType(ImageView.ScaleType.MATRIX);
            _two.setX(0);
            _two.setY(_height / 2 - 135 + 3);
            //_two.setImageResource(R.drawable.right);
            _frameLayout.addView(_two);
            _two.getLayoutParams().width = (int)_width;
            _two.getLayoutParams().height = (int)_height/2 - 135;
            _two.requestLayout();
            _imagesList.add(_two);

        }
        else if(mode == 3)
        {
            ImageView _one = new ImageView(CollageActivity.this);
            _one.setScaleType(ImageView.ScaleType.CENTER_CROP);
            //_one.setImageResource(R.drawable.left);
            _one.setX(0);
            _one.setY(0);
            _frameLayout.addView(_one);
            _one.getLayoutParams().width = (int)_width*2/3;
            _one.getLayoutParams().height = (int)_height +6 - 270;
            _one.requestLayout();
            _imagesList.add(_one);

            ImageView _two = new ImageView(CollageActivity.this);
            _two.setScaleType(ImageView.ScaleType.CENTER_CROP);
            _two.setX(_width / 3 * 2 + 3);
            _two.setY(0);
            //_two.setImageResource(R.drawable.right);
            _frameLayout.addView(_two);
            _two.getLayoutParams().width = (int)_width/3;
            _two.getLayoutParams().height = (int)_height/3-90;
            _two.requestLayout();
            _imagesList.add(_two);

            ImageView _third = new ImageView(CollageActivity.this);
            _third.setScaleType(ImageView.ScaleType.CENTER_CROP);
            _third.setX(_width / 3 * 2 + 3);
            _third.setY(_height / 3 + 3 - 90);
            //_third.setImageResource(R.drawable.right);
            _frameLayout.addView(_third);
            _third.getLayoutParams().width = (int)_width/3;
            _third.getLayoutParams().height = (int)_height/3-90;
            _third.requestLayout();
            _imagesList.add(_third);

            ImageView _fourth = new ImageView(CollageActivity.this);
            _fourth.setScaleType(ImageView.ScaleType.CENTER_CROP);
            _fourth.setX(_width / 3 * 2 + 3);
            _fourth.setY(_height / 3 * 2 + 6 - 180);
            //_fourth.setImageResource(R.drawable.right);
            _frameLayout.addView(_fourth);
            _fourth.getLayoutParams().width = (int)_width/3;
            _fourth.getLayoutParams().height = (int)_height/3-90;
            _fourth.requestLayout();
            _imagesList.add(_fourth);
        }

        _reflectButton = new ImageView(CollageActivity.this);
        _reflectButton.setX(0);
        _reflectButton.setY(_height - 200);
        _reflectButton.setImageResource(R.drawable.left);
        _menuFrameLayout.addView(_reflectButton);
        _reflectButton.getLayoutParams().height = 90;
        _reflectButton.getLayoutParams().width = (int)(_width / 3);
        _reflectButton.requestLayout();

        _rotateButton = new ImageView(CollageActivity.this);
        _rotateButton.setX(_width / 3);
        _rotateButton.setY(_height - 200);
        _rotateButton.setImageResource(R.drawable.albumy);
        _menuFrameLayout.addView(_rotateButton);
        _rotateButton.getLayoutParams().height = 90;
        _rotateButton.getLayoutParams().width = (int)(_width / 3);
        _rotateButton.requestLayout();

        _saveCollage = new ImageView(CollageActivity.this);
        _saveCollage.setX(_width * 2 / 3);
        _saveCollage.setY(_height - 200);
        _saveCollage.setImageResource(R.drawable.right);
        _menuFrameLayout.addView(_saveCollage);
        _saveCollage.getLayoutParams().height = 90;
        _saveCollage.getLayoutParams().width = (int)(_width / 3);
        _saveCollage.requestLayout();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 100)
        {
            try
            {
                Uri imgData = data.getData();
                InputStream stream = null;
                stream = getContentResolver().openInputStream(imgData);
                Bitmap b = BitmapFactory.decodeStream(stream);
                _selectedImageView.setImageBitmap(b);

            }
            catch (FileNotFoundException e)
            {
                e.printStackTrace();
            }
        }
        else if(requestCode == 200)
        {
            try
            {
                Bundle extras = data.getExtras();
                Bitmap b = (Bitmap) extras.get("data");
                _selectedImageView.setImageBitmap(b);
            }
            catch (Exception exp)
            {

            }
        }
        else if(requestCode == 300)
        {
            try
            {
                Bundle extras = data.getExtras();
                byte[] xdata = (byte[]) extras.get("fotodata");
                Bitmap bitmap= BitmapFactory.decodeByteArray(xdata, 0, xdata.length);
                _selectedImageView.setImageBitmap(bitmap);
            }
            catch (Exception exp)
            {
                Log.e("exp",exp.getMessage());
            }
        }
    }
}
