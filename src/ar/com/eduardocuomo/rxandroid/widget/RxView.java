package ar.com.eduardocuomo.rxandroid.widget;

import java.util.ArrayList;

import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.view.View.OnKeyListener;
import android.view.View.OnLongClickListener;
import android.view.View.OnTouchListener;
import android.widget.TextView;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.event.RxEvent;
import ar.com.eduardocuomo.rxandroid.event.RxEventKey;
import ar.com.eduardocuomo.rxandroid.event.RxEventMotion;
import ar.com.eduardocuomo.rxandroid.event.RxEventReturn;

/**
 * Extended view element.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public class RxView<T extends View> {

	/**
	 * Associated {@link View} element.
	 */
	protected T view;

	/**
	 * Associated {@link RxActivity} activity.
	 */
	protected RxActivity viewActivity;

	protected ArrayList<RxEvent> eventsFocus = null;
	protected ArrayList<RxEvent> eventsBlur = null;
	protected ArrayList<RxEvent> eventsClick = null;
	protected ArrayList<RxEventReturn> eventsLongClick = null;
	protected ArrayList<RxEventMotion> eventsTouch = null;
	protected ArrayList<RxEventKey> eventsKey = null;

	/**
	 * Constructor.
	 * 
	 * @param view
	 *            {@link View} Element to use.
	 */
	public RxView(T view) {
		this.view = view;
		this.viewActivity = (RxActivity) view.getContext();
	}

	/**
	 * Constructor.
	 * 
	 * @param activity
	 *            Associated {@link RxActivity} activity.
	 * @param view
	 *            {@link View} Element to use.
	 */
	public RxView(RxActivity activity, T view) {
		this.viewActivity = activity;
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
	 * Associated {@link RxActivity} activity.
	 * 
	 * @return Associated {@link RxActivity} activity.
	 */
	public RxActivity getActivity() {
		return viewActivity;
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

			final RxView<T> t = this;
			final RxActivity a = viewActivity;
			final ArrayList<RxEvent> e = eventsClick;

			view.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					for (RxEvent evt : e) {
						evt.Action(t, a, new RxView<View>(v));
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
	public RxView<T> onLongClick(RxEventReturn action) {
		if (eventsLongClick == null) {
			eventsLongClick = new ArrayList<RxEventReturn>();

			final RxView<T> t = this;
			final RxActivity a = viewActivity;
			final ArrayList<RxEventReturn> e = eventsLongClick;

			view.setOnLongClickListener(new OnLongClickListener() {
				@Override
				public boolean onLongClick(View v) {
					boolean r = true;
					for (RxEventReturn evt : e) {
						r = r && evt.Action(t, a, new RxView<View>(v));
					}
					return r;
				}
			});
		}

		eventsLongClick.add(action);

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
	 * On Touch Event.
	 * 
	 * @param action
	 *            Action.
	 * @return This instance.
	 */
	public RxView<T> onTouch(RxEventMotion action) {
		if (eventsTouch == null) {
			eventsTouch = new ArrayList<RxEventMotion>();

			final RxView<T> t = this;
			final RxActivity a = viewActivity;
			final ArrayList<RxEventMotion> e = eventsTouch;

			view.setOnTouchListener(new OnTouchListener() {
				@Override
				public boolean onTouch(View v, MotionEvent event) {
					boolean r = true;
					for (RxEventMotion evt : e) {
						r = r && evt.Action(t, a, event, new RxView<View>(v));
					}
					return r;
				}
			});
		}

		eventsTouch.add(action);

		return this;
	}

	/**
	 * On Key Event.
	 * 
	 * @param action
	 *            Action.
	 * @return This instance.
	 */
	public RxView<T> onKey(RxEventKey action) {
		if (eventsKey == null) {
			eventsKey = new ArrayList<RxEventKey>();

			final RxView<T> t = this;
			final RxActivity a = viewActivity;
			final ArrayList<RxEventKey> e = eventsKey;

			view.setOnKeyListener(new OnKeyListener() {
				@Override
				public boolean onKey(View v, int keyCode, KeyEvent event) {
					boolean r = true;
					for (RxEventKey evt : e) {
						r = r
								&& evt.Action(t, a, keyCode, event,
										new RxView<View>(v));
					}
					return r;
				}
			});
		}

		eventsKey.add(action);

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
			if (eventsBlur == null)
				eventsBlur = new ArrayList<RxEvent>();
			if (eventsFocus == null)
				eventsFocus = new ArrayList<RxEvent>();

			final RxView<T> t = this;
			final RxActivity a = viewActivity;
			final ArrayList<RxEvent> ef = eventsFocus;
			final ArrayList<RxEvent> eb = eventsBlur;

			// Events
			view.setOnFocusChangeListener(new OnFocusChangeListener() {
				@Override
				public void onFocusChange(View v, boolean hasFocus) {
					if (hasFocus) {
						for (RxEvent evt : ef) {
							evt.Action(t, a, new RxView<View>(v));
						}
					} else {
						for (RxEvent evt : eb) {
							evt.Action(t, a, new RxView<View>(v));
						}
					}
				}
			});
		}
	}
}