package com.seeyit.skillshot;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import org.w3c.dom.Text;

/**
 * Created by seeyIT.
 */

public class DrawerAdapter extends ArrayAdapter<String> {

    private String[] _options;
    private int _selectedOptionId;

    public DrawerAdapter(@NonNull Context context, @LayoutRes int resource, @NonNull String[] objects, int selectedOptionId) {
        super(context, resource, objects);
        _options = objects;
        _selectedOptionId = selectedOptionId;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(R.layout.drawer_list_item, null);

        TextView textView = (TextView) convertView.findViewById(R.id.drawerItemTextView);
        textView.setText(_options[position]);
        if (_selectedOptionId == position) {
            textView.setTextColor(Color.parseColor("#0f96ff"));
//            textView.setText("> " + _options[position]);
            textView.setTypeface(textView.getTypeface(), Typeface.BOLD);

        }


        return convertView;
    }
}
