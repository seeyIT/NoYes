package com.seeyit.musicplaylistapp;

import android.Manifest;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private GridView _gridView;
    private String[] list = new String[3];
    private Button _addPlaylistButton;
    private Session _session;
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.CAMERA,
            Manifest.permission.INTERNET,
            Manifest.permission.ACCESS_NETWORK_STATE
    };
//    private HashMap<String,ArrayList<String>> _playlist = new HashMap<String, ArrayList<String>>();
    private ArrayList<String> _playList = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();
        verifyStoragePermissions(MainActivity.this);
        _session = new Session(MainActivity.this);
//        _playList.add("tal");
//        _playList.add("_playlist");
//        _playList.add("Button");
//        _playList.add("onCreate");
//        Log.e("nie",_playlist.keySet().toArray());
        _addPlaylistButton = (Button)findViewById(R.id.addPlaylist);
        initGridView();
//        updatePlaylists();
        getPlaylists();
//        _session.putString("playlists","");
    }

    private void initGridView()
    {
        Log.e("size",_playList.size()+"");
//        if(_playList.get())
        _gridView = (GridView)findViewById(R.id.mainGridView);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1,  _playList.toArray(new String[_playList.size()]));
        _gridView.setAdapter(adapter);
        _gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(MainActivity.this,PlaylistActivity.class);
                intent.putExtra("playlistName",_playList.get(position));
                startActivity(intent);
            }
        });
    }
    public void addPlaylist(View v)
    {
        LayoutInflater li = LayoutInflater.from(  MainActivity.this);
        View promptsView = li.inflate(R.layout.input_dialog, null);

        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                MainActivity.this);
        alertDialogBuilder.setView(promptsView);

        final EditText userInput = (EditText) promptsView
                .findViewById(R.id.playlistNameEditText);
        alertDialogBuilder
                .setCancelable(false)
                .setPositiveButton("OK",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                Log.e("tak",userInput.getText().toString());
                                if(userInput.getText().toString().equals(""))
                                {
                                    Toast.makeText(MainActivity.this,"Wrong name!",Toast.LENGTH_SHORT).show();

                                    return;
                                }
                                _playList.add(userInput.getText().toString());
                                updatePlaylists();
                                Toast.makeText(MainActivity.this,"Added",Toast.LENGTH_SHORT).show();
                                initGridView();
                            }
                        })
                .setNegativeButton("Cancel",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                Toast.makeText(MainActivity.this,"Canceled",Toast.LENGTH_SHORT).show();
                                dialog.cancel();
                            }
                        });

        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }

    public void getPlaylists()
    {
        Log.e("playlists",_session.getString("playlists"));
        _playList = new ArrayList<String>(Arrays.asList(_session.getString("playlists").split(";")));
        Log.e("sizeeeeee",_playList.size()+"");
        if(_playList.size() == 1)
        {
            if(_playList.get(0) == "")
            {
                _playList.remove(0);
            }
        }
        initGridView();
    }

    public void updatePlaylists()
    {
//        _playList.add("nowy2");
        String playlists = "";
        for(String s: _playList)
        {
            playlists = playlists+s+";";
        }
        _session.putString("playlists",playlists);
        Log.e("plalistya",playlists);
    }
    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_NETWORK_STATE);
        ActivityCompat.requestPermissions(
                activity,
                PERMISSIONS_STORAGE,
                REQUEST_EXTERNAL_STORAGE
        );
        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
        }
    }
}
