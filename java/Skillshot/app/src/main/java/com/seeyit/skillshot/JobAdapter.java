package com.seeyit.skillshot;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by seeyIT.
 */

public class JobAdapter extends ArrayAdapter<Job> {

    private Context _context;
    private ArrayList<Job> _jobList;

    public JobAdapter(@NonNull Context context, @LayoutRes int resource, @NonNull ArrayList<Job> objects) {
        super(context, resource, objects);
        _context = context;
        _jobList = objects;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(R.layout.job_list_item, null);

        if (position % 2 == 1) {
            LinearLayout wholeJob = (LinearLayout) convertView.findViewById(R.id.wholeJobLinearLayout);
            wholeJob.setBackgroundColor(Color.parseColor("#dddddd"));
        }

        TextView title = (TextView) convertView.findViewById(R.id.jobTitleTextView);
        title.setText(_jobList.get(position).getTitle());

        TextView company = (TextView) convertView.findViewById(R.id.jobCompanyTextView);
        company.setText(_jobList.get(position).getCompany());

        TextView place = (TextView) convertView.findViewById(R.id.jobPlaceTextView);
        place.setText(_jobList.get(position).getPlace());

        TextView type = (TextView) convertView.findViewById(R.id.jobTypeTextView);
        if (_jobList.get(position).getType() == EmploymentTypes.FULL_TIME) {
            type.setText("Praca stała");
            type.setBackgroundColor(0xff1bc41b);
        } else if (_jobList.get(position).getType() == EmploymentTypes.PART_TIME) {
            type.setText("Zlecenie");
            type.setBackgroundColor(0xffFB8C43);
        } else {
            type.setText("Inne");
            type.setBackgroundColor(0xff784B78);
        }

        TextView date = (TextView) convertView.findViewById(R.id.jobDateTextView);
        date.setText(_jobList.get(position).getDate());

        return convertView;
    }
}
