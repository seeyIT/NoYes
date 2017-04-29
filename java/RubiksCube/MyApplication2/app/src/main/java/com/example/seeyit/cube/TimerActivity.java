package com.example.seeyit.cube;

import android.os.Handler;
import android.os.SystemClock;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.Touch;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class TimerActivity extends AppCompatActivity {

    private TextView _timerTV;
    private ImageView _leftHandIV;
    private ImageView _rigttHandIV;
    private LinearLayout _wholeScreenLL;
    private int _time;
    private boolean _leftHandHolds;
    private boolean _rightHandHolds;
    private boolean _timerIsRunning;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_timer);
        instantiate();
        listeners();
    }

    private void instantiate() {
        _timerTV = (TextView) findViewById(R.id.Timer_Time_TextView);
        _leftHandIV = (ImageView) findViewById(R.id.Timer_LeftHand_ImageView);
        _rigttHandIV = (ImageView) findViewById(R.id.Timer_RightHand_ImageView);
        _wholeScreenLL = (LinearLayout) findViewById(R.id.Timer_WholeScreen_LinearLayout);
    }

    private void listeners() {
        _leftHandIV.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                _leftHandHolds = true;

                return false;
            }
        });
        _leftHandIV.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_UP) {
                    if (_rightHandHolds && _leftHandHolds) {
                        startTimer();
                    }
                    _leftHandHolds = false;
                }
                return false;
            }
        });
        _rigttHandIV.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                _rightHandHolds = true;
                return false;
            }
        });
        _rigttHandIV.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_UP) {
                    if (_rightHandHolds && _leftHandHolds) {
                        startTimer();
                    }
                    _rightHandHolds = false;
                }
                return false;
            }
        });

        _timerTV.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopTimer();
            }
        });
    }

    private void startTimer() {
        if (_timerIsRunning) {
            return;
        }
        _timerIsRunning = true;
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            private long _time = 0;

            @Override
            public void run() {
                _time += 10;
                displayTimer(_time);

                if (_timerIsRunning) {
                    handler.postDelayed(this, 10);
                }
            }
        }, 10);
    }

    private void stopTimer() {
        _timerIsRunning = false;
    }

    private void displayTimer(long time) {

        int _minutes = (int) (time % 60000);
        if (time - (long) _minutes * 60000 > 0) {
            time -= (long) _minutes * 60000;
        }

        int _seconds = (int) (time % 1000);
        if (time - (long) _seconds * 1000 > 0) {
            time -= (long) _seconds * 1000;
        }

        _timerTV.setText(_minutes+ " : " + _seconds + " : " + time);
    }
}
