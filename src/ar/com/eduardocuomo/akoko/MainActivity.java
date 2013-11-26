package ar.com.eduardocuomo.akoko;

import android.view.View;
import ar.com.eduardocuomo.rxandroid.RxActivity;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

public class MainActivity extends RxActivity {

	private RxView<View> numeroLinea;
//	private RxView password;

	@Override
	protected void onCreate() {
		setContentView(R.layout.activity_main);

		numeroLinea = $(R.id.editTextNumeroLinea);
//		password = findElement(R.id.editTextPassword);
//
//		findElement(R.id.buttonLogin).onClick(this, new RxAction() {
//			@Override
//			public void action(RxView v, RxActivity activity) {
//				RxView result = activity.findElement(R.id.textViewResult);
//				try {
//					try {
//						RxHttp http = new RxHttp(
//								new URI(
//										"http",
//										"individuos.claro.com.ar",
//										"/web/guest/bienvenido;jsessionid=D15E8E765ED7AF081FA6EAB1C97FBB5D",
//										null));
//						http.send(http.createParams().add("p_auth", "QBpbdo3X")
//								.add("p_p_id", "58").add("p_p_lifecycle", "1")
//								.add("p_p_state", "normal")
//								.add("p_p_mode", "view")
//								.add("p_p_col_id", "column-3")
//								.add("p_p_col_count", "1")
//								.add("saveLastPath", "0")
//								.add("_58_struts_action", "/login/login"));
//					} catch (URISyntaxException e) {
//					}
//				} catch (IOException e) {
//					result.setText("No se ha podido conectar!");
//				}
//			}
//		});
	}
}
