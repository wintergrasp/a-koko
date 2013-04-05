package ar.com.eduardocuomo.rxandroid;

import android.content.ContextWrapper;
import android.content.Intent;

/**
 * Intent manager.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public class RxIntent extends Intent {

	/**
	 * Context for intent.
	 */
	protected ContextWrapper context;

	/**
	 * New intent.
	 *
	 * @param context
	 *            Context.
	 * @param activityClass
	 *            Activity to start.
	 */
	public RxIntent(ContextWrapper context, Class<RxActivity> activityClass) {
		super(context, activityClass);
		this.context = context;
	}

	/**
	 * Start new activity.
	 */
	public void start() {
		context.startActivity(this);
	}
}