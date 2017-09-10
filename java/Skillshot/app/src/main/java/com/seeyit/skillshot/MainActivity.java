package com.seeyit.skillshot;

import android.content.Context;
import android.content.Intent;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {

    public static Job _jobToPreview;
    private ArrayList<Job> _jobList = new ArrayList<Job>();
    private JobAdapter _jobCoverAdaper;
    private ArrayAdapter<String> _drawerAdaper;
    private ListView _mainListView;
    private ListView _drawerListView;
    private Context _context;
    private DrawerLayout _drawerLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        startActivity(new Intent(this, ApplyForJobActivity.class));
        init();
    }

    private void init() {
        _context = this;

        temp();


        _mainListView = (ListView) findViewById(R.id.mainListView);
        _drawerListView = (ListView) findViewById(R.id.drawerListView);
        _drawerLayout = (DrawerLayout) findViewById(R.id.drawerLayout);

        _jobCoverAdaper = new JobAdapter(_context, R.layout.job_list_item, _jobList);
        _mainListView.setAdapter(_jobCoverAdaper);
        _drawerAdaper = new DrawerAdapter(this, android.R.layout.simple_spinner_item, getResources().getStringArray(R.array.drawer_options), 0);
        _drawerListView.setAdapter(_drawerAdaper);

        _mainListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                _jobToPreview = _jobList.get(position);
                startActivity(new Intent(_context, JobPreviewActivity.class));
            }
        });

        _drawerListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                _drawerLayout.closeDrawers();

                if (position == 1) {
                    startActivity(new Intent(_context, BlogActivity.class));
                } else if (position == 2) {
                    startActivity(new Intent(_context, ContactActivity.class));

                } else if (position == 3) {
                    startActivity(new Intent(_context, LoginActivity.class));

                }

            }
        });

    }

    private void temp() {

        _jobList.add(new Job("Junior android", "CDP", "Kraków", "2017:02:08", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("Junior android", "CDP", "Kraków", "2017:02:08", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("Junior android", "CDP", "Kraków", "2017:02:08", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("C# senior", "CDP", "Kraków", "2017:02:08", EmploymentTypes.PART_TIME,""));
        _jobList.add(new Job("Unity developer [junior/mid/senior] ", "eFactor", "Lublin", "2017-08-28", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("Animator 3D", "beffio ", "gdziekolwiek", "2017-08-28", EmploymentTypes.OTHER,""));
        _jobList.add(new Job("Junior android", "CDP", "Kraków", "2017:02:08", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("Junior android", "CDP", "Kraków", "2017:02:08", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("C# senior", "CDP", "Kraków", "2017:02:08", EmploymentTypes.PART_TIME,""));
        _jobList.add(new Job("Unity developer [junior/mid/senior] ", "eFactor", "Lublin", "2017-08-28", EmploymentTypes.FULL_TIME,""));
        _jobList.add(new Job("Animator 3D", "beffio ", "gdziekolwiek", "2017-08-28", EmploymentTypes.OTHER,""));
        _jobList.add(new Job("Junior android", "CDP", "Kraków", "2017:02:08", EmploymentTypes.FULL_TIME,""));
    }
}
