package com.seeyit.musicplaylistapp;

import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;

public class SongPickerActivity extends AppCompatActivity {

    private ArrayList<String> _songs = new ArrayList<String>();
    private GridView _songsGridView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_song_picker);
        getSongs();
        _songsGridView = (GridView)findViewById(R.id.songsGridView);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1,  _songs.toArray(new String[_songs.size()]));
        _songsGridView.setAdapter(adapter);

        _songsGridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Log.e("song",_songs.get(position));
                Intent intent = new Intent(SongPickerActivity.this,PlaylistActivity.class);
                intent.putExtra("song", _songs.get(position));
                setResult(1, intent);   // 300 - jw
                finish();
            }
        });
    }
    private void getSongs()
    {
        _songs.clear();
        String path = Environment.getExternalStorageDirectory().getAbsolutePath()+"/Music";
        Log.e("czy dsa piosenki",path+"dlugosc");

        File directory = new File(path);
        File[] files = directory.listFiles();
        Log.e("czy dsa piosenki",files.length+"dlugosc");
        if(files == null)
        {
            Toast.makeText(SongPickerActivity.this,"There is not any song",Toast.LENGTH_LONG).show();
        }
        else
        {
            for (int i = 0; i < files.length; i++)
            {
                _songs.add(files[i].getName());
            }
        }

//        _songs.add("one");
//        _songs.add("two");
//        _songs.add("three");
    }
}
