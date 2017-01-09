package com.example.seeyit.qwe;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.util.Log;
import android.view.View;

/**
 * Created by seeyIT on 2016-11-10.
 */
public class PreviewTextView extends View {

    Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private String _text;
    private int _colorBorder;
    private int _textColor;
    private boolean _drawRect = false;
    private float _width = 0;
    private float _height = 0;
    public PreviewTextView(Context context,Typeface typeface,String text,int borderColor,int textColor) {
        super(context);
        _text = text;
        _colorBorder = borderColor;
        _textColor = textColor;
        paint.reset();            // czyszczenie
        paint.setAntiAlias(true);    // wygładzanie
        paint.setTextSize(100);        // wielkość fonta
        paint.setTypeface(typeface);
    }
    public void setFont(Typeface typeface)
    {
        paint.setTypeface(typeface);

    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        paint.setStyle(Paint.Style.FILL);
        paint.setColor(_textColor != 0 ? _textColor : Color.BLUE);
        canvas.drawText(_text, 50, 200, paint);
//
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5);
        paint.setColor(_colorBorder != 0 ? _colorBorder : Color.BLACK);
        canvas.drawText(_text, 50, 200, paint);
        if(!_drawRect)
        {
            return;
        }
        Paint myPaint = new Paint();

        Rect rect = new Rect();
        myPaint.getTextBounds(_text, 0, _text.length(), rect);
        myPaint.setStyle(Paint.Style.STROKE);
        myPaint.setColor(Color.rgb(0, 0, 0));
        myPaint.setStrokeWidth(2);
        canvas.drawRect(50, 200-_height, 50 + _width, 200 , myPaint);
        Log.e("PreviewTextView", "drawing");
        Log.e("width", rect.width() + "");
        Log.e("left", rect.left + "");
        Log.e("right", rect.right + "");
        Log.e("height",rect.height()+"");
//        ribaldry

    }
    public void setRectFlag(boolean drawRect)
    {
        _drawRect = drawRect;
    }

    public Paint getPaint() {
        return paint;
    }

    public String getText() {
        return _text;
    }
    public void setWidth(float width)
    {
        _width = width;
    }
    public void setHeight(float height)
    {
        _height = height;
    }
}
