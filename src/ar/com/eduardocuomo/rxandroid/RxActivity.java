package ar.com.eduardocuomo.rxandroid;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

import android.app.Activity;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.SparseArray;
import android.view.View;
import ar.com.eduardocuomo.rxandroid.widget.RxView;

/**
 * Extended Activity.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public abstract class RxActivity extends Activity {

	/**
	 * Prefix for variables saved in instance.
	 */
	protected final String _INSTANCE_KEY_BASE = "__[%RxVar%]__{";

	/**
	 * Constructor.
	 */
	public RxActivity() {
		super();
		if (!RxAndroid.hasMainApplication()) {
			RxAndroid.setMainApplication(this);
		}
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		onCreate();
	}

	/**
	 * Executed after onCreate(Bundle savedInstanceState). In this case, not
	 * need to add {@code super.onCreate(savedInstanceState);}
	 *
	 * @see #onCreate
	 */
	protected void onCreate() {
	}

	/**
	 * Find a view element. View Element type is determinate with variable type.
	 *
	 * @param id
	 *            ID of view element.
	 * @return View element.
	 * @see #findElement
	 * @see #$
	 */
	@SuppressWarnings("unchecked")
	public <T extends View> T findView(int id) {
		return (T) findViewById(id);
	}

	/**
	 * Find a View Element and create {@link #RxView} element.
	 *
	 * @param id ID of view element.
	 * @return {@link #RxView} element.
	 * @see #findView
	 */
	@SuppressWarnings("unchecked")
	public <T extends RxView<?>> T findElement(int id) {
		return (T) new RxView<View>(findViewById(id));
	}

	/**
	 * Find a View Element and create {@link #RxView} element.
	 *
	 * @param id ID of view element.
	 * @return {@link #RxView} element.
	 * @see #findView
	 * @see #findElement
	 */
	public <T extends RxView<?>> T $(int id) {
		return findElement(id);
	}

	/**
	 * On save instance.
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void onSaveInstanceState(Bundle savedInstanceState) {
		// http://developer.android.com/reference/android/os/Bundle.html
		super.onSaveInstanceState(savedInstanceState);

		for (Map.Entry<String, Object> row : RxVar.VARS.entrySet()) {
			String key = _INSTANCE_KEY_BASE + row.getKey();
			Object value = row.getValue();
			int c, i;

			if (value instanceof Boolean) {
				// Boolean
				savedInstanceState.putBoolean(key, (Boolean) value);
			} else if (value instanceof Boolean[]) {
				// Boolean[]
				Boolean[] v = (Boolean[]) value;
				boolean[] vars = new boolean[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putBooleanArray(key, vars);
			} else if (value instanceof Bundle) {
				// Bundle
				savedInstanceState.putBundle(key, (Bundle) value);
			} else if (value instanceof Byte) {
				// Byte
				savedInstanceState.putByte(key, (Byte) value);
			} else if (value instanceof Byte[]) {
				// Byte[]
				Byte[] v = (Byte[]) value;
				byte[] vars = new byte[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putByteArray(key, vars);
			} else if (value instanceof Character) {
				// Character / Char
				savedInstanceState.putChar(key, (Character) value);
			} else if (value instanceof Character[]) {
				// Character[] / Char[]
				Character[] v = (Character[]) value;
				char[] vars = new char[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putCharArray(key, vars);
			} else if (value instanceof CharSequence) {
				// CharSequence
				savedInstanceState.putCharSequence(key, (CharSequence) value);
			} else if (value instanceof CharSequence[]) {
				// CharSequence[]
				savedInstanceState.putCharSequenceArray(key,
						(CharSequence[]) value);
			} else if (value instanceof Double) {
				// Double
				savedInstanceState.putDouble(key, (Double) value);
			} else if (value instanceof Double[]) {
				// Double[]
				Double[] v = (Double[]) value;
				double[] vars = new double[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putDoubleArray(key, vars);
			} else if (value instanceof Float) {
				// Float
				savedInstanceState.putFloat(key, (Float) value);
			} else if (value instanceof Float[]) {
				// Float[]
				Float[] v = (Float[]) value;
				float[] vars = new float[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putFloatArray(key, vars);
			} else if (value instanceof Integer) {
				// Integer
				savedInstanceState.putInt(key, (Integer) value);
			} else if (value instanceof Integer[]) {
				// Integer[]
				Integer[] v = (Integer[]) value;
				int[] vars = new int[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putIntArray(key, vars);
			} else if (value instanceof Long) {
				// Long
				savedInstanceState.putLong(key, (Long) value);
			} else if (value instanceof Long[]) {
				// Long[]
				Long[] v = (Long[]) value;
				long[] vars = new long[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putLongArray(key, vars);
			} else if (value instanceof Parcelable) {
				// Parcelable
				savedInstanceState.putParcelable(key, (Parcelable) value);
			} else if (value instanceof Parcelable[]) {
				// Parcelable[]
				savedInstanceState
						.putParcelableArray(key, (Parcelable[]) value);
			} else if (value instanceof Serializable) {
				// Serializable
				savedInstanceState.putSerializable(key, (Serializable) value);
			} else if (value instanceof Short) {
				// Short
				savedInstanceState.putShort(key, (Short) value);
			} else if (value instanceof Short[]) {
				// Short[]
				Short[] v = (Short[]) value;
				short[] vars = new short[c = v.length];
				for (i = 0; i < c; ++i)
					vars[c] = v[c];
				savedInstanceState.putShortArray(key, vars);
			} else if (value instanceof String) {
				// String
				savedInstanceState.putString(key, (String) value);
			} else if (value instanceof String[]) {
				// String[]
				savedInstanceState.putStringArray(key, (String[]) value);
			} else if (value instanceof ArrayList) {
				// ArrayList
				ArrayList<?> al = (ArrayList<?>) value;
				if (al.size() > 0) {
					Object o = al.get(0);
					if (o instanceof CharSequence) {
						// ArrayList<CharSequence>
						savedInstanceState.putCharSequenceArrayList(key,
								(ArrayList<CharSequence>) value);
					} else if (o instanceof Integer) {
						// ArrayList<Integer>
						savedInstanceState.putIntegerArrayList(key,
								(ArrayList<Integer>) value);
					} else if (o instanceof String) {
						// ArrayList<String>
						savedInstanceState.putStringArrayList(key,
								(ArrayList<String>) value);
					}
				}
			} else if (value instanceof SparseArray<?>) {
				// SparseArray
				SparseArray<?> al = (SparseArray<?>) value;
				if (al.size() > 0) {
					Object o = al.get(0);
					if (o instanceof Parcelable) {
						// SparseArray<? extends Parcelable>
						savedInstanceState.putSparseParcelableArray(key,
								(SparseArray<? extends Parcelable>) value);
					}
				}
			}
		}
	}

	/**
	 * On restore instance.
	 */
	@Override
	public void onRestoreInstanceState(Bundle savedInstanceState) {
		// http://developer.android.com/reference/android/os/Bundle.html
		super.onRestoreInstanceState(savedInstanceState);
		RxVar.VARS.clear();
		for (Map.Entry<String, Object> row : RxVar.VARS.entrySet()) {
			String key = row.getKey();
			RxVar.VARS.remove(key);
			RxVar.VARS.put(key,
					savedInstanceState.get(_INSTANCE_KEY_BASE + key));
		}
	}

	/**
	 * Print line.
	 *
	 * @param var
	 *            Variable to print.
	 */
	public static void println(Object var) {
		RxUtils.println(var);
	}

	/**
	 * Print.
	 *
	 * @param var
	 *            Variable to print.
	 */
	public static void print(Object var) {
		RxUtils.print(var);
	}
}
