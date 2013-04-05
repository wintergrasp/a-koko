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
public class RxVar<T> {

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
	 * @param value
	 *            Value to save.
	 */
	public RxVar(T value) {
		StackTraceElement[] stes = Thread.currentThread().getStackTrace();
		StackTraceElement ste = stes[1];
		this.key = ste.getClassName() + ste.getFileName() + ste.getLineNumber();
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
		return (T) VARS.get(key);
	}

	/**
	 * Set value
	 *
	 * @param value
	 *            Value to set.
	 */
	public void set(T value) {
		VARS.put(key, value);
	}
}
