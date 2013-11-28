package ar.com.eduardocuomo.akoko;

import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.event.RxEvent;
import ar.com.eduardocuomo.rxandroid.event.RxEventKey;
import ar.com.eduardocuomo.rxandroid.event.RxEventMotion;
import ar.com.eduardocuomo.rxandroid.event.RxEventReturn;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

public class MainActivity extends RxActivity {

	@Override
	protected void onCreate() {
		setLayout(R.layout.activity_main);

		$(R.id.text1).onKey(new RxEventKey() {
			@Override
			public boolean Action(RxView<? extends View> v,
					RxActivity activity, int keyCode, KeyEvent event,
					RxView<View> callerView) {
				activity.toast("Test Key");
				return false;
			}
		}).onFocus(new RxEvent() {
			@Override
			public void Action(RxView<? extends View> v, RxActivity activity,
					RxView<View> callerView) {
				activity.toast("Test Focus");

			}
		}).onBlur(new RxEvent() {
			@Override
			public void Action(RxView<? extends View> v, RxActivity activity,
					RxView<View> callerView) {
				activity.toast("Test Blur");

			}
		}).onLongClick(new RxEventReturn() {
			@Override
			public boolean Action(RxView<? extends View> v, RxActivity activity,
					RxView<View> callerView) {
				activity.toast("Test Long Click");
				return true;
			}
		});

		$(R.id.button1).onClick(new RxEvent() {
			@Override
			public void Action(RxView<? extends View> v, RxActivity activity,
					RxView<View> callerView) {
				activity.toast("Test Click");
			}
		}).onTouch(new RxEventMotion() {
			@Override
			public boolean Action(RxView<? extends View> v,
					RxActivity activity, MotionEvent event,
					RxView<View> callerView) {
				activity.toast("Test Touch");
				return false;
			}
		});
	}
}
