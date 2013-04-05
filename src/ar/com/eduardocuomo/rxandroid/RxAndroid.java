package ar.com.eduardocuomo.rxandroid;

import android.content.ContextWrapper;

/**
 * Common methods.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public final class RxAndroid {

	/**
	 * Main Application. Saved on first use {@link #RxActivity} as Activity.
	 */
	protected static ContextWrapper mainApplication = null;

	/**
	 * Get Main Application.
	 *
	 * @return Main Application.
	 * @see #setMainApplication
	 * @see #hasMainApplication
	 */
	public static ContextWrapper getMainApplication() {
		if (!hasMainApplication()) {
			throw new RuntimeException(RxActivity.class.getSimpleName()
					+ " never used as activity!");
		}
		return mainApplication;
	}

	/**
	 * Set Main Application.
	 *
	 * @param app
	 *            Main Application.
	 * @see #getMainApplication
	 * @see #hasMainApplication
	 */
	public static void setMainApplication(ContextWrapper app) {
		mainApplication = app;
	}

	/**
	 * Main Application has been saved?
	 *
	 * @return Return {@code true} if Main Application is saved.
	 * @see #getMainApplication
	 * @see #setMainApplication
	 */
	public static Boolean hasMainApplication() {
		return mainApplication != null;
	}
}
