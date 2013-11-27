package ar.com.eduardocuomo.rxandroid;

import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Runnable view action.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public abstract class RxEvent {

	/**
	 * Click event.
	 * 
	 * @param v
	 *            View Element.
	 * @param activity
	 *            Current activity.
	 */
	public void Click(RxView<?> v, RxActivity activity) {
	}

	/**
	 * Focus event.
	 * 
	 * @param hasFocus
	 *            Has focus?
	 * @param v
	 *            View Element.
	 * @param activity
	 *            Current activity.
	 */
	public void FocusChange(Boolean hasFocus, RxView<?> v,
			RxActivity activity) {
	}
}
