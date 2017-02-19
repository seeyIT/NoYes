package com.example.seeyit.qwe;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TextView;
import java.io.File;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

/**
 * Created by seeyIT on 2016-09-24.
 */
public class MyArrayAdapter extends ArrayAdapter<String> {

    private List<String> _list;
    private Context _context;
    public MyArrayAdapter(Context context, int resource, List<String> objects) {
        super(context, resource, objects);
        _list = objects;
        _context = context;

    }


    @Override
    public View getView(final int position, View convertView, final ViewGroup parent) {
        LayoutInflater inflater =(LayoutInflater)getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(R.layout.photoeditsinglerow,null);

        TextView tv = (TextView)convertView.findViewById(R.id.albumsGridText);
        tv.setText(_list.get(position).toString());
        if(position==0)
        {
            ImageView iv = (ImageView)convertView.findViewById(R.id.albumsDirectoryImage);
            iv.setImageResource(R.drawable.left);
        }

//        ImageView iv = (ImageView)convertView.findViewById(R.id.albumsImage);
        final View finalConvertView = convertView;
//        iv.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Log.e("iv1?", "cos wyspisalo");
//                AlertDialog.Builder alert = new AlertDialog.Builder(_context);
//                alert.setTitle("AHTÓNK!");
//                alert.setCancelable(false);
//                alert.setMessage("Do you want to remove this folder?");
//                alert.setPositiveButton("Delete", new DialogInterface.OnClickListener() {
//                    public void onClick(DialogInterface dialog, int which) {
//
//                        File _file = new File(AlbumsActivity.currentPath + "/" + _list.get(position));
//                        File[] fooFiles = _file.listFiles();
//                        for (int i = 0; i < fooFiles.length; ++i)
//                        {
//                            fooFiles[i].delete();
//                        }
//                        _file.delete();
//                        _list.remove(_list.get(position));
//                        AlbumsActivity._myArrayAdapter.notifyDataSetChanged();
//                    }
//
//                });
//
//                alert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
//
//                    public void onClick(DialogInterface dialog, int which) {
//                        //wyswietl which
//                    }
//                });
//                alert.show();
//            }
//        });

        ImageView ivDirectory = (ImageView)convertView.findViewById(R.id.albumsDirectoryImage);
        ivDirectory.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                AlbumsActivity.galleryPath = AlbumsActivity._myCatalog.getPath();
//                AlbumsActivity.galleryPath += "/"+_list.get(position);
//                Log.e("a",AlbumsActivity.galleryPath+"");
//                Intent intent = new Intent(_context,GalleryActivity.class);
//                _context.startActivity(intent);
            }
        });

        return convertView;
    }


    void MoveDirectoryUp()
    {
        int length = AlbumsActivity.currentPath.length();
        for(int i =length-1;i>0;--i)
        {
            if(AlbumsActivity.currentPath.charAt(i) !='/')
            {
                AlbumsActivity.currentPath = AlbumsActivity.currentPath.substring(0,i);
            }
            else
            {
                AlbumsActivity.currentPath = AlbumsActivity.currentPath.substring(0,i);
                return;
            }
        }
    }
}
