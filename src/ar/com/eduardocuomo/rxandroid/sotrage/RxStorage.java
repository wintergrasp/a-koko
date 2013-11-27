package ar.com.eduardocuomo.rxandroid.sotrage;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 * Storage manager.
 * 
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public abstract class RxStorage {

	protected InputStreamReader fileReader;
	protected BufferedReader bufferReader;
	protected Boolean fileReaderOppened = false;

	protected OutputStreamWriter fileWriter;
	protected Boolean fileWriterOppened = false;

	protected String fileName;

	/**
	 * Check if file exists in internal storage.
	 * 
	 * @return Returns <code>TRUE</code> if file exists in internal storage.
	 *         Returns <code>FALSE</code> if file not exists in internal
	 *         storage.
	 */
	public abstract Boolean exists();

	/**
	 * Open file for write and overwrite contents. <br>
	 * For close, use {@link #closeWriter}.
	 * 
	 * @param mode
	 *            to an existing file to control permissions. Use
	 *            <code>Activity.MODE_PRIVATE</code>
	 * @return Output Stream Writer.
	 * @throws FileNotFoundException
	 *             File not found.
	 * @see {@link #writeText}
	 */
	public abstract OutputStreamWriter openWriter()
			throws FileNotFoundException;

	/**
	 * Open file for read. <br>
	 * For close, use {@link #closeReader}.
	 * 
	 * @return Buffer reader.
	 * @throws FileNotFoundException
	 *             File not found.
	 * @see {@link #readAll}
	 */
	public abstract BufferedReader openReader() throws FileNotFoundException;

	/**
	 * Close opened file for write. <br>
	 * For open, use {@link #openWriter}.
	 * 
	 * @throws IllegalStateException
	 *             File is not opened. Call before {@link openWriter}.
	 * @throws IOException
	 *             Error on save or close file.
	 * @see {@link #writeText}
	 */
	public void closeWriter() throws IllegalStateException, IOException {
		if (fileWriterOppened) {
			fileWriter.flush();
			fileWriter.close();
			fileWriterOppened = false;
		} else {
			throw new IllegalStateException();
		}
	}

	/**
	 * Close file opened for read. <br>
	 * For open, use {@link #openReader}.
	 * 
	 * @throws IllegalStateException
	 *             File is not opened. Call before {@link openReader}.
	 * @throws IOException
	 *             Error on close file.
	 * @see {@link #readAll}
	 */
	public void closeReader() throws IllegalStateException, IOException {
		if (fileReaderOppened) {
			bufferReader.close();
			fileReader.close();
			fileReaderOppened = false;
		} else {
			throw new IllegalStateException();
		}
	}

	/**
	 * Create and overwrite file contents.
	 * 
	 * @param text
	 *            Text to write into file.
	 * @throws IOException
	 *             Error on write.
	 * @see {@link #openWriter}
	 * @see {@link #closeWriter}
	 */
	public void writeText(String text) throws IOException {
		OutputStreamWriter osw = openWriter();
		osw.write(text);
		closeWriter();
	}

	/**
	 * Read all file contents.
	 * 
	 * @return File contents.
	 * @throws IOException
	 *             Error on close file.
	 * @see {@link #openReader}
	 * @see {@link #closeReader}
	 * @see {@link #exists} to check if a file exists.
	 */
	public String readAll() throws IOException {
		BufferedReader br = openReader();
		String line = br.readLine();
		String text = "";

		while (line != null) {
			if (text != "")
				text += "\n";
			text += line;
			line = br.readLine();
		}

		closeReader();

		return text;
	}

	/**
	 * Get file name.
	 * 
	 * @return File name.
	 */
	public String getFileName() {
		return fileName;
	}
}
