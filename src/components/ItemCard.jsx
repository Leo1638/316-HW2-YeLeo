import IconButton, { DELETE_GLYPH, DUPLICATE_GLYPH } from './IconButton.jsx';

export default function ItemCard({ item, index, onEdit, onDelete, onDuplicate }) {
    const ariaLabel = `Edit the item ${item.description}${item.completed ? ', completed' : ''}`;
    const descriptionClass = `${HARD_CODED_DESCRIPTION} ${item.completed ? 'line-through text-grey-400' : ''}`;

    function handleKeyDown(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        onEdit();
    }

    return (
        <li
            className={ITEM_CARD_ROW} 
            data-index={index}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            onClick={onEdit}
            onKeyDown={handleKeyDown}>
            
            <span className="area-handle text-grey-300 text-center font-bold">⋮⋮</span>

            <span className={descriptionClass}>
                {item.description}
            </span>

            <span className={HARD_CODED_DATE}>
                {item.dateEntered}
            </span>

            <span className="area-priority text-center text-[0.875rem] font-bold">
                {item.priority || 'Low'}
            </span>

            <span className="area-target text-center text-[0.875rem] tabular-nums text-grey-700">
                {item.targetDate ? item.targetDate : '—'}
            </span>

            <span className="area-completed text-center text-[1.25rem] font-bold text-completed-mark">
                {item.completed ? '✓' : ''}
            </span>

            <div className="area-actions flex gap-1 justify-end">
                <IconButton
                    action="duplicate-item"
                    label={`Duplicate the item ${item.description}`}
                    glyph={DUPLICATE_GLYPH}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(index);
                    }} />
                <IconButton
                    action="delete-item"
                    label={`Delete the item ${item.description}`}
                    glyph={DELETE_GLYPH}
                    danger
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                    }} />
            </div>
        </li>
    );
}

const ITEM_CARD_ROW =
    'item-grid mt-2.5 items-center gap-3 rounded-card border-l-[0.3125rem] ' +
    'border-l-grey-300 bg-sbu-white px-[0.875rem] py-2.5 shadow-card first:mt-0 ' +
    'group cursor-pointer hover:-translate-y-px hover:shadow-card-hover';

const HARD_CODED_DESCRIPTION = 'area-description min-w-0 truncate font-semibold';

const HARD_CODED_DATE = 'area-entered text-center text-[0.875rem] tabular-nums text-grey-700';