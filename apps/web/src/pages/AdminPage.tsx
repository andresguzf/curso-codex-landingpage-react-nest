import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AdminAlertStack } from '../components/admin/AdminAlertStack';
import { AdminCourseForm } from '../components/admin/AdminCourseForm';
import { AdminCoursesTable } from '../components/admin/AdminCoursesTable';
import { AdminModal } from '../components/admin/AdminModal';
import { CompactHeader } from '../components/layout/CompactHeader';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { useAdminCourses } from '../hooks/useAdminCourses';
import type { Course } from '../types/course';
import type { CreateCourseInput } from '../types/course-form';

type AdminPageProps = {
  isLightTheme: boolean;
  onToggleTheme: () => void;
};

type AdminAlert = {
  id: number;
  kind: 'success' | 'error';
  message: string;
};

export function AdminPage({ isLightTheme, onToggleTheme }: AdminPageProps) {
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const {
    courses,
    isLoading,
    error,
    isSubmitting,
    submitError,
    submitFieldErrors,
    deletingCourseId,
    deleteError,
    createCourse,
    updateCourse,
    deleteCourse,
    resetMutationState,
  } = useAdminCourses();

  const isModalOpen = modalMode !== null;
  const isEditing = modalMode === 'edit' && selectedCourse !== null;

  const handleOpenCreate = () => {
    resetMutationState();
    setSelectedCourse(null);
    setModalMode('create');
  };

  const handleOpenEdit = (course: Course) => {
    resetMutationState();
    setSelectedCourse(course);
    setModalMode('edit');
  };

  const handleCloseModal = () => {
    resetMutationState();
    setSelectedCourse(null);
    setModalMode(null);
  };

  const pushAlert = (kind: AdminAlert['kind'], message: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setAlerts((currentAlerts) => [...currentAlerts, { id, kind, message }]);

    window.setTimeout(() => {
      setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== id));
    }, 4500);
  };

  const dismissAlert = (id: number) => {
    setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== id));
  };

  const handleDeleteCourse = async (course: Course) => {
    const result = await Swal.fire({
      title: 'Eliminar curso',
      text: `Vas a eliminar "${course.title}". Esta accion no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        popup: 'admin-swal-popup',
        title: 'admin-swal-title',
        htmlContainer: 'admin-swal-text',
        confirmButton: 'admin-swal-confirm',
        cancelButton: 'admin-swal-cancel',
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) {
      return;
    }

    const deleteResult = await deleteCourse(course.id);

    if (deleteResult.ok) {
      pushAlert('success', `Curso "${course.title}" eliminado correctamente.`);
      return;
    }

    pushAlert('error', deleteResult.message);
  };

  const initialValues: CreateCourseInput | undefined = selectedCourse
    ? {
      slug: selectedCourse.slug,
      title: selectedCourse.title,
      category: selectedCourse.category,
      description: selectedCourse.description,
      hours: selectedCourse.hours,
      rating: selectedCourse.rating,
      price: selectedCourse.price,
      best_sellers: selectedCourse.best_sellers,
      tags: selectedCourse.tags,
    }
    : undefined;

  return (
    <div className={`app-shell${isLightTheme ? ' theme-light' : ''}`}>
      <div className="page-shell">
        <AdminAlertStack alerts={alerts} onDismiss={dismissAlert} />

        <CompactHeader
          isLightTheme={isLightTheme}
          onToggleTheme={onToggleTheme}
          action={{
            label: 'Cerrar sesion',
            onClick: () => {
              logout();
              navigate('/login', { replace: true });
            },
          }}
        />

        <main className="site-main admin-main">
          <section className="hero-panel admin-hero">
            <div className="hero-copy">
              <span className="eyebrow">Dashboard admin</span>
              <h1>Un espacio privado separado del landing publico.</h1>
              <p className="hero-lead">
                El acceso queda protegido por JWT y no aparece dentro del menu del sitio principal. Por ahora el tablero
                esta reservado para la siguiente etapa.
              </p>

              <div className="hero-proof">
                <article className="proof-card">
                  <span>Sesion actual</span>
                  <strong>{user?.email ?? 'Administrador'}</strong>
                </article>
                <article className="proof-card">
                  <span>Estado</span>
                  <strong>Por ahora en construccion</strong>
                </article>
              </div>
            </div>

            <div className="latest-panel admin-panel">
              <div className="latest-panel-header">
                <div>
                  <span className="eyebrow">Backoffice</span>
                  <h2>Dashboard en construccion</h2>
                </div>
                <p>La pagina ya esta protegida y ahora expone la primera vista de gestion del catalogo.</p>
              </div>

              <div className="admin-grid">
                <article className="manifesto-card admin-card">
                  <strong>Catalogo</strong>
                  <p>Alta, edicion y baja de cursos con formularios conectados al backend.</p>
                </article>
                <article className="manifesto-card admin-card">
                  <strong>Usuarios</strong>
                  <p>Gestion de cuentas administrativas, sesiones y permisos.</p>
                </article>
                <article className="manifesto-card admin-card">
                  <strong>Metricas</strong>
                  <p>Visibilidad de cursos destacados, ventas y rendimiento del contenido.</p>
                </article>
              </div>
            </div>
          </section>

          <AdminCoursesTable
            courses={courses}
            isLoading={isLoading}
            error={error}
            deleteError={deleteError}
            deletingCourseId={deletingCourseId}
            onOpenCreate={handleOpenCreate}
            onEditCourse={handleOpenEdit}
            onDeleteCourse={handleDeleteCourse}
          />
        </main>

        <Footer />
      </div>

      {isModalOpen ? (
        <AdminModal
          title={isEditing ? 'Editar curso' : 'Crear curso'}
          description={isEditing ? 'Actualiza los datos del curso seleccionado desde el dashboard.' : 'Carga el primer alta desde el dashboard. Por ahora solo creacion, sin edicion ni borrado.'}
          onClose={handleCloseModal}
        >
          <AdminCourseForm
            isSubmitting={isSubmitting}
            submitError={submitError}
            fieldErrors={submitFieldErrors}
            initialValues={initialValues}
            submitLabel={isEditing ? 'Guardar cambios' : 'Crear curso'}
            onCancel={handleCloseModal}
            onSubmit={async (input) => {
              const result = isEditing && selectedCourse
                ? await updateCourse(selectedCourse.id, input)
                : await createCourse(input);

              if (result.ok) {
                pushAlert(
                  'success',
                  isEditing && selectedCourse
                    ? `Curso "${input.title}" actualizado correctamente.`
                    : `Curso "${input.title}" creado correctamente.`,
                );
                handleCloseModal();
              } else {
                pushAlert('error', result.message);
              }

              return result;
            }}
          />
        </AdminModal>
      ) : null}
    </div>
  );
}
