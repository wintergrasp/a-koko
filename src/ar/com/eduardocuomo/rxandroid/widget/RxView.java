package ar.com.eduardocuomo.rxandroid.widget;

import android.view.View;
import android.view.View.OnClickListener;
import android.widget.TextView;
import ar.com.eduardocuomo.rxandroid.RxAction;
import ar.com.eduardocuomo.rxandroid.RxActivity;

/**
 * Extended view element.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public class RxView {

	/**
	 * Asociated {@link View} Element.
	 */
	protected View view;

	/**
	 * Constructor.
	 *
	 * @param view
	 *            {@link View} Element to use.
	 */
	public RxView(View view) {
		this.view = view;
	}

	/**
	 * Get {@link View} Element.
	 *
	 * @return {@link View} Element.
	 */
	public View getView() {
		return view;
	}

	/**
	 * Get {@link View} Element. View Element type is determinate with variable
	 * type.
	 *
	 * @return {@link View} Element.
	 */
	@SuppressWarnings("unchecked")
	public <T> T View() {
		return (T) view;
	}

	/**
	 * On Click Action.
	 *
	 * @param action
	 *            On Click action.
	 * @param activity
	 *            Activity.
	 * @return This instance.
	 */
	public RxView onClick(RxActivity activity, RxAction action) {
		final RxAction a = action;
		final RxActivity x = activity;
		view.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				a.action(new RxView(v), x);
			}
		});
		return this;
	}

	/**
	 * Get {@link View} Text.
	 *
	 * @return {@link View} Text as String.
	 */
	public String getText() {
		if (view instanceof TextView) {
			return ((TextView) view).getText().toString();
		} else {
			return view.toString();
		}
	}

	/**
	 * To string.
	 */
	@Override
	public String toString() {
		return getText();
	}

	/**
	 * Set text to view.
	 *
	 * @param text Text to set.
	 * @return This instance.
	 */
	public RxView setText(String text) {
		if (view instanceof TextView) {
			((TextView) view).setText(text);
		} else {
			view.setContentDescription(text);
		}
		return this;
	}

	/**
	 * Set content description to view.
	 *
	 * @param text Text to set.
	 * @return This instance.
	 */
	public RxView setContentDescription(String text) {
		view.setContentDescription(text);
		return this;
	}
}
