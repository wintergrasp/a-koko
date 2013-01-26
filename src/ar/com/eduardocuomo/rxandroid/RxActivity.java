package ar.com.eduardocuomo.rxandroid;

import android.app.Activity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Extended Activity.
 */
public class RxActivity extends Activity {

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
}
