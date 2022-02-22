type Listner<T> = (data: T) => void;

export const createEmitter = <T>() => {
  let listners: Listner<T>[] = [];

  const unlisten = (listner: Listner<T>) => {
    const isExist = listners.find((item) => item === listner);
    if (!isExist) return;
    listners = listners.filter((item) => item !== listner);
  };

  const listen = (listner: Listner<T>) => {
    const isExist = listners.find((item) => item === listner);
    if (isExist) return;
    listners.push(listner);
    return () => unlisten(listner);
  };

  const emit = (data: T) => {
    listners.forEach((item) => item(data));
  };

  return {
    unlisten,
    listen,
    emit,
  };
};
