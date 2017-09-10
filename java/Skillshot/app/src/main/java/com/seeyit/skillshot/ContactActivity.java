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

public class ContactActivity extends AppCompatActivity {

    private Context _context;
    private ArrayAdapter<String> _drawerAdaper;
    private ListView _drawerListView;
    private DrawerLayout _drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);
        getSupportActionBar().setTitle("SkillShot - Kontakt");
        init();
    }

    private void init() {
        _context = this;
        _drawerLayout = (DrawerLayout)findViewById(R.id.drawerLayout);
        _drawerListView = (ListView) findViewById(R.id.drawerListView);
        _drawerAdaper = new DrawerAdapter(this, android.R.layout.simple_spinner_item, getResources().getStringArray(R.array.drawer_options), 2);
        _drawerListView.setAdapter(_drawerAdaper);

        _drawerListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                _drawerLayout.closeDrawers();
                finish();

                if (position == 0) {
                    startActivity(new Intent(_context, MainActivity.class));
                } else if (position == 1) {
                    startActivity(new Intent(_context, BlogActivity.class));

                } else if (position == 3) {
                    startActivity(new Intent(_context, LoginActivity.class));

                }

            }
        });

    }

    public void sendContactMessage(View view) {
        TextView name = (TextView) findViewById(R.id.contactNameEditText);
        TextView email = (TextView) findViewById(R.id.contactEmailEditText);
        TextView title = (TextView) findViewById(R.id.contactTitleEditText);
        TextView message = (TextView) findViewById(R.id.contactMessageEditText);


        if (name.getText().toString().equals("") ||
                email.getText().toString().equals("") ||
                title.getText().toString().equals("") ||
                message.getText().toString().equals("")) {
            Toast.makeText(_context,"Proszę uzupełnić wszystkie pola.",Toast.LENGTH_LONG).show();
        }
        else
        {
            Toast.makeText(_context,"Wysłano pomyślnie wiadomość. //TODO",Toast.LENGTH_SHORT).show();


        }


    }
}
