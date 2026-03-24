import { useEffect, useMemo, useState } from 'react';

type CatalogFiltersProps = {
  tags: string[];
  activeTag: string;
  onSelectTag: (tag: string) => void;
};

export function CatalogFilters({ tags, activeTag, onSelectTag }: CatalogFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTags = useMemo(() => (isExpanded ? tags : tags.slice(0, 8)), [isExpanded, tags]);
  const hasHiddenTags = tags.length > 8;

  useEffect(() => {
    if (activeTag !== 'all' && !visibleTags.includes(activeTag)) {
      setIsExpanded(true);
    }
  }, [activeTag, visibleTags]);

  return (
    <div className="filter-row">
      <div className={`filter-scroller${isExpanded ? ' is-expanded' : ''}`} aria-label="Filtros rapidos por tecnologia">
        {visibleTags.map((tag) => (
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
      {hasHiddenTags ? (
        <button className="filter-toggle" type="button" onClick={() => setIsExpanded((currentValue) => !currentValue)}>
          {isExpanded ? 'Ver menos filtros' : 'Ver mas filtros'}
        </button>
      ) : null}
    </div>
  );
}
