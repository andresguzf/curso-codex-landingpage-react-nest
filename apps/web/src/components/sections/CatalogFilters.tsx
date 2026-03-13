type CatalogFiltersProps = {
  tags: string[];
  activeTag: string;
  onSelectTag: (tag: string) => void;
};

export function CatalogFilters({ tags, activeTag, onSelectTag }: CatalogFiltersProps) {
  return (
    <div className="filter-row">
      <div className="filter-scroller" aria-label="Filtros rapidos por tecnologia">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`filter-chip${activeTag === tag ? ' active' : ''}`}
            type="button"
            onClick={() => onSelectTag(tag)}
          >
            {tag === 'all' ? 'Todos' : tag}
          </button>
        ))}
      </div>
    </div>
  );
}
