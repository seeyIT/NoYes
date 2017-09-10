package com.seeyit.skillshot;

import android.content.Context;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Toast;

import java.util.regex.Pattern;

public class RegisterActivity extends AppCompatActivity {

    private Context _context;
    private EditText _emailEditText;
    private EditText _passwordEditText;
    private EditText _password2EditText;
    private EditText _nameEditText;
    private EditText _surnameEditText;
    private ScrollView _scrollView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("SkillShot - Rejestracja");
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        init();

    }

    private void init() {
        _context = this;
        _emailEditText = (EditText) findViewById(R.id.registerEmailEditText);
        _passwordEditText = (EditText) findViewById(R.id.registerPasswordEditText);
        _password2EditText = (EditText) findViewById(R.id.registerPassword2EditText);
        _nameEditText = (EditText) findViewById(R.id.registerNameEditText);
        _surnameEditText = (EditText) findViewById(R.id.registerSurnameEditText);
        _scrollView = (ScrollView) findViewById(R.id.registerScrollView);
        _scrollView.post(new Runnable() {
            public void run() {
                _scrollView.fullScroll(View.FOCUS_UP);
                _scrollView.requestFocus(); // EditText loses focus
            }
        });


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

    public void register(View view) {
        String email = _emailEditText.getText().toString();
        String password = _passwordEditText.getText().toString();
        String password2 = _password2EditText.getText().toString();
        String name = _nameEditText.getText().toString();
        String surname = _surnameEditText.getText().toString();

        if (email.equals("") || password.equals("") || password2.equals("") || name.equals("") || surname.equals("")) {
            Toast.makeText(_context, "Proszę wypełnić wszystkie pola", Toast.LENGTH_LONG).show();
            return;
        } else if (!password.equals(password2)) {
            Toast.makeText(_context, "Hasła się nie zgadzają", Toast.LENGTH_LONG).show();
            return;
        }

        Pattern pattern = Pattern.compile("[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}\\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                "(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+"
        );

        if (!pattern.matcher(email).matches()) {
            Toast.makeText(_context, "Błędny adres email", Toast.LENGTH_LONG).show();
            return;
        }


        Toast.makeText(_context, "Sprawdzanie czy email wystepuje w bazie, jeżeli nie to zakładanie konta... //TODO", Toast.LENGTH_LONG).show();


    }

}
