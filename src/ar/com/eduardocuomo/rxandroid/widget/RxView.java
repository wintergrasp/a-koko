package ar.com.eduardocuomo.rxandroid.widget;

import java.util.ArrayList;

import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.view.View.OnLongClickListener;
import android.widget.TextView;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.event.RxEvent;

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

	protected ArrayList<RxEvent> eventsFocus = null;
	protected ArrayList<RxEvent> eventsBlur = null;
	protected ArrayList<RxEvent> eventsClick = null;
	protected ArrayList<RxEvent> eventsLongClick = null;

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
	 *            Action.
	 * @return This instance.
	 */
	public RxView<T> onClick(RxEvent action) {
		if (eventsClick == null) {
			eventsClick = new ArrayList<RxEvent>();

			final RxView<T> tv = this;
			final RxActivity x = (RxActivity) view.getContext();
			final ArrayList<RxEvent> zEventsClick = eventsClick;

			view.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					for (RxEvent evt : zEventsClick) {
						evt.Action(tv, x, new RxView<View>(v));
					}
				}
			});
		}

		eventsClick.add(action);

		return this;
	}

	/**
	 * On Long Click Event.
	 * 
	 * @param action
	 *            Action.
	 * @return This instance.
	 */
	public RxView<T> onLongClick(RxEvent action) {
		if (eventsLongClick == null) {
			eventsLongClick = new ArrayList<RxEvent>();

			final RxView<T> tv = this;
			final RxActivity x = (RxActivity) view.getContext();
			final ArrayList<RxEvent> zEventsLongClick = eventsLongClick;

			view.setOnLongClickListener(new OnLongClickListener() {
				@Override
				public boolean onLongClick(View v) {
					for (RxEvent evt : zEventsLongClick) {
						evt.Action(tv, x, new RxView<View>(v));
					}
					// TODO: Use return value!
					return false;
				}
			});
		}

		eventsClick.add(action);

		return this;
	}

	/**
	 * On Focus Event.
	 * 
	 * @param action
	 *            Action.
	 * @return This instance.
	 */
	public RxView<T> onFocus(RxEvent action) {
		onFocusChange();
		eventsFocus.add(action);
		return this;
	}

	/**
	 * On Blur Event.
	 * 
	 * @param action
	 *            Action.
	 * @return This instance.
	 */
	public RxView<T> onBlur(RxEvent action) {
		onFocusChange();
		eventsFocus.add(action);
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

	protected void onFocusChange() {
		if ((eventsBlur == null) || (eventsFocus == null)) {
			final RxView<T> tv = this;
			final RxActivity x = (RxActivity) view.getContext();
			final ArrayList<RxEvent> zEventsFocus = eventsFocus;
			final ArrayList<RxEvent> zEventsBlur = eventsBlur;

			// Events
			view.setOnFocusChangeListener(new OnFocusChangeListener() {
				@Override
				public void onFocusChange(View v, boolean hasFocus) {
					if (hasFocus) {
						for (RxEvent evt : zEventsFocus) {
							evt.Action(tv, x, new RxView<View>(v));
						}
					} else {
						for (RxEvent evt : zEventsBlur) {
							evt.Action(tv, x, new RxView<View>(v));
						}
					}
				}
			});
		}

		if (eventsBlur == null)
			eventsBlur = new ArrayList<RxEvent>();
		if (eventsFocus == null)
			eventsFocus = new ArrayList<RxEvent>();
	}
}