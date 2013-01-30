package ar.com.eduardocuomo.rxandroid;

import java.util.ArrayList;

import android.app.Activity;
import android.os.Bundle;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Extended Activity.
 */
public abstract class RxActivity extends Activity {

    private static final String VARS_KEYS_LIST_NAME = "RxVarKeyList";

    public RxActivity() {
        super();
        if (!RxAndroid.hasMainApplication()) {
            RxAndroid.setMainApplication(this);
        }
    }

    /**
     * Find a view element.
     * View Element type is determinate with variable type.
     *
     * @param id ID of view element.
     * @return View element.
     * @see #findElement
     */
    @SuppressWarnings("unchecked")
    public <T> T findView(int id) {
        return (T) findViewById(id);
    }

    /**
     * Find a View Element and create {@link #RxView} element.
     *
     * @param id ID of view element.
     * @return {@link #RxView} element.
     * @see #findView
     */
    public RxView findElement(int id) {
        return new RxView(findViewById(id));
    }

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        // http://developer.android.com/reference/android/os/Bundle.html
        super.onSaveInstanceState(savedInstanceState);

        ArrayList<String> keys = new ArrayList<String>();

        Integer i = 0;
        for (RxVar<?> var : RxVar.VARS) {
            String key = new StringBuilder(VARS_KEYS_LIST_NAME).append(i++).toString();
            Object value = var.get();
            if (value.getClass().getName().equals("Boolean")) {
                savedInstanceState.putBoolean(key, true);
            }
            keys.add(key);
        }

        savedInstanceState.putStringArrayList(VARS_KEYS_LIST_NAME, keys);
    }

    @Override
    public void onRestoreInstanceState(Bundle savedInstanceState) {
        // http://developer.android.com/reference/android/os/Bundle.html
        super.onRestoreInstanceState(savedInstanceState);
        RxVar.VARS.clear();
        // TODO: Load vars
//        boolean value = savedInstanceState.getBoolean("MyBoolean");
    }
}
