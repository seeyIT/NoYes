package com.example.seeyit.qwe;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;

public class ChooseCollageActivity extends AppCompatActivity {

    private ImageView _first;
    private ImageView _second;
    private ImageView _third;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose_collage);
        _first = (ImageView)findViewById(R.id.chooseCollageFirst);
        _second = (ImageView)findViewById(R.id.chooseCollageSecond);
        _third = (ImageView)findViewById(R.id.chooseCollageThird);
        _first.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ChooseCollageActivity.this,CollageActivity.class);
                intent.putExtra("id", "1");
                startActivity(intent);

            }
        });
        _second.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ChooseCollageActivity.this,CollageActivity.class);
                intent.putExtra("id", "2");
                startActivity(intent);

            }
        });
        _third.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ChooseCollageActivity.this,CollageActivity.class);
                intent.putExtra("id", "3");
                startActivity(intent);

            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_choose_collage, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
