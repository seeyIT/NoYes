package com.example.seeyit.qwe;

import android.app.ActionBar;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.hardware.Camera;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import static android.view.ViewGroup.*;

/**
 * Created by seeyIT on 2016-10-13.
 */
public class MinaturePicture extends ImageView {

    private  byte[] _photo;
    private  int _x;
    private int _y;
    private int _iterator;
    private Bitmap bitmap;
    private Bitmap smallBmp;
    public MinaturePicture(Context context, byte[] photo) {
        super(context);
        _photo = photo;
        bitmap= BitmapFactory.decodeByteArray(photo, 0, photo.length);
        smallBmp= Bitmap.createScaledBitmap(bitmap, 300, 300, false);

        int w = smallBmp.getWidth();
        int h = smallBmp.getHeight();
        Log.e("w", w + "");
        Log.e("h", h + "");
        ViewGroup.LayoutParams params =  new ViewGroup.LayoutParams(300,300);
        setLayoutParams(params);
        Matrix matrix = new Matrix();
        // rotate Bitmap
        matrix.postRotate(90);
        //zwracam nową obróconą
        smallBmp = Bitmap.createBitmap(smallBmp, 0, 0, smallBmp.getWidth(), smallBmp.getHeight(), matrix, true);

    }



    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5f);
        paint.setColor(Color.RED);
       // canvas.drawBitmap(smallBmp, 150, 700, paint); //Lewo
       // canvas.drawBitmap(smallBmp, 750, 700, paint); // prawo
        //canvas.drawBitmap(smallBmp, 750, 1000, paint); // dol
        //canvas.drawBitmap(smallBmp, 750, 400, paint);
        //450 700 srodek
        canvas.drawBitmap(smallBmp,0,0,paint);
        Paint paint2 = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint2.setAntiAlias(true);
        paint2.setStyle(Paint.Style.STROKE);
        paint2.setStrokeWidth(5f);
        paint2.setColor(Color.RED);
        canvas.drawRect(0, 0, 300, 300, paint2);
//       s.drawBitmap(smallBmp,150,700,paint);
//        canvas.drawRect(400, 400, 300, paint);
//        p=new Paint();
//        Bitmap b=BitmapFactory.decodeResource(getResources(), R.drawable.icon);
//        p.setColor(Color.RED);
//        canvas.drawBitmap(b, 0, 0, p);
    }
}
