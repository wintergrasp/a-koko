package ar.com.eduardocuomo.rxandroid.sotrage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import android.os.Environment;

/**
 * External storage manager.
 *
 * @author Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
 */
public class RxStorageExternal extends RxStorage {

	protected final File sdcard;
	protected final File file;

	/**
	 * Create new external storage file interface.
	 *
	 * @param fileName
	 *            File name to open for read and/or write.
	 */
	public RxStorageExternal(String fileName) {
		sdcard = Environment.getExternalStorageDirectory();
		this.fileName = fileName;
		file = new File(sdcard.getAbsolutePath(), this.fileName);
	}

	@Override
	public Boolean exists() {
		return file.exists();
	}

	@Override
	public OutputStreamWriter openWriter() throws FileNotFoundException {
		fileWriter = new OutputStreamWriter(new FileOutputStream(file));
		fileWriterOppened = true;
		return fileWriter;
	}

	@Override
	public BufferedReader openReader() throws FileNotFoundException {
		fileReader = new InputStreamReader(new FileInputStream(file));
		bufferReader = new BufferedReader(fileReader);
		fileReaderOppened = true;
		return bufferReader;
	}
}
