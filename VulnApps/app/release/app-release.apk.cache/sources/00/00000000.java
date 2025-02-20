package com.app.vulnapps;

import B0.e;
import E0.D;
import E0.View$OnClickListenerC0000a;
import J.H;
import J.T;
import P0.c;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.security.keystore.KeyGenParameterSpec;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import androidx.activity.l;
import e.AbstractActivityC0109g;
import java.util.WeakHashMap;
import javax.crypto.KeyGenerator;

/* loaded from: classes.dex */
public final class MainActivity extends AbstractActivityC0109g {

    /* renamed from: A  reason: collision with root package name */
    public static final /* synthetic */ int f1618A = 0;

    /* renamed from: v  reason: collision with root package name */
    public EditText f1619v;

    /* renamed from: w  reason: collision with root package name */
    public EditText f1620w;

    /* renamed from: x  reason: collision with root package name */
    public Button f1621x;

    /* renamed from: y  reason: collision with root package name */
    public SharedPreferences f1622y;

    /* renamed from: z  reason: collision with root package name */
    public e f1623z;

    @Override // e.AbstractActivityC0109g, androidx.activity.k, y.f, android.app.Activity
    public final void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES", "AndroidKeyStore");
        KeyGenParameterSpec build = new KeyGenParameterSpec.Builder("alias-key", 3).setBlockModes("GCM").setEncryptionPaddings("NoPadding").build();
        c.d(build, "build(...)");
        keyGenerator.init(build);
        keyGenerator.generateKey();
        l.a(this);
        setContentView(R.layout.activity_main);
        View findViewById = findViewById(R.id.main);
        D d2 = new D(1);
        WeakHashMap weakHashMap = T.f383a;
        H.u(findViewById, d2);
        View findViewById2 = findViewById(R.id.username_input);
        c.d(findViewById2, "findViewById(...)");
        this.f1619v = (EditText) findViewById2;
        View findViewById3 = findViewById(R.id.password_input);
        c.d(findViewById3, "findViewById(...)");
        this.f1620w = (EditText) findViewById3;
        View findViewById4 = findViewById(R.id.logn_btn);
        c.d(findViewById4, "findViewById(...)");
        this.f1621x = (Button) findViewById4;
        SharedPreferences sharedPreferences = getSharedPreferences("AppPrefs", 0);
        c.d(sharedPreferences, "getSharedPreferences(...)");
        this.f1622y = sharedPreferences;
        this.f1623z = new e(24);
        Button button = this.f1621x;
        if (button != null) {
            button.setOnClickListener(new View$OnClickListenerC0000a(4, this));
        } else {
            c.g("loginBtn");
            throw null;
        }
    }
}