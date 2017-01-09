package com.example.seeyit.qwe;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.File;
import java.net.URL;
import java.util.List;

/**
 * Created by seeyIT on 2016-09-26.
 */
public class MyArraAdapterGallery extends ArrayAdapter<String> {

    private Context _context;
    private List<String> _list;

    public MyArraAdapterGallery(Context context, int resource, List<String> objects) {
        super(context, resource, objects);
        _list = objects;
        _context = context;
        Log.e("e","1");
    }
//
//    @Override
//    public View getView(final int position, View convertView, final ViewGroup parent) {
//        LayoutInflater inflater =(LayoutInflater)getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
//        convertView = inflater.inflate(R.layout.gallerysinglerow,null);
//
////        ImageView iv = (ImageView)convertView.findViewById(R.id.galleryFirstPhoto);
////        iv.setImageResource(R.drawable.kolaz);
//
//        return convertView;
//    }

}
