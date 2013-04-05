package ar.com.eduardocuomo.rxandroid;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * Utilities and common methods.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public final class RxUtils {

	/**
	 * Returns MD5 of string, or NULL in case of error.
	 *
	 * @param s
	 *            String to get MD5.
	 * @return MD5.
	 */
	public static String md5(String s) {
		try {
			MessageDigest m = MessageDigest.getInstance("MD5");
			m.update(s.getBytes(), 0, s.length());
			BigInteger i = new BigInteger(1, m.digest());
			return String.format("%1$032x", i);
		} catch (NoSuchAlgorithmException e) {
		}
		return null;
	}

	/**
	 * Generate random number between 0 and "max".
	 *
	 * @param max
	 *            Max value.
	 * @return Random number.
	 */
	public static int random(int max) {
		return (int) ((Math.random() + 0.1) * max);
	}

	/**
	 * Print line.
	 *
	 * @param var
	 *            Variable to print.
	 */
	public static void println(Object var) {
		System.out.println(var.toString());
	}

	/**
	 * Print.
	 *
	 * @param var
	 *            Variable to print.
	 */
	public static void print(Object var) {
		System.out.print(var.toString());
	}

	/**
	 * Repeat a string.
	 *
	 * @param times Times to repeat.
	 * @param str String to repeat.
	 * @return String
	 */
	public static String repeat(int times, String str) {
		return new String(new char[times]).replace("\0", str);
	}

	/**
	 * Clone a list.
	 *
	 * @param list List to clone.
	 * @return Cloned list instance.
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Object> List<T> cloneList(List<T> list) {
		return ((List<T>) ((ArrayList<T>) list).clone());
	}
}
