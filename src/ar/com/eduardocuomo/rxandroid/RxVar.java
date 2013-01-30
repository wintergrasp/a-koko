package ar.com.eduardocuomo.rxandroid;

import java.util.ArrayList;
import java.util.List;

public class RxVar<T> {

    public static List<RxVar<?>> VARS = new ArrayList<RxVar<?>>();

    private T value;

    public RxVar(T value) {
        this.value = value;
        VARS.add(this);
    }

    public T get() {
        return value;
    }

    public void set(T value) {
        this.value = value;
    }
}
