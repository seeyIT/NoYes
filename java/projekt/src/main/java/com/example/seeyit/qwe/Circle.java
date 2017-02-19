package com.example.seeyit.qwe;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;

/**
 * Created by seeyIT on 2016-10-13.
 */
public class Circle extends View
{

    private Canvas _canvas;
    public Circle(Context context) {
        super(context);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        _canvas = canvas;
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5f);
        paint.setColor(Color.RED);
        canvas.drawCircle(400, 400, 400, paint);
    }
    public void Draw()
    {

    }
}
