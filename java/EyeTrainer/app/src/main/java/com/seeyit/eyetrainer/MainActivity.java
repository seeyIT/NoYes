package com.seeyit.eyetrainer;

import android.content.Context;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.Spinner;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

    private Context _context;
    private ImageView smile;
    private Spinner _modeSpinner;
    private SeekBar _speedSlider;
    private ArrayAdapter<String> _modeOptionsArrayAdapter;
    private String[] _modeOptions = new String[3];
    private RelativeLayout.LayoutParams _params;
    private Runnable[] _runnableArray = new Runnable[4];
    private Runnable _currentRunnable;
    private Point _currentPoint;
    private int _screenWidth;
    private int _screenHeight;
    private int _smileX;
    private int _smileY;
    private int _intevalSpeed;
    private int _direction = 1;
    private int _arrayPointInterator = 0;
    private double _angle = 0;
    private double _speed = 0.05;
    private Point[] _squarePoints = new Point[4];
    private final Handler handler = new Handler();
    private boolean _reachedX = false;
    private boolean _reachedY = false;
    private Random _random;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();
        init();
        initListeners();
        initPoints();
        initRunnables();
        interval();
    }

    private void init() {

        _context = this;
        Display display = getWindowManager().getDefaultDisplay();
        _speedSlider = (SeekBar) findViewById(R.id.speedSlider);
        smile = (ImageView) findViewById(R.id.smile);
        _modeSpinner = (Spinner)findViewById(R.id.modeSpinner);

        _screenWidth = display.getWidth();
        _screenHeight = display.getHeight();

        _smileX = _screenWidth/2;
        _smileY = _screenHeight/2;

        _speedSlider.setProgress(50);
        _params = new RelativeLayout.LayoutParams(200, 200);
        _intevalSpeed = 50/3;

        _modeOptions = getResources().getStringArray(R.array.modes);

        _modeOptionsArrayAdapter = new ArrayAdapter<String>(_context,android.R.layout.simple_list_item_1,_modeOptions);
        _modeSpinner.setAdapter(_modeOptionsArrayAdapter);

        _random = new Random();

    }

    private void initPoints()
    {
        _squarePoints[0] = new Point(_screenWidth/2 - 500, _screenHeight/2 - 400);
        _squarePoints[1] = new Point(_screenWidth/2 + 300, _screenHeight/2 - 400);
        _squarePoints[2] = new Point(_screenWidth/2 + 300, _screenHeight/2 + 400);
        _squarePoints[3] = new Point(_screenWidth/2 - 500, _screenHeight/2 + 400);
    }
    private void initRunnables()
    {
        _runnableArray[0] = new Runnable() {
            @Override
            public void run() {
                _angle = _angle + (((double) _direction)/20);
                smile.setX(_screenWidth / 2 - 100 + (int) (Math.sin(_angle) * 250));
                smile.setY(_screenHeight / 2 - 150 + (int) (Math.cos(_angle) * 250));
                handler.postDelayed(this, _intevalSpeed);
            }
        };


        _runnableArray[1] = new Runnable() {
            @Override
            public void run() {
                handler.postDelayed(this, _intevalSpeed);


                if(_currentPoint.getX() - _smileX > 8)
                {
                    _smileX += 10;
                    smile.setX(_smileX);
                }
                else if (_currentPoint.getX() - _smileX < -8 )
                {
                    _smileX -= 10;
                    smile.setX(_smileX);
                }
                else
                {
                    if(_reachedY)
                    {
                        _reachedX = false;
                        _reachedY = false;
                        _arrayPointInterator +=_direction;
                        if(_arrayPointInterator >= 4)
                        {
                            _arrayPointInterator = 0;
                        }
                        else if(_arrayPointInterator <= -1)
                        {
                            _arrayPointInterator = 3;
                        }
                        _currentPoint = _squarePoints[_arrayPointInterator];

                    }
                    else
                    {
                        _reachedX = true;

                    }

                }

                if(_currentPoint.getY() - _smileY > 8)
                {
                    _smileY += 10;
                    smile.setY(_smileY);
                }
                else if (_currentPoint.getY() - _smileY < -8 )
                {
                    _smileY -= 10;
                    smile.setY(_smileY);
                }
                else
                {
                    if(_reachedX)
                    {
                        _reachedX = false;
                        _reachedY = false;
                        _arrayPointInterator +=_direction;
                        if(_arrayPointInterator >= 4)
                        {
                            _arrayPointInterator = 0;
                        }
                        else if(_arrayPointInterator <= -1)
                        {
                            _arrayPointInterator = 3;
                        }
                        _currentPoint = _squarePoints[_arrayPointInterator];
                    }
                    else
                    {
                        _reachedY = true;
                    }
                }
            }
        };

        _runnableArray[2] = new Runnable() {
            @Override
            public void run() {
                handler.postDelayed(this, _intevalSpeed);
                if(_currentPoint.getX() - _smileX > 8)
                {
                    _smileX += 10;
                    smile.setX(_smileX);
                }
                else if (_currentPoint.getX() - _smileX < -8 )
                {
                    _smileX -= 10;
                    smile.setX(_smileX);
                }
                else
                {
                    _currentPoint = createRandomPoint();

                }

                if(_currentPoint.getY() -_smileY > 8)
                {
                    _smileY += 10;
                    smile.setY(_smileY);
                }
                else if (_currentPoint.getY() - _smileY < -8 )
                {
                    _smileY -= 10;
                    smile.setY(_smileY);
                }
                else
                {
                    _currentPoint = createRandomPoint();
                }
            }
        };

        _currentRunnable = _runnableArray[0];
    }

    //TODO speed
    private void initListeners()
    {
        _modeSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                resetPostion();
                handler.removeCallbacks(_currentRunnable);
                _currentRunnable = _runnableArray[position];
                if(position == 1)
                {
                    _currentPoint = _squarePoints[0];
                }
                interval();

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        _speedSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
//                _speed = Double.valueOf(progress) / 1000;
                _intevalSpeed = (100 - progress)/3;
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
    }

    private void interval() {

        handler.post(_currentRunnable);
    }

    private Point createRandomPoint()
    {
        return new Point(_random.nextInt(_screenWidth-200), _random.nextInt(_screenHeight-400)+200);
    }

    private void resetPostion()
    {
        _params.leftMargin = _screenWidth / 2 - 100;
        _params.topMargin = _screenHeight / 2 - 150;
    }

    public void changeDirection(View view) {
        _direction = _direction * (-1);
        view.setScaleX((view.getScaleX() * -1));
    }

}
