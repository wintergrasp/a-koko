package ar.com.eduardocuomo.rxandroid;

import java.util.HashMap;
import java.util.Map;

/**
 * Variables to save in instance.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 *
 * @param <T>
 *            Type.
 */
public class RxVar<T extends Object> {

	/**
	 * All saved variables.
	 */
	public static Map<String, Object> VARS = new HashMap<String, Object>();

	/**
	 * Variable key.
	 */
	protected String key;

	/**
	 * Constructor.
	 *
	 * @param value Value to save.
	 */
	public RxVar(T value) {
		StackTraceElement[] stes = Thread.currentThread().getStackTrace();
		StackTraceElement ste = stes[1];
		this.key = new StringBuilder(ste.getClassName())
			.append("|")
			.append(ste.getFileName())
			.append("|")
			.append(ste.getLineNumber())
			.toString();
		set(value);
	}

	/**
	 * Constructor with NULL value.
	 */
	public RxVar() {
		this(null);
	}

	/**
	 * Get value.
	 *
	 * @return Value.
	 */
	@SuppressWarnings("unchecked")
	public T get() {
		if (VARS.containsKey(key)) {
			return (T)VARS.get(key);
		} else {
			return null;
		}
	}

	/**
	 * Set value
	 *
	 * @param value Value to set.
	 */
	public void set(T value) {
		if (VARS.containsKey(key))
			VARS.remove(key);
		VARS.put(key, value);
	}
}
