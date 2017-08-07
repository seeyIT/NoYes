package com.seeyit.musicplaylistapp;

import android.content.DialogInterface;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.TextView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class PlaylistActivity extends AppCompatActivity {

    private MediaPlayer mediaPlayer;
    private String _playlistName;
    private TextView _titleTextView;
    private ArrayList<String> _songsList= new ArrayList<String>();
    private GridView _songsGridView;
    private String _currentSongName = "";
    private Session _session;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);
        getSupportActionBar().hide();
        _session = new Session(PlaylistActivity.this);
        _titleTextView = (TextView)findViewById(R.id.playlistName);
//        Log.e("nazwa",getIntent().getStringExtra("playlistName"));
        _playlistName = getIntent().getStringExtra("playlistName");
        _titleTextView.setText(_playlistName);
        _songsGridView = (GridView) findViewById(R.id.playListGridView);
        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);

       if(_songsList.size()>0)
       {
           initGridView();
       }
        _songsGridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Log.e("piosenka",_songsList.get(position));
                Log.e("current ",_currentSongName);

                if(!mediaPlayer.isPlaying())
                {
                    Log.e("is not ","play");
                    playSong(Environment.getExternalStorageDirectory().getPath()+"/Music/"+_songsList.get(position));
                    _currentSongName = _songsList.get(position);
                }

                else
                {
                    Log.e("obecna piosenka",_currentSongName);
                    Log.e("grało","i juz nie gra");
                    mediaPlayer.release();
                    mediaPlayer = null;
                    mediaPlayer = new MediaPlayer();
                    mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);

                }
                if(!_currentSongName.equals(_songsList.get(position)))
                {
                    playSong(Environment.getExternalStorageDirectory().getPath()+"/Music/"+_songsList.get(position));
                    _currentSongName = _songsList.get(position);

                }

            }
        });
        _songsGridView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, final int position, long id) {
                AlertDialog.Builder builder = new AlertDialog.Builder(PlaylistActivity.this);

                builder.setTitle("Do you want to delete?");

                builder.setPositiveButton("YES", new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface dialog, int which) {
                       _songsList.remove(position);
                        updatePlaylist();
                        getPlaylist();

                        dialog.dismiss();
                    }
                });

                builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                        // Do nothing
                        dialog.dismiss();
                    }
                });

                AlertDialog alert = builder.create();
                alert.show();

                return true;
            }
        });
        getPlaylist();
    }

    private void initGridView()
    {
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1,  _songsList.toArray(new String[_songsList.size()]));
        _songsGridView.setAdapter(adapter);
    }
    public void addSong(View v)
    {
        Intent intent = new Intent(PlaylistActivity.this,SongPickerActivity.class);
        startActivityForResult(intent,1);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 1)
        {
            Log.e("wrociło","tak");
//            Log.e("song",data.getStringExtra("song"));
            if(data == null)
            {
                return;
            }
            _songsList.add(data.getStringExtra("song"));
            updatePlaylist();

            initGridView();
        }
    }
    private void playSong(String song)
    {
        Log.e("song path",song);

        try {

            mediaPlayer.setDataSource(song);
            mediaPlayer.prepare();

            mediaPlayer.start();
        } catch (Exception e) {
            Log.e("eerro",e.toString());
//            e.printStackTrace();
        }
    }
    public void updatePlaylist()
    {
//        _playList.add("nowy2");
        String playlists = "";
        for(String s: _songsList)
        {
            playlists = playlists+s+";";
        }
        _session.putString(_playlistName,playlists);
        Log.e("plalistya",playlists);
    }
    public void getPlaylist()
    {
        Log.e("playlists",_session.getString("playlists"));
        _songsList = new ArrayList<String>(Arrays.asList(_session.getString(_playlistName).split(";")));
        Log.e("sizeeeeee",_songsList.size()+"fgh");
        if(_songsList.size() == 1)
        {
            if(_songsList.get(0) == "")
            {
                _songsList.remove(0);
            }
        }
        initGridView();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mediaPlayer.release();
        mediaPlayer = null;
    }

    @Override
    protected void onResume() {
        super.onResume();
        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
    }
}
