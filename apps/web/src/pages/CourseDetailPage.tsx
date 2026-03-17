import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { CourseList } from '../components/courses/CourseList';
import { CourseVisual } from '../components/courses/CourseVisual';
import { clockIcon } from '../content/site-content';
import { fetchCourseById, fetchLatestCourses } from '../lib/api';
import { formatHours, formatPrice, formatRating, getCourseDetailHref, getPrimaryTag } from '../lib/course-utils';
import type { Course } from '../types/course';

type CourseDetailPageProps = {
  isLightTheme: boolean;
  onToggleTheme: () => void;
};

export function CourseDetailPage({ isLightTheme, onToggleTheme }: CourseDetailPageProps) {
  const { courseId, slug } = useParams<{ courseId: string; slug: string }>();
  const parsedCourseId = Number(courseId);
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedError, setRelatedError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
      setCourse(null);
      setError('Curso no encontrado');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadCourse = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const courseResponse = await fetchCourseById(parsedCourseId);
        if (!isMounted) {
          return;
        }

        setCourse(courseResponse);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setCourse(null);
        setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el detalle del curso');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCourse();

    return () => {
      isMounted = false;
    };
  }, [parsedCourseId]);

  useEffect(() => {
    let isMounted = true;

    const loadRelatedCourses = async () => {
      setIsRelatedLoading(true);
      setRelatedError(null);

      try {
        const latestCourses = await fetchLatestCourses(4);
        if (!isMounted) {
          return;
        }

        setRelatedCourses(latestCourses.filter((relatedCourse) => relatedCourse.id !== parsedCourseId).slice(0, 3));
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setRelatedError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar cursos relacionados');
      } finally {
        if (isMounted) {
          setIsRelatedLoading(false);
        }
      }
    };

    if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
      setRelatedCourses([]);
      setIsRelatedLoading(false);
      return;
    }

    void loadRelatedCourses();

    return () => {
      isMounted = false;
    };
  }, [parsedCourseId]);

  const hasSlugMismatch = course !== null && slug !== course.slug;
  const stats = useMemo(() => {
    if (!course) {
      return [];
    }

    return [
      { label: 'Duracion', value: formatHours(course.hours) },
      { label: 'Valoracion', value: `${formatRating(course.rating)} / 5` },
      { label: 'Precio', value: formatPrice(course.price) },
    ];
  }, [course]);
  const productDetails = useMemo(() => {
    if (!course) {
      return [];
    }

    const dateFormatter = new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return [
      { label: 'ID del curso', value: String(course.id) },
      { label: 'Slug', value: course.slug },
      { label: 'Categoria', value: course.category },
      { label: 'Actualizado', value: dateFormatter.format(new Date(course.updated_at)) },
    ];
  }, [course]);

  if (hasSlugMismatch && course) {
    return <Navigate to={getCourseDetailHref(course)} replace />;
  }

  return (
    <div className={`app-shell${isLightTheme ? ' theme-light' : ''}`}>
      <div className="page-shell">
        <Header isLightTheme={isLightTheme} onToggleTheme={onToggleTheme} />

        <main className="site-main">
          <section className="hero-panel course-detail-hero" id="inicio">
            {isLoading ? <p className="catalog-empty">Cargando detalle del curso...</p> : null}
            {!isLoading && error ? (
              <div className="course-detail-empty">
                <span className="eyebrow">Detalle de curso</span>
                <h1>Ese curso no esta disponible.</h1>
                <p>{error}</p>
                <Link className="primary-button" to="/#cursos">
                  Volver al catalogo
                </Link>
              </div>
            ) : null}
            {!isLoading && !error && course ? (
              <>
                <div className="hero-copy course-detail-copy">
                  <span className="eyebrow">Detalle de curso</span>
                  <div className="course-detail-breadcrumbs" aria-label="Ruta actual">
                    <Link to="/#cursos">Cursos</Link>
                    <span>/</span>
                    <span>{course.category}</span>
                  </div>
                  <h1>{course.title}</h1>
                  <p className="hero-lead">{course.description}</p>
                  <div className="course-badges">
                    <span className="course-tag">{getPrimaryTag(course)}</span>
                    <span className="course-tag">{course.category}</span>
                    {course.best_sellers ? <span className="course-bestseller-badge">Best seller</span> : null}
                  </div>
                  <div className="hero-actions">
                    <a className="primary-button" href="#relacionados">
                      Ver mas cursos
                    </a>
                    <Link className="secondary-button" to="/#contacto">
                      Pedir informacion
                    </Link>
                  </div>
                  <div className="hero-proof course-detail-proof">
                    {stats.map((stat) => (
                      <div key={stat.label} className="proof-card">
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="hero-stage" aria-label="Resumen visual del curso">
                  <div className="spotlight-card course-detail-spotlight">
                    <div className="course-detail-visual">
                      <CourseVisual course={course} />
                    </div>
                    <div className="spotlight-top">
                      <span className="eyebrow">Resumen rapido</span>
                      <p>
                        Un formato compacto para revisar stack, esfuerzo estimado y senales de demanda antes de tomar una
                        decision.
                      </p>
                    </div>
                    <div className="course-detail-meta">
                      <div className="metric-block">
                        <span>Stack</span>
                        <strong>{course.category}</strong>
                      </div>
                      <div className="metric-block">
                        <span>Horas</span>
                        <strong>{formatHours(course.hours)}</strong>
                      </div>
                      <div className="metric-block">
                        <span>Rating</span>
                        <strong>{formatRating(course.rating)}</strong>
                      </div>
                    </div>
                    <div className="course-detail-inline-meta">
                      <span className="meta-stack">
                        {clockIcon}
                        {formatHours(course.hours)}
                      </span>
                      <span className="meta-rating">
                        <span>{formatRating(course.rating)}</span>
                        <span className="stars" style={{ ['--score' as string]: course.rating }} aria-label={`${formatRating(course.rating)} de 5 estrellas`} />
                      </span>
                    </div>
                    <div className="course-detail-purchase">
                      <div>
                        <span className="eyebrow">Precio</span>
                        <strong>{formatPrice(course.price)}</strong>
                      </div>
                      <p>Detalle publico por `id` y `slug`, listo para compartir y posicionar cada curso como producto.</p>
                    </div>
                  </div>
                </aside>
              </>
            ) : null}
          </section>

          {!isLoading && !error && course ? (
            <section className="catalog-panel course-detail-panel">
              <div className="catalog-header course-detail-section-header">
                <div className="section-copy">
                  <span className="eyebrow">Lo que vas a trabajar</span>
                  <h2 className="catalog-title">Una lectura rapida del curso antes de comprar.</h2>
                  <p>
                    Este detalle mantiene el mismo tono visual del landing y deja visibles los datos que importan:
                    posicionamiento, descripcion y tecnologias relacionadas.
                  </p>
                </div>
                <div className="course-detail-price-card">
                  <span>Precio actual</span>
                  <strong>{formatPrice(course.price)}</strong>
                  <p>Acceso online con foco en practica aplicada y stacks de salida laboral clara.</p>
                </div>
              </div>

              <div className="course-detail-content">
                <article className="manifesto-card course-detail-description-card">
                  <span className="eyebrow">Descripcion</span>
                  <h2>Donde encaja este curso en tu roadmap.</h2>
                  <p>{course.description}</p>
                </article>

                <article className="latest-panel course-detail-tags-card">
                  <div className="latest-panel-header">
                    <div>
                      <span className="eyebrow">Ficha del producto</span>
                      <h2>Detalle tecnico del curso</h2>
                    </div>
                    <p>Informacion visible para identificar la ficha, compartirla y navegar el catalogo publico.</p>
                  </div>
                  <dl className="course-detail-specs">
                    {productDetails.map((detail) => (
                      <div key={detail.label} className="course-detail-spec-row">
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="course-detail-tag-list">
                    {course.tags.map((tag) => (
                      <span key={tag} className="filter-chip course-detail-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </section>
          ) : null}

          <section className="catalog-panel" id="relacionados">
            <div className="catalog-header">
              <div className="section-copy">
                <span className="eyebrow">Siguiente paso</span>
                <h2 className="catalog-title">Mas cursos con el mismo lenguaje visual del landing.</h2>
                <p>Una seleccion corta para seguir explorando sin salir del flujo publico.</p>
              </div>
            </div>

            {relatedError ? <p className="catalog-empty">{relatedError}</p> : null}
            {isRelatedLoading ? <p className="catalog-empty">Cargando cursos relacionados...</p> : null}
            {!isRelatedLoading && !relatedError && relatedCourses.length > 0 ? <CourseList courses={relatedCourses} /> : null}
            {!isRelatedLoading && !relatedError && relatedCourses.length === 0 ? (
              <p className="catalog-empty">No hay mas cursos para mostrar por ahora.</p>
            ) : null}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
