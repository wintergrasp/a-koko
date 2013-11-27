package ar.com.eduardocuomo.rxandroid.widget;

import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.widget.TextView;
import ar.com.eduardocuomo.rxandroid.RxEvent;
import ar.com.eduardocuomo.rxandroid.RxActivity;

/**
 * Extended view element.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public class RxView<T extends View> {

	/**
	 * Asociated {@link View} Element.
	 */
	protected T view;

	/**
	 * Constructor.
	 * 
	 * @param view
	 *            {@link View} Element to use.
	 */
	public RxView(T view) {
		this.view = view;
	}

	/**
	 * Get {@link View} Element.
	 * 
	 * @return {@link View} Element.
	 */
	public T getView() {
		return view;
	}

	/**
	 * On Click Event.
	 * 
	 * @param action
	 *            On Click Event.
	 * @param activity
	 *            Activity.
	 * @return This instance.
	 */
	public RxView<T> onClick(RxActivity activity, RxEvent action) {
		final RxEvent a = action;
		final RxActivity x = activity;
		view.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				a.Click(new RxView<View>(v), x);
			}
		});
		return this;
	}

	/**
	 * On Focus Change Event.
	 * 
	 * @param activity
	 *            Activity.
	 * @param action
	 *            On Focus Change Event.
	 * @return This instance.
	 */
	public RxView<T> onFocusChange(RxActivity activity, RxEvent action) {
		final RxEvent a = action;
		final RxActivity x = activity;
		view.setOnFocusChangeListener(new OnFocusChangeListener() {
			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				a.FocusChange(hasFocus, new RxView<View>(v), x);
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
	 * @param text
	 *            Text to set.
	 * @return This instance.
	 */
	public RxView<T> setText(String text) {
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
	 * @param text
	 *            Text to set.
	 * @return This instance.
	 */
	public RxView<T> setContentDescription(String text) {
		view.setContentDescription(text);
		return this;
	}
}