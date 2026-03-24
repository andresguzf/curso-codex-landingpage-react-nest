import type { Course } from '../../types/course';
import { CourseList } from '../courses/CourseList';
import { CatalogFilters } from './CatalogFilters';

type CatalogSectionProps = {
  query: string;
  activeTag: string;
  tags: string[];
  resultsCopy: string;
  courses: Course[];
  isLoading: boolean;
  areTagsLoading: boolean;
  error: string | null;
  onQueryChange: (value: string) => void;
  onTagChange: (tag: string) => void;
};

export function CatalogSection({
  query,
  activeTag,
  tags,
  resultsCopy,
  courses,
  isLoading,
  areTagsLoading,
  error,
  onQueryChange,
  onTagChange,
}: CatalogSectionProps) {
  return (
    <section className="catalog-panel" id="cursos">
      <div className="catalog-header">
        <div className="section-copy">
          <span className="eyebrow">Empecemos a aprender</span>
          {/* <h2 className="catalog-title">Encuentra tu siguiente stack.</h2>
          <p>
            Una vitrina pensada para comprar mejor: busqueda clara, filtros por tecnologia y tarjetas con informacion mas
            facil de escanear.
          </p> */}
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

      {error ? <p className="catalog-empty">{error}</p> : null}
      {areTagsLoading ? <p className="catalog-empty">Cargando filtros...</p> : null}
      <CatalogFilters tags={tags} activeTag={activeTag} onSelectTag={onTagChange} />
      {isLoading ? <p className="catalog-empty">Cargando catalogo...</p> : null}
      <CourseList courses={courses} />
      {!isLoading && !error && courses.length === 0 ? <p className="catalog-empty">No se encontraron cursos para esa busqueda.</p> : null}
    </section>
  );
}
