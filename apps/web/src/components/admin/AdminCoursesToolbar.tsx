type AdminCoursesToolbarProps = {
  totalCourses: number;
  onOpenCreate: () => void;
};

export function AdminCoursesToolbar({ totalCourses, onOpenCreate }: AdminCoursesToolbarProps) {
  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar-copy">
        <span className="eyebrow">Cursos</span>
        <h2>Gestion del catalogo</h2>
        <p>{totalCourses} curso(s) cargados desde el backend.</p>
      </div>

      <div className="admin-toolbar-actions">
        <button className="primary-button admin-toolbar-button" type="button" onClick={onOpenCreate}>
          Nuevo curso
        </button>
      </div>
    </div>
  );
}
