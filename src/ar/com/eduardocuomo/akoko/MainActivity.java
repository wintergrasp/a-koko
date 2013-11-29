package ar.com.eduardocuomo.akoko;

import android.widget.GridView;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

public class MainActivity extends RxActivity {

	RxView<GridView> grid;

	@Override
	protected void onCreate() {
		setLayout(R.layout.activity_main);
		grid = $(R.id.gridHorario);
	}
}
