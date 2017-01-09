package com.example.seeyit.qwe;

import android.animation.ObjectAnimator;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.Point;
import android.os.Handler;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.Size;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
import android.hardware.Camera;
import android.view.MotionEvent;
import android.view.OrientationEventListener;
import android.view.View;
import android.view.Window;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CameraActivity extends AppCompatActivity {

    private Camera camera;
    private int cameraId = -1;
    private CameraPreview _cameraPreview;
    private FrameLayout _frameLayout;
    private LinearLayout _topLinearLayout;
    private LinearLayout _bottomLinearLayout;
    private ImageView _takePhotoImageView;
    private ImageView _firstMenuButton;
    private ImageView _secondMenuButton;
    private ImageView _thirdMenuButton;
    private ImageView _fourthMenuButton;
    public static int _screenWidth;
    public static int _screenHeight;
    private boolean _menuEnable;
    private Display display;
    private List<Camera.Size> cameraSizes; // third option
    private Camera.Parameters camParams;
    private Circle _circle;
    private OrientationEventListener orientationEventListener;
    private boolean _rotatePictures = true;
    private boolean _changeRotatation = true;
    private ArrayList<byte[]> _photosList= new ArrayList<byte[]>() ;
    private float _startX = 0;
    private float _startY = 0;
    private boolean _photoOptionsOpne = false;
    private ImageView _cameraPhotoPreview;
    private TextView _progressTextView;
    private  byte[] _photoToCollage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera);
//        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();;
        _menuEnable = true;
        if(AlbumsActivity.pathToCameraText =="")
        {
            AlbumsActivity.pathToCameraText = "/storage/emulated/0/Pictures/KornelMiszczak";
        }
        //_currentPath = (TextView)findViewById(R.id.cameraTextView); // path where to save file
        //_currentPath.setText(AlbumsActivity.pathToCameraText);
        _takePhotoImageView = (ImageView)findViewById(R.id.takePhotoCamera);
        _frameLayout = (FrameLayout)findViewById(R.id.frameLayout1);
        _topLinearLayout = (LinearLayout)findViewById(R.id.cameraTopLinearLayout);
        _bottomLinearLayout = (LinearLayout)findViewById(R.id.cameraBottomLinearLayout);
        _cameraPhotoPreview = (ImageView)findViewById(R.id.cameraPhotoPreview);
        _bottomLinearLayout.setY(1650f);
        _cameraPhotoPreview .setX(-10000f);
        _cameraPhotoPreview .setY(-10000f);
        _firstMenuButton = (ImageView)findViewById(R.id.cameraTopButton1);
        _secondMenuButton = (ImageView)findViewById(R.id.cameraTopButton2);
        _thirdMenuButton = (ImageView)findViewById(R.id.cameraTopButton3);
        _fourthMenuButton = (ImageView)findViewById(R.id.cameraTopButton4);
        _progressTextView = (TextView)findViewById(R.id.cameraProgressText);
        display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        _screenWidth = size.x;
        _screenHeight = size.y;
        _progressTextView.setX(-1000f);
        _progressTextView.setY(-1000f);
        initCamera();
        initPreview();
        camParams = camera.getParameters();

        _frameLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AnimMenu();

            }
        });

        _firstMenuButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                List<String> whiteBalance =  camParams.getSupportedWhiteBalance();

                AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                alert.setTitle("Uwaga!");
                final String[] opcje = new String[whiteBalance.size()];
                whiteBalance.toArray(opcje);
                alert.setItems(opcje, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        camParams.setWhiteBalance(opcje[which]);
                        camera.setParameters(camParams);
                    }
                });
//
                alert.show();
            }
        });

        _secondMenuButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                 cameraSizes =  camParams.getSupportedPictureSizes();

                AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                alert.setTitle("Uwaga!");
                final String[] opcje = new String[cameraSizes.size()];
                for(int i =0;i<cameraSizes.size();++i)
                {
                    opcje[i] = String.valueOf(cameraSizes.get(i).width) + " x " + String.valueOf(cameraSizes.get(i).height) ;
                }
                alert.setItems(opcje, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        camParams.setPictureSize(cameraSizes.get(which).width, cameraSizes.get(which).height);
                        camera.setParameters(camParams);
                    }
                });
//
                alert.show();

            }
        });

        _thirdMenuButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                List<String> whiteBalance = camParams.getSupportedColorEffects();

                AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                alert.setTitle("Uwaga!");
                final String[] opcje = new String[whiteBalance.size()];
                whiteBalance.toArray(opcje);
                alert.setItems(opcje, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        camParams.setColorEffect(opcje[which]);
                        camera.setParameters(camParams);
                    }
                });
//
                alert.show();

            }
        });

        _fourthMenuButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int min = camParams.getMinExposureCompensation();
                int max = camParams.getMaxExposureCompensation();
                int foo = Math.abs(min) + 1 + max;
                Log.e("min", min + "");
                Log.e("min", max + "");
                final String[] opcje = new String[foo];
                for (int i = 0; i < foo; ++i) {
                    opcje[i] = String.valueOf((min) + i);
                }
                AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                alert.setTitle("Uwaga!");

//                whiteBalance.toArray(opcje);
                alert.setItems(opcje, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        camParams.setExposureCompensation(Integer.parseInt(opcje[which]));
                        camera.setParameters(camParams);
                    }
                });
//
                alert.show();
            }

        });

        _circle = new Circle(this);

        _circle.setX(_screenWidth / 2 - 400);
        _circle.setY(_screenHeight / 2 - 550);

        Log.e("a", _circle.getX() + "");
        Log.e("a", _circle.getY() + "");
        _frameLayout.addView(_circle);

//        private boolean _rotatePictures = true;
//        private boolean _changeRotatation = true;

        orientationEventListener = new OrientationEventListener(this) {
            @Override
            public void onOrientationChanged(int i) {
                //Log.e("kat",i+"");
                if((i>240 && i <280) || (i>30 && i<70))
                {
                    if(_changeRotatation == true)
                    {
                        _rotatePictures = true;
                        _changeRotatation = false;
                    }
                    if(!_rotatePictures)
                    {
                        return;
                    }
                    _rotatePictures = false;
                    int _childrenCount = _frameLayout.getChildCount();
                    Log.e("a",_childrenCount+"");
                    for(int j = 2 ;j<_childrenCount;++j)
                    {
                        View child = _frameLayout.getChildAt(j);
//                        child.setRotation(90.0f);
                        ObjectAnimator.ofFloat(child, View.ROTATION, 0, 90)
                                .setDuration(300)
                                .start();
                    }
                    ObjectAnimator.ofFloat(_firstMenuButton, View.ROTATION, 0, 90)
                            .setDuration(300)
                            .start();
                }
                else
                {
                    if(_changeRotatation == false)
                    {
                        _rotatePictures = true;
                        _changeRotatation = true;
                    }
                    if(!_rotatePictures)
                    {
                        return;
                    }
                    _rotatePictures = false;

                    int _childrenCount = _frameLayout.getChildCount();
                    Log.e("a",_childrenCount+"");
                    for(int j = 2 ;j<_childrenCount;++j)
                    {
                        View child = _frameLayout.getChildAt(j);
                        ObjectAnimator.ofFloat(child, View.ROTATION, 90, 00)
                                .setDuration(300)
                                .start();
                    }
                    ObjectAnimator.ofFloat(_firstMenuButton, View.ROTATION, 90, 0)
                            .setDuration(300)
                            .start();
                }
            }
        };

        _takePhotoImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camera.takePicture(null, null, camPictureCallback);

            }
        });

    }

    private void AnimMenu()
    {
        if(_menuEnable)
        {
            ObjectAnimator anim = ObjectAnimator.ofFloat(_bottomLinearLayout, View.TRANSLATION_Y, 1980);
            anim.setDuration(300); //ms
            anim.start();
            ObjectAnimator anim2 = ObjectAnimator.ofFloat(_topLinearLayout, View.TRANSLATION_Y, -200);
            anim2.setDuration(300); //ms
            anim2.start();
            _menuEnable = false;
        }
        else
        {
            ObjectAnimator anim = ObjectAnimator.ofFloat(_bottomLinearLayout, View.TRANSLATION_Y, 1650);
            anim.setDuration(300); //ms
            anim.start();
            ObjectAnimator anim2 = ObjectAnimator.ofFloat(_topLinearLayout, View.TRANSLATION_Y, 0);
            anim2.setDuration(300); //ms
            anim2.start();
            _menuEnable = true;

        }
    }
    private Camera.PictureCallback camPictureCallback = new Camera.PictureCallback() {
        @Override
        public void onPictureTaken(final byte[] data, Camera camera) {
            Log.e("onPictureTaken","onPictureTaken");
        // zapisz dane zdjęcia w tablicy typu byte[]
        // do poźniejszego wykorzystania
        // poniewaz zapis zdjęcia w galerii powinien być dopiero po akceptacji butonem
            byte[] fdata = data;

            _photoToCollage = data;
            Log.e("dodano date","TAK");
            Intent intent = new Intent(CameraActivity.this,CollageActivity.class);
            intent.putExtra("fotodata", _photoToCollage);
            setResult(300, intent);   // 300 - jw
            finish();
            //startActivity(intent);

           // savePhoto(fdata);
            _photosList.add(data);
            // odswiez kamerę (zapobiega przycięciu się kamery po zrobieniu zdjęcia)
            final MinaturePicture minaturePicture = new MinaturePicture(CameraActivity.this,data);
            _frameLayout.addView(minaturePicture);
            RotateImages();
            minaturePicture.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {

                    AlertDialog.Builder alert = new AlertDialog.Builder(CameraActivity.this);
                    alert.setTitle("Uwaga!");
//nie może mieć setMessage!!!
                    String[] opcje = {"podgląd", "usuń bieżące", "usuń wszystkie", "zapisz bieżące", "zapisz wszystkie"};
                    alert.setItems(opcje, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
// wyswietl opcje[which]);

                            if(which == 0)
                            {
                                Preview(minaturePicture);
                            }
                            else if(which == 1)
                            {
                                RemoveSinglePhoto(minaturePicture);
                            }
                            else if(which == 2)
                            {
                                ClearPhotos();
                            }
                            else if(which == 3)
                            {
                                SavePhoto(minaturePicture);
                            }
                            else if(which == 4)
                            {
                                SaveAllPhotos();
                                Log.e("cos","cos");
                            }
                            _photoOptionsOpne = false;
                        }
                    });
//
                    alert.show();
                    return true;
                }
            });

            minaturePicture.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View v, MotionEvent event) {
                    if(_photoOptionsOpne == true)
                    {
                        return false;
                    }

                    switch (event.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            _startX = event.getRawX();
                            _startY = event.getRawY();


                            break;
                        case MotionEvent.ACTION_MOVE:


                            break;
                        case MotionEvent.ACTION_UP:
                            float _finishX = event.getRawX();
                            float _finishY = event.getRawY();
                            float _x = _finishX - _startX;
                            float _y = _finishY - _startY;

                            float _xDouble = _x*_x;
                            float _yDouble = _y * _y;
                            if (Math.sqrt(_xDouble + _yDouble) > 500) {
                                Log.e("odleglosc click",Math.sqrt(_xDouble + _yDouble)+"");
                                int _children = _frameLayout.getChildCount();
                                for (int i = 2; i < _children; ++i) {
                                    if (_frameLayout.getChildAt(i) == minaturePicture) {
                                        _frameLayout.removeViewAt(i);
                                        _photosList.remove(i - 2);
                                        RotateImages();
                                    }
                                }
                            }
                            break;
                    }

                    return false;
                }
            });
            camera.startPreview();
        }
    };
    private void Preview(MinaturePicture minaturePicture)
    {
        _progressTextView.setX(_screenWidth/2);
        _progressTextView.setY(_screenHeight / 2);
        final MinaturePicture _minPic = minaturePicture;
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {

                //savePhoto( _photosList.get(0));
                FileOutputStream fs = null;
                try {
                    _cameraPhotoPreview.setX(0f);
                    _cameraPhotoPreview.setY(0f);
                    int _children = _frameLayout.getChildCount();
                    for (int i = 2; i < _children; ++i) {
                        Log.e("leciy po dzieciach", i + "");
                        if (_frameLayout.getChildAt(i) == _minPic) {
                            Log.e("powiekszuylo sie", "przed zrobilo");
                            Bitmap bitmap = BitmapFactory.decodeByteArray(_photosList.get(i - 2), 0, _photosList.get(i - 2).length);
                            Matrix matrix = new Matrix();
                            // setup rotation degree
                            matrix.postRotate(90);
                            Bitmap bmp = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);

                            _cameraPhotoPreview.setImageBitmap(bmp);
                            Log.e("powiekszuylo sie", "sie zrobilo");
                        }
                    }
                } catch (Exception exp) {

                } finally {
                    _progressTextView.setX(10000);
                    _progressTextView.setY(10000);
                }

            }

        }, 1);




        _cameraPhotoPreview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                _cameraPhotoPreview.setX(-100000f);
                _cameraPhotoPreview.setY(-100000f);
            }
        });
    }

    private void savePhoto(byte[] byteData)
    {
        _progressTextView.setX(_screenWidth / 2);
        _progressTextView.setY(_screenHeight / 2);
        final byte[] _byteData = byteData;
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {

                //savePhoto( _photosList.get(0));

                Log.e("savePhoto","przed try");
                try
                {

                    SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
                    String d = dFormat.format(new Date());
                    File myFoto = new File(AlbumsActivity.pathToCameraText+"/"+"superZdjecie"+d+".png");
                    Log.e("savePhoto", "k1");
                    FileOutputStream fs = new FileOutputStream(myFoto);
                    Bitmap bitmap= BitmapFactory.decodeByteArray(_byteData, 0, _byteData.length);
                    Matrix matrix = new Matrix();
                    // setup rotation degree
                    matrix.postRotate(90);
                    Bitmap bmp = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
                    Log.e("savePhoto", "kon2");
                    bmp.compress(Bitmap.CompressFormat.JPEG, 10, fs);
                    Log.e("savePhoto", "koniec33333");
                    fs.close();
                    Log.e("savePhoto", "koniec try");

                }
                catch (Exception exp)
                {
                    Log.e("expertion",exp.toString());

                }
                finally {
                    _progressTextView.setX(10000);
                    _progressTextView.setY(10000);
                }
                camera.startPreview();

            }

        }, 1);


    }
    private void ClearPhotos()
    {
        int _children = _frameLayout.getChildCount();
        Log.e("chldren",_children+"");
        Log.e("framchildren",_frameLayout.getChildCount()+"");
        Log.e("_photosList",_photosList.size()+"");
        for (int i = 2; i < _children; ++i) {
            _frameLayout.removeViewAt(2);
            _photosList.remove(0);
        }
        Log.e("framchildren",_frameLayout.getChildCount()+"");
        Log.e("_photosList", _photosList.size() + "");

    }
    private void SavePhoto(MinaturePicture minaturePicture)
    {
        int _children = _frameLayout.getChildCount();
        for (int i = 2; i < _children; ++i) {
            if (_frameLayout.getChildAt(i) == minaturePicture) {
//                _frameLayout.removeViewAt(i);
//                _photosList.remove(i - 2);
                savePhoto(_photosList.get(i - 2));
                RotateImages();

            }
        }
    }
    private void SaveAllPhotos()
    {
        _progressTextView.setX(_screenWidth / 2);
        _progressTextView.setY(_screenHeight / 2);
        byte[] temp;
        //AlbumsActivity.pathToCameraText+"/"+"superZdjecie"+d+".png"

        for (int i = 0; i < _photosList.size(); ++i) {
            temp = _photosList.get(i);
            Handler handler = new Handler();
            final int licznik = i;
            final byte[] finalTemp = temp;
            final byte[] finalTemp1 = temp;
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {

                        //savePhoto( _photosList.get(0));
                        FileOutputStream fs = null;
                        try {
                            SimpleDateFormat dFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
                            String d = dFormat.format(new Date());
                            fs = new FileOutputStream(AlbumsActivity.pathToCameraText+"/"+licznik+"superZdjecie+"+d+".png");
                            Bitmap bitmap= BitmapFactory.decodeByteArray(finalTemp, 0, finalTemp1.length);
                            Matrix matrix = new Matrix();
                            // setup rotation degree
                            matrix.postRotate(90);
                            Bitmap bmp = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
                            bmp.compress(Bitmap.CompressFormat.JPEG, 10, fs);

                            fs.close();
                        } catch (FileNotFoundException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        finally {
                            _progressTextView.setX(10000);
                            _progressTextView.setY(10000);
                        }

                }

            }, 1);
        }
        Log.e("hanglder","skonczone");
    }
    private void RemoveSinglePhoto(MinaturePicture minaturePicture)
    {
        int _children = _frameLayout.getChildCount();
        for (int i = 2; i < _children; ++i) {
            if (_frameLayout.getChildAt(i) == minaturePicture) {
                _frameLayout.removeViewAt(i);
                _photosList.remove(i - 2);
                RotateImages();
            }
        }
    }
    private void RotateImages()
    {

        int _childrenCount = _frameLayout.getChildCount();
        Log.e("a",_childrenCount+"");
        for(int i = 2 ;i<_childrenCount;++i)
        {

            View picture = _frameLayout.getChildAt(i);

            int angle =(i-2)* 360 / (_childrenCount-2);
            Log.e("angle", angle + "");
            float _xPos = 450 -50 + (float)(400*Math.cos(Math.toRadians(angle)));
            Log.e("Math.cos(angle)",Math.cos(angle)+"");
           picture.setX(_xPos);

            float _yPos = 700  + (float)(400*Math.sin(Math.toRadians(angle)));
            Log.e("Math.sin(angle)",Math.sin(angle)+"");
            picture.setY(_yPos);
        }
    }
    private void initCamera()
    {
        boolean cam = getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA);
        if (!cam) {
            // uwaga - brak kamery
        } else {
                // wykorzystanie danych zwróconych przez kolejną funkcję getCameraId
            cameraId = getCameraId();
                // jest jakaś kamera!
            if (cameraId < 0) {
            // brak kamery z przodu!
            } else if (cameraId >= 0) {
                Log.e("e","prew");

                camera = Camera.open(cameraId);
                Log.e("e","1");

            }
        }
    }
    int getCameraId()
    {
        int cid = 0;
        int camerasCount = Camera.getNumberOfCameras(); // gdy więcej niż jedna kamera
        for (int i = 0; i < camerasCount; i++) {
            Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
            Camera.getCameraInfo(i, cameraInfo);
            if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_BACK) {
                cid = i;
            }

            if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
//                cid = i;
            }

        }
        return cid;
    }
    private void initPreview()
    {
        Log.e("e", "e");
        _cameraPreview= new CameraPreview(CameraActivity.this, camera);
        Log.e("e", "1");
        _frameLayout = (FrameLayout) findViewById(R.id.frameLayout1);
        Log.e("e", "2");
        _frameLayout.addView(_cameraPreview);
    }

    @Override
    protected void onPause() {
        super.onPause();
        orientationEventListener.disable();
        if(camera != null)
        {
            camera.stopPreview();
//linijka nieudokumentowana w API, bez niej jest crash przy wznawiamiu kamery
            _cameraPreview.getHolder().removeCallback(_cameraPreview);
            camera.release();
            camera = null;
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (orientationEventListener.canDetectOrientation()) {
            // Log - listener działa
            orientationEventListener.enable();
        } else {
            // Log - listener nie działa
        }

        if (camera == null) {
            cameraId = getCameraId();
            // jest jakaś kamera!
            if (cameraId < 0) {
                // brak kamery z przodu!
            } else if (cameraId >= 0) {
                Log.e("e","prew");

                camera = Camera.open(cameraId);
                initPreview();
                Log.e("e","1");

            }
        }

    }
}
