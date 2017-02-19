package com.example.seeyit.qwe;

import android.content.Context;
//import android.graphics.Camera;
import android.util.AttributeSet;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.hardware.Camera;
import android.app.Activity;
import android.content.Context;
/**
 * Created by seeyIT on 2016-10-03.
 */
public class CameraPreview extends SurfaceView implements SurfaceHolder.Callback {

    private Camera _camera;
    private SurfaceHolder _surfaceHolder;



    public CameraPreview(Context context, Camera camera)
    {
        super(context, null);
        Log.e("cameraPrevie", "duo");

        this._camera = camera;
        this._surfaceHolder = this.getHolder();
        this._surfaceHolder.addCallback(this);
    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {

        try {
            this._camera.setPreviewDisplay(_surfaceHolder);
            this._camera.setDisplayOrientation(90);
            this._camera.startPreview();
        }
        catch (Exception exp)
        {

        }
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
        try {
            _camera.setPreviewDisplay(_surfaceHolder);
            this._camera.setDisplayOrientation(90);

            _camera.startPreview();
        }
        catch (Exception exp)
        {

        }
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {

    }

//    @Override
//    private void onPause() {
//        super.onPause();
//        Log.e("MainActivity", "pasue");
//    }
}
