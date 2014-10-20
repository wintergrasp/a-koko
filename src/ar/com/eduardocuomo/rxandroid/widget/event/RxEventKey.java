package ar.com.eduardocuomo.rxandroid.widget.event;

import android.view.KeyEvent;
import android.view.View;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Event.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public interface RxEventKey {

	/**
	 * Event action.
	 * 
	 * @param v
	 *            View
	 * @param mainActivity
	 *            Main Activity
	 * @param keyCode
	 *            Key Code
	 * @param event
	 *            Key Event
	 * @param callerView
	 *            Caller View
	 * @return TRUE to cancel event.
	 */
	public boolean Action(RxView<? extends View> v, RxActivity mainActivity,
			int keyCode, KeyEvent event, RxView<View> callerView);
}