package com.seeyit.musicplaylistapp;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * Created by User on 2017-08-02.
 */

public class PlaylistsAdapter extends ArrayAdapter<String> {

    private String[] _playlistNames;
    private TextView _playlistTextView;

    public PlaylistsAdapter(Context context, int resource, String[] playlistName) {
        super(context, resource);
        _playlistNames = playlistName;
    }
    @Override
    public int getCount() {
        return super.getCount();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = convertView;
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        view = inflater.inflate(R.layout.playlist_adapter, null);
        _playlistTextView = (TextView)view.findViewById(R.id.playlistTextView);
        _playlistTextView.setText("AAAAA");
        Log.e("tak","asd");
        return view;

    }

}
