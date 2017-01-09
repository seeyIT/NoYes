package com.example.seeyit.qwe;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Environment;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PhotoEditActivity extends AppCompatActivity {

    public static String pathToTempPhoto;
    private String _savePhotoPath;
    private MyArrayAdapter _myArrayAdapter;
    private List<String> _list = new ArrayList<String>();
    private ListView _listView;
    private RelativeLayout _relativeLayout;
    private DrawerLayout _drawerLayout;
    private ImageView _mainPhoto;
    private float _leftOffset = 0;
    private float _topOffset = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo_edit);

        getSupportActionBar().hide();

        _listView = (ListView)findViewById(R.id.photoEditListView);
        _relativeLayout = (RelativeLayout)findViewById(R.id.photoEditRelativeLayout);
        _drawerLayout = (DrawerLayout)findViewById(R.id.photoEditDraweLayout);
        _mainPhoto = (ImageView)findViewById(R.id.photoEditPhoto);
//        _file  = ;

//        _myCatalog = new File(_file.getPath()+"/KornelMiszczak");
        pathToTempPhoto = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath() + "/KornelMiszczak";
        _list.add("uno");
        _list.add("uno");
        _list.add("uno");
        _myArrayAdapter =  new MyArrayAdapter(
                PhotoEditActivity.this,
                R.layout.photoeditsinglerow,
                _list
        );
        _listView.setAdapter(_myArrayAdapter);

        _listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if(i == 0 )
                {
                    fontPick();
                }
                else if(i == 1)
                {
                    sharingPhoto();
                }
                else if(i == 2)
                {
                    sendToServer();
                }
            }


        });

    }

    private void sendToServer()
    {
        UploadFoto uploadFoto = (UploadFoto) new UploadFoto(PhotoEditActivity.this).execute();
    }
    private void sharingPhoto()
    {
        Log.e("path",pathToTempPhoto);
        if(!Networking.isConnection(PhotoEditActivity.this))
        {

            AlertDialog.Builder alert = new AlertDialog.Builder(PhotoEditActivity.this);
            alert.setCancelable(true);            //nie zamyka sie po kliknieciu poza
            alert.setMessage("no internet connection");
            alert.setNeutralButton("OK", null).show();
            return;
        }
        Intent share = new Intent(Intent.ACTION_SEND);
        share.setType("image/jpeg"); //typ danych który chcemy współdzielić
        SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
        String d = dFormat.format(new Date());
        try
        {
            _savePhotoPath = pathToTempPhoto+"/"+"superZdjecie"+d+".png";
            File myFoto = new File(_savePhotoPath);
            FileOutputStream fs = new FileOutputStream(myFoto);
            Bitmap bitmap = BitmapFactory.decodeResource(PhotoEditActivity.this.getResources(),
            R.drawable.color_wheel_730);
            Matrix matrix = new Matrix();
            matrix.postRotate(90);
            Bitmap bmp = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
            bmp.compress(Bitmap.CompressFormat.JPEG, 10, fs);
            fs.close();
            Log.e("savePhoto", "koniec try");

        }
        catch (Exception exp)
        {
            Log.e("expertion",exp.toString());
            return;
        }
        share.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://"+_savePhotoPath)); //pobierz plik i podziel się nim:
        startActivity(Intent.createChooser(share, "Podziel się plikiem!")); //pokazanie okna share
    }


    private void fontPick()
    {
        Intent intent = new Intent(PhotoEditActivity.this,FontPickerActivity.class);
        startActivityForResult(intent,0);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

       if(requestCode == 0 ) // font callback
       {
           _drawerLayout.closeDrawer(GravityCompat.START);
           Bundle extras = data.getExtras();
           String text =  extras.get("text").toString();
           String font =  extras.get("font").toString();
           int border = extras.getInt("border");
           int textColor = extras.getInt("textColor");
           Typeface tf= Typeface.createFromAsset(getAssets(), font);//"+_fontsArray[i]);
           final PreviewTextView previewTextView = new PreviewTextView(this,tf,text,border,textColor);
           _relativeLayout.addView(previewTextView);
           Rect bounds = new Rect();
           previewTextView.getPaint().getTextBounds(previewTextView.getText().toString(), 0, previewTextView.getText().length(), bounds);
           previewTextView.setWidth(bounds.width());
           previewTextView.setHeight(bounds.height());
           int foo1 =  bounds.width();
           int foo2 =  bounds.height();
           //previewTextView.getLayoutParams().width =200;
           previewTextView.getLayoutParams().height = 210;
           previewTextView.setOnTouchListener(new View.OnTouchListener() {
               @Override
               public boolean onTouch(View v, MotionEvent event) {
                   switch (event.getAction()) {

                       case MotionEvent.ACTION_MOVE:
                           previewTextView.setX(event.getRawX() - _leftOffset);
                           previewTextView.setY(event.getRawY() - _topOffset);
                           break;
                       case MotionEvent.ACTION_DOWN:
                           _leftOffset = event.getRawX() - previewTextView.getX();
                           _topOffset = event.getRawY() - previewTextView.getY();
                           Log.e("click", event.getRawX() + "");
                           Log.e("click", event.getX() + "");
                           previewTextView.setRectFlag(true);
                           previewTextView.invalidate();

                           break;
                       case MotionEvent.ACTION_UP:
                           previewTextView.setRectFlag(false);
                           previewTextView.invalidate();

                           break;
                       default:
                           break;
                   }
//                   Rect bounds = new Rect();
//                   TextView tv = new TextView(PhotoEditActivity.this);
//                   previewTextView.getPaint().getTextBounds(previewTextView.getText().toString(), 0, previewTextView.getText().length(), bounds);
//                   Log.e("width",bounds.width()+"");
                   return true;
               }
           });
       }

    }

}
