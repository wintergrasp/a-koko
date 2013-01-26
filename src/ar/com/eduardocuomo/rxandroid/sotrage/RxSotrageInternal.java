package ar.com.eduardocuomo.rxandroid.sotrage;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import android.app.Activity;
import android.content.ContextWrapper;
import ar.com.eduardocuomo.rxandroid.RxAndroid;

public class RxSotrageInternal extends RxStorage {
    private final ContextWrapper context;

    /**
     * Create new internal storage file interface.
     *
     * @param fileName File name to open for read and/or write.
     */
    public RxSotrageInternal(String fileName) {
        this.fileName = fileName;
        this.context = RxAndroid.getMainApplication();
    }

    @Override
    public Boolean exists() {
        String[] files = RxAndroid.getMainApplication().fileList();
        for (String f : files) {
            if (f.equals(fileName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Open file for write and overwrite contents. <br>
     * For close, use {@link #closeWriter}.
     *
     * @param mode to an existing file to control permissions. Use
     *        <code>Activity.MODE_PRIVATE</code>
     * @return Output Stream Writer.
     * @throws FileNotFoundException File not found.
     * @see {@link #writeText}
     */
    public OutputStreamWriter openWriter(int mode) throws FileNotFoundException {
        fileWriter = new OutputStreamWriter(context.openFileOutput(fileName, mode));
        fileWriterOppened = true;
        return fileWriter;
    }

    @Override
    public OutputStreamWriter openWriter() throws FileNotFoundException {
        return openWriter(Activity.MODE_PRIVATE);
    }

    @Override
    public BufferedReader openReader() throws FileNotFoundException {
        if (exists()) {
            fileReader = new InputStreamReader(context.openFileInput(fileName));
            bufferReader = new BufferedReader(fileReader);
            fileReaderOppened = true;
            return bufferReader;
        } else {
            throw new FileNotFoundException();
        }
    }
}
