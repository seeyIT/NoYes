package com.seeyit.skillshot;

import android.content.Context;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class ApplyForJobActivity extends AppCompatActivity {

    private Context _context;
    private Job _job;
    private TextView _contentWebView;
    private TextView _titleTextView;
    private TextView _companyTextView;
    private TextView _placeTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_apply_for_job);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        init();
    }

    private void init() {
        _context = this;

        _job = MainActivity._jobToPreview;
        _contentWebView = (TextView) findViewById(R.id.contentWebView);
        _titleTextView = (TextView) findViewById(R.id.jobDetailsTitle);
        _companyTextView = (TextView) findViewById(R.id.jobDetailsCompany);
        _placeTextView = (TextView) findViewById(R.id.jobDetailsPlace);
        _titleTextView.setText(_job.getTitle());
//        String test = "dla" + _job.getCompany() + "(" + _job.getPlace() + ")";
        _companyTextView.setText(_job.getCompany());
        _placeTextView.setText("(" + _job.getPlace() + ")");
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void takeCVFromPhone(View view) {
        Toast.makeText(_context, "Tutaj będzie file explorer... //TODO", Toast.LENGTH_SHORT).show();
    }

    public void applyForJob(View view) {
        Toast.makeText(_context, "Wysyłanie... //TODO", Toast.LENGTH_SHORT).show();
    }
}
