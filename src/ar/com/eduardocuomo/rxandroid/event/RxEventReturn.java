package ar.com.eduardocuomo.rxandroid.event;

import android.view.View;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Event.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public interface RxEventReturn {

	/**
	 * Event action.
	 * 
	 * @param v
	 *            View
	 * @param activity
	 *            Activity
	 * @param callerView
	 *            Caller View.
	 * @return TRUE to cancel event.
	 */
	public boolean Action(RxView<? extends View> v, RxActivity activity,
			RxView<View> callerView);
}
