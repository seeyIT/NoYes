package com.seeyit.skillshot;

import android.content.Context;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.regex.Pattern;

public class ResetPasswordActivity extends AppCompatActivity {

    private Context _context;
    private EditText _editText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reset_password);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("SkillShot - Zresetuj hasło");
        init();
    }

    private void init() {
        _context = this;
        _editText = (EditText) findViewById(R.id.resetPasswordEditText);

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

    public void resetPassword(View view) {

        String email = _editText.getText().toString();

        Pattern pattern = Pattern.compile("[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}\\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                "(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+"
        );

        if (!pattern.matcher(email).matches()) {
            Toast.makeText(_context, "Błędny adres email", Toast.LENGTH_LONG).show();
            return;
        }
        Toast.makeText(_context, "Wysyłanie...//TODO", Toast.LENGTH_LONG).show();

    }
}
