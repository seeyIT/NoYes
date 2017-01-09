package com.example.seeyit.qwe;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.CheckBox;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class GalleryActivity extends AppCompatActivity {

    private MyArraAdapterGallery _myArraAdapterGallery;
    static String _selectedPhoto;
    private GridView _gridView;
    private ImageView _imageView;
    private File[] _files;
    private LinearLayout _ownLinearLayout;
    static List<String> _list = new ArrayList<String>() ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gallery);
        _ownLinearLayout = (LinearLayout)findViewById(R.id.mainLayout);
//        _gridView = (GridView) findViewById(R.id.galleryGriedView);
//        _list.add("S");
//        _myArraAdapterGallery =  new MyArraAdapterGallery(
//                GalleryActivity.this,
//                R.layout.gallerysinglerow,
//                _list
//        );
//        _gridView.setAdapter(_myArraAdapterGallery);
        _files = new File(AlbumsActivity.galleryPath).listFiles();
        int _length = _files.length;
        int yPos =0;
        int xPos = 0;
        int height = 0;

        for (int i = 0 ; i < _length ; ++i)
        {
            //jesli File jest plikiem
            if(!_files[i].isFile())
            {
                return;
            }
            _imageView = new ImageView(this);
            _imageView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT));
//            ImageView.LayoutParams params = new ImageView.LayoutParams(ImageView.LayoutParams.WRAP_CONTENT, ImageView.LayoutParams.WRAP_CONTENT);
//            params.setMargins(100, 75, 0, 0);
//            params.topMargin= 100;



//            _imageView.getLayoutParams().height = height;
//            _imageView.getLayoutParams().width = width;
            _imageView.setAdjustViewBounds(true);
//            _imageView.setScaleType(ImageView.ScaleType.FIT_XY);
            _imageView.setId((i));
//adding view to layout
            String imagePath = _files[i].getPath();                 // pobierz sciezke z obiektu File
            Bitmap bmp = betterImageDecode(imagePath);
            RelativeLayout.LayoutParams params;

//            params.leftMargin = 5;
//            params.topMargin = 6;

//            int wys = 200;
//            int szer;
//            int dwies = 200;
//            if(i%2==0)
//            {
//
//                params = new RelativeLayout.LayoutParams(400,dwies * (i/2));
//                params.leftMargin = 0;
//                params.topMargin = 250 * (i/2);
//                _imageView.setY(yPos);
//                _imageView.setX(0);
//                width = 300;
//                szer = 600;
////                xPos = 200;
////                _imageView.setLeft(0);
//
//            }
//            else {
////                params = new RelativeLayout.LayoutParams(200,dwies * (i/2));
////                params.leftMargin = 405;
////                params.topMargin = 350 * (i/2);
////                height = 250 * i;
////                szer = 400;
////                _imageView.setY(yPos);
////                _imageView.setX(500);
////                width = 200;
////                yPos += 250;
////
////                _imageView.setRight(0);
//
//            }
//            params.topMargin = 350 * (i/2);

            params = new RelativeLayout.LayoutParams(300,300);
            if(i%2==0)
            {
                _imageView.setX(0);
                if(i==2)
                {
                    _imageView.setX(-300);

                }
                _imageView.setY(height);

            }
            else
            {
                _imageView.setX(300);
                _imageView.setY(height);
                height +=300;

            }
            // funkcja decodeImage opisana jest ponizej
//            bmp = Bitmap.createScaledBitmap(bmp, szer,wys, true);
//            _imageView.setAdjustViewBounds(true);
//            _imageView.setMaxWidth(width);
//            _imageView.setMaxHeight(height);
//            _imageView.setMinimumHeight(height);
//            _imageView.setMinimumWidth(width);
            _imageView.setImageBitmap(bmp);        // wstawienie bitmapy do ImageView
            _ownLinearLayout.addView(_imageView,params);
            _imageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    _selectedPhoto = _files[v.getId()].getAbsolutePath();
//                    Intent intent = new Intent(GalleryActivity.this, SinglePhotoActivity.class);
//                    GalleryActivity.this.startActivity(intent);
                    Log.e("id",v.getId()+"");
                }
            });
        }
    }

    private Bitmap betterImageDecode(String filePath) {

        Bitmap myBitmap;
        BitmapFactory.Options options = new BitmapFactory.Options();    //opcje przekształcania bitmapy
        options.inSampleSize = 4; // zmniejszenie jakości bitmapy 4x
        //
        myBitmap = BitmapFactory.decodeFile(filePath, options);
        return myBitmap;
    }
}
