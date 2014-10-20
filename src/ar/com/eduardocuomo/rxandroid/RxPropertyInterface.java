package ar.com.eduardocuomo.rxandroid;

public interface RxPropertyInterface<T extends Object> {
	T get();
	void set(T value);
}
