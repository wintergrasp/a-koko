package ar.com.eduardocuomo.rxandroid.widget;

import android.view.View;
import ar.com.eduardocuomo.rxandroid.RxActivity;

public class RxViewGeneric extends RxView<View> {

	/**
	 * Constructor.
	 * 
	 * @param view
	 *            {@link View} Element to use.
	 */
	public RxViewGeneric(View view) {
		super(view);
	}

	/**
	 * Constructor.
	 * 
	 * @param activity
	 *            Associated {@link RxActivity} activity.
	 * @param view
	 *            {@link View} Element to use.
	 */
	public RxViewGeneric(RxActivity activity, View view) {
		super(activity, view);
	}
}
