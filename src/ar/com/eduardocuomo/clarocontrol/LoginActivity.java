package ar.com.eduardocuomo.clarocontrol;

import ar.com.eduardocuomo.rxandroid.RxAction;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

public class LoginActivity extends RxActivity {

	private RxView numeroLinea;
	private RxView password;

	@Override
	protected void onCreate() {
		setContentView(R.layout.activity_login);

		numeroLinea = findElement(R.id.editTextNumeroLinea);
		password = findElement(R.id.editTextPassword);

		findElement(R.id.buttonLogin).onClick(new RxAction() {
			@Override
			public void action(RxView v) {
			}
		});
	}
}
