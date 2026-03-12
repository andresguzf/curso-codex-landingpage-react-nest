import type { Course } from '../../types/course';
import { CourseList } from '../courses/CourseList';
import { CatalogFilters } from './CatalogFilters';

type CatalogSectionProps = {
  query: string;
  activeTag: string;
  tags: string[];
  resultsCopy: string;
  courses: Course[];
  onQueryChange: (value: string) => void;
  onTagChange: (tag: string) => void;
};

export function CatalogSection({
  query,
  activeTag,
  tags,
  resultsCopy,
  courses,
  onQueryChange,
  onTagChange,
}: CatalogSectionProps) {
  return (
    <section className="catalog-panel" id="cursos">
      <div className="catalog-header">
        <div className="section-copy">
          <span className="eyebrow">Catalogo de cursos</span>
          <h2 className="catalog-title">Encuentra tu siguiente stack.</h2>
          <p>
            Una vitrina pensada para comprar mejor: busqueda clara, filtros por tecnologia y tarjetas con informacion mas
            facil de escanear.
          </p>
        </div>

        <div className="catalog-tools">
          <label className="catalog-search" htmlFor="course-search">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="search"
              id="course-search"
              placeholder="Buscar por curso, stack o tecnologia"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </label>
          <p className="results-copy">{resultsCopy}</p>
        </div>
      </div>

      <CatalogFilters tags={tags} activeTag={activeTag} onSelectTag={onTagChange} />
      <CourseList courses={courses} />
      {courses.length === 0 ? <p className="catalog-empty">No se encontraron cursos para esa busqueda.</p> : null}
    </section>
  );
}
