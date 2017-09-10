package com.seeyit.skillshot;

import android.content.Context;
import android.content.Intent;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    private Context _context;
    private ArrayAdapter<String> _drawerAdaper;
    private ListView _drawerListView;
    private TextView _resetPasswordTextView;
    private DrawerLayout _drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        getSupportActionBar().setTitle("Skillshot - Logowanie");
        init();
    }

    private void init() {
        _context = this;
        _resetPasswordTextView = (TextView) findViewById(R.id.resetPasswordTextView);
        _drawerListView = (ListView) findViewById(R.id.drawerListView);
        _drawerAdaper = new DrawerAdapter(this, android.R.layout.simple_spinner_item, getResources().getStringArray(R.array.drawer_options), 3);
        _drawerListView.setAdapter(_drawerAdaper);
        _drawerLayout = (DrawerLayout) findViewById(R.id.drawerLayout);

        _resetPasswordTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(_context, ResetPasswordActivity.class));
            }
        });

        _drawerListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                _drawerLayout.closeDrawers();
                finish();
                if (position == 0) {
                    startActivity(new Intent(_context, MainActivity.class));
                } else if (position == 1) {
                    startActivity(new Intent(_context, BlogActivity.class));

                } else if (position == 2) {
                    startActivity(new Intent(_context, ContactActivity.class));

                }

            }
        });

    }

    public void login(View view) {
        Toast.makeText(_context, "Logowanie... //TODO", Toast.LENGTH_SHORT).show();
    }

    public void register(View view) {
        startActivity(new Intent(_context, RegisterActivity.class));
    }


}
