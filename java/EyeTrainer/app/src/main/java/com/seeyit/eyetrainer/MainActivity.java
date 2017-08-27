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

    //TODO animation ?

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
    private int _intevalSpeed = 15;
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

        _speedSlider.setProgress(50);
        _params = new RelativeLayout.LayoutParams(200, 200);

        //TODO to res
        _modeOptions[0] = "Circle";
        _modeOptions[1] = "Square";
        _modeOptions[2] = "Random";

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
                _angle = _angle + (_speed * _direction);
                _params.leftMargin = _screenWidth / 2 - 100 + (int) (Math.sin(_angle) * 250);
                _params.topMargin = _screenHeight / 2 - 150 + (int) (Math.cos(_angle) * 250);
                smile.setLayoutParams(_params);
//                Log.e("widht",smile.getX()+"");
                handler.postDelayed(this, _intevalSpeed);
            }
        };

        _currentPoint = _squarePoints[0];
        _params.leftMargin = _squarePoints[0].getX();
        _params.topMargin = _squarePoints[0].getY();
        smile.setLayoutParams(_params);

        _params.topMargin = _screenHeight / 2 - 150 + (int) (Math.cos(_angle) * 250);
        _runnableArray[1] = new Runnable() {
            @Override
            public void run() {
                handler.postDelayed(this, _intevalSpeed);


                if(_currentPoint.getX() - smile.getX() > 4)
                {
                    smile.setX(smile.getX()+5);
                }
                else if (_currentPoint.getX() - smile.getX() < -4 )
                {
                    smile.setX(smile.getX()-5);
                }
                else
                {
                    if(_reachedY)
                    {
                        _reachedX = false;
                        _reachedY = false;
                        _arrayPointInterator++;
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

                if(_currentPoint.getY() - smile.getY() > 4)
                {
                    smile.setY(smile.getY()+5);
                }
                else if (_currentPoint.getY() - smile.getY() < -4 )
                {
                    smile.setY(smile.getY()-5);
                }
                else
                {
                    if(_reachedX)
                    {
                        _reachedX = false;
                        _reachedY = false;
                        ++_arrayPointInterator;
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
                Log.e("goalx",_currentPoint.getX()+" , "+_currentPoint.getY());
            }
        };

        _runnableArray[2] = new Runnable() {
            @Override
            public void run() {
                handler.postDelayed(this, _intevalSpeed);
                if(_currentPoint.getX() - smile.getX() > 4)
                {
                    smile.setX(smile.getX()+5);
                }
                else if (_currentPoint.getX() - smile.getX() < -4 )
                {
                    smile.setX(smile.getX()-5);
                }
                else
                {
                    if(_reachedY)
                    {
                        _reachedX = false;
                        _reachedY = false;
                        _arrayPointInterator++;
                        _currentPoint = createRandomPoint();

                    }
                    else
                    {
                        _reachedX = true;

                    }

                }

                if(_currentPoint.getY() - smile.getY() > 4)
                {
                    smile.setY(smile.getY()+5);
                }
                else if (_currentPoint.getY() - smile.getY() < -4 )
                {
                    smile.setY(smile.getY()-5);
                }
                else
                {
                    if(_reachedX)
                    {
                        _reachedX = false;
                        _reachedY = false;

                        _currentPoint = createRandomPoint();
                    }
                    else
                    {
                        _reachedY = true;
                    }
                }
            }
        };

        _currentRunnable = _runnableArray[2];
    }

    //TODO speed
    private void initListeners()
    {
        _modeSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                Log.e("mode",_modeOptions[position]);

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        _speedSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                _speed = Double.valueOf(progress) / 1000;
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
