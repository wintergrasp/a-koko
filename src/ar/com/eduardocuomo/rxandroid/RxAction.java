package ar.com.eduardocuomo.rxandroid;

import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Runnable view action.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public abstract class RxAction {

	/**
	 * Action.
	 *
	 * @param v
	 *            View Element.
	 * @param activity
	 *            Current activity.
	 */
	public abstract void action(RxView v, RxActivity activity);
}
