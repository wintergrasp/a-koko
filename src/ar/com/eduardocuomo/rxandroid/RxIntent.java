package ar.com.eduardocuomo.rxandroid;

import android.content.ContextWrapper;
import android.content.Intent;

public class RxIntent {

    public final Intent intent;
    private ContextWrapper context;

    public RxIntent(ContextWrapper context, Class<RxActivity> activityClass) {
        intent = new Intent(context, activityClass);
    }

    public void start() {
        context.startActivity(intent);
    }
}