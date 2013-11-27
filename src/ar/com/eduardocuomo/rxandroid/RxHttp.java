package ar.com.eduardocuomo.rxandroid;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * HTTP connection.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public class RxHttp {

	protected URL url;
	protected URLConnection connect;

	/**
	 * Parameters.
	 * 
	 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
	 */
	public class Params {
		protected Map<String, String> params = new HashMap<String, String>();

		/**
		 * Add parameter.
		 * 
		 * @param key
		 *            Parameter name.
		 * @param value
		 *            Parameter value.
		 * @return This instance, to add other.
		 */
		public Params add(String key, String value) {
			params.put(key, value);
			return this;
		}

		/**
		 * Get parameters as Map.
		 * 
		 * @return Parameters as Map.
		 */
		public Map<String, String> getParams() {
			return params;
		}
	}

	/**
	 * Connect to URL.
	 * 
	 * @param url
	 *            URL to connect.
	 * @throws MalformedURLException
	 *             The URL specified was unable to be parsed or uses an invalid
	 *             protocol.
	 * @throws IOException
	 *             Can't open URL.
	 */
	public RxHttp(String url) throws MalformedURLException, IOException {
		// Establish a URL
		this.url = new URL(url);
		// Open a connection to it
		connect = this.url.openConnection();
		// Set it to output mode
		connect.setDoOutput(true);
	}

	/**
	 * Connect to URL.
	 * 
	 * @param url
	 *            URL to connect.
	 * @throws MalformedURLException
	 *             The URL specified was unable to be parsed or uses an invalid
	 *             protocol.
	 * @throws IOException
	 *             Can't open URL.
	 */
	public RxHttp(URI uri) throws MalformedURLException, IOException {
		this(uri.toString());
	}

	/**
	 * Send parameters to URL.
	 * 
	 * @param params
	 *            Parameters to send.
	 * @throws IOException
	 *             In case of error.
	 * @see #NewParams
	 */
	public void send(Map<String, String> params) throws IOException {
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
				connect.getOutputStream()));
		StringBuilder p = new StringBuilder();
		for (Map.Entry<String, String> param : params.entrySet()) {
			if (p.length() > 0)
				p.append("&");
			p.append(RxHttp.Encode(param.getKey())).append("=")
					.append(RxHttp.Encode(param.getValue()));
		}
		writer.write(p.toString());
		writer.close();
	}

	/**
	 * Send parameters to URL.
	 * 
	 * @param params
	 *            Parameters to send.
	 * @throws IOException
	 *             In case of error.
	 * @see #NewParams
	 */
	public void send(Params params) throws IOException {
		send(params.getParams());
	}

	/**
	 * Create new instance of Map for parameters.
	 * 
	 * @return Map instance for parameters.
	 */
	public Params createParams() {
		return new Params();
	}

	/**
	 * Read Web Page response.
	 * 
	 * @return Web page response.
	 * @throws IOException
	 *             In case of error.
	 */
	public String read() throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				connect.getInputStream()));
		String lineRead;
		StringBuilder rta = new StringBuilder();
		while ((lineRead = reader.readLine()) != null) {
			if (rta.length() > 0)
				rta.append("\n");
			rta.append(lineRead);
		}
		reader.close();
		return rta.toString();
	}

	/**
	 * Encode as URL.
	 * 
	 * @param str
	 *            String to encode.
	 * @param encode
	 *            Encode Charset name.
	 * @return Encoded string.
	 */
	public static String Encode(String str, String encode) {
		try {
			return URLEncoder.encode(str, encode);
		} catch (UnsupportedEncodingException e) {
			return null;
		}
	}

	/**
	 * Encode as URL.
	 * 
	 * @param str
	 *            String to encode.
	 * @return Encoded string.
	 */
	public static String Encode(String str) {
		return Encode(str, "UTF-8");
	}
}
