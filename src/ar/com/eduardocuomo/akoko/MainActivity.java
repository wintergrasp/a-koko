package ar.com.eduardocuomo.akoko;

import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.RxProperty;

public class MainActivity extends RxActivity {
	
	@Override
	protected int CFG_LAYOUT() {
		return R.layout.activity_main;
	}

	@Override
	protected void onCreate() {
		setLayout(R.layout.activity_main);
	}
}
