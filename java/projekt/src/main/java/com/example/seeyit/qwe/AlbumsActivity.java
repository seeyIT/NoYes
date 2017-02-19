package com.example.seeyit.qwe;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import java.io.File;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import android.os.Environment;
import android.Manifest;
import android.app.Activity;
import 	android.support.v4.app.ActivityCompat;
import android.content.pm.PackageManager;
import android.widget.TextView;

public class AlbumsActivity extends AppCompatActivity {

    static String currentPath = "";
    static String galleryPath = "";
    static String pathToCameraText = "";
    static List<String> _list = new ArrayList<String>() ;
    static MyArrayAdapter _myArrayAdapter;

    private TextView _selectedFolderTextView;
    private GridView _gridView;
    private File _file;
    static File _myCatalog;
    private CheckBox _checkBox;
//    private ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_albums);
        DefaultDirectories();
        PutFilesNames();
        _gridView = (GridView) findViewById(R.id.albumsGridView);
        _selectedFolderTextView = (TextView)findViewById(R.id.albumsSelectedDirectoryText);
        _checkBox = (CheckBox)findViewById(R.id.albumsCheckBox);
        _myArrayAdapter =  new MyArrayAdapter(
                AlbumsActivity.this,
                R.layout.albumssinglerow,
                _list
        );
        _gridView.setAdapter(_myArrayAdapter);

        _gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Log.e("asd", currentPath);
                if (_selectedFolderTextView.getText() == _list.get(i) || _selectedFolderTextView.getText() == "") {
                    return;
                }
                _selectedFolderTextView.setText(_list.get(i));
                _checkBox.setChecked(false);
                currentPath = _myCatalog.getPath();
//                currentPath += "/"+ _list.get(i);
//                Log.e("e",currentPath);
//                PutFilesNames();
//                 _myArrayAdapter = new MyArrayAdapter(
//                        AlbumsActivity.this,
//                        R.layout.albumssinglerow,
//                        _list
//                );
//                _gridView.setAdapter(_myArrayAdapter);

            }


        });

        _checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener()
        {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked)
            {
                Log.e("button",isChecked+"");
                currentPath = _myCatalog.getPath();
                if(isChecked)
                {
                    currentPath += "/"+_selectedFolderTextView.getText();
                    pathToCameraText = _myCatalog.getAbsolutePath();
                    pathToCameraText += "/"+_selectedFolderTextView.getText();
                }
            }
        });

    }

    void PutFilesNames()
    {
        File[] files = new File(currentPath).listFiles();
        int _length = files.length;
        _list.clear();
        for(int i =0 ;i<_length; ++i) {
            _list.add(files[i].getName());
        }

    }
    void DefaultDirectories()
    {
        _file  = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);

        _myCatalog = new File(_file.getPath()+"/KornelMiszczak");
        pathToCameraText = _myCatalog.getAbsolutePath(); // // clear path every time when activity is opned
        currentPath = _myCatalog.getPath();
        galleryPath = currentPath;
        if(!_myCatalog.exists())
        {
            String _myCatalogPath = _myCatalog.getPath();
            _myCatalog.mkdir();

            File _peopleDirectory = new File(_myCatalogPath + "/People");
            _peopleDirectory.mkdir();
            File _placesDirectory = new File(_myCatalogPath + "/Places");
            _placesDirectory.mkdir();
            File _thingsDirectory = new File(_myCatalogPath + "/Things");
            _thingsDirectory.mkdir();
        }
        if(_myCatalog.listFiles().length==0)
        {
            String _myCatalogPath = _myCatalog.getPath();
            File _peopleDirectory = new File(_myCatalogPath + "/People");
            _peopleDirectory.mkdir();
            File _placesDirectory = new File(_myCatalogPath + "/Places");
            _placesDirectory.mkdir();
            File _thingsDirectory = new File(_myCatalogPath + "/Things");
            _thingsDirectory.mkdir();
        }
    }
}
