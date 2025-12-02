function SaveLoadActions({ save, load}) {
  return (
    <div className="SaveLoadActions">
      <button className="SaveAction btn" onClick={save}>Сохранить</button>
      <button className="LoadAction btn" onClick={load}>Импортировать</button>
    </div>
  );
}
export default SaveLoadActions;
