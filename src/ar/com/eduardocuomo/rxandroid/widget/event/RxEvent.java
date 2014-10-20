package ar.com.eduardocuomo.rxandroid.widget.event;

import android.view.View;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Event.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public interface RxEvent {

	/**
	 * Event action.
	 * 
	 * @param v
	 *            View.
	 * @param mainActivity
	 *            Main Activity.
	 * @param callerView
	 *            Caller View.
	 */
	public void Action(RxView<? extends View> v, RxActivity mainActivity,
			RxView<View> callerView);
}
