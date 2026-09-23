import IconButton, { DELETE_GLYPH } from './IconButton.jsx';
import IconButton, { DUPLICATE_GLYPH } from './IconButton.jsx';
import * as DateUtil from '../common/DateUtil.js'

export default function ItemCard({ item, index, onEdit, onDelete, onDuplicate }) {
    const ariaLabel = `Edit the item ${item.description}${item.completed ? ', completed' : ''}`;
    const descriptionClass = `item-description truncate ${item.completed ? 'line-through text-grey-400' : ''}`;

    function handleKeyDown(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        onEdit();
    }



return (
        <div
            className="item-card group flex items-center cursor-pointer border-b border-grey-200 py-3 hover:bg-grey-50"
            data-index={index}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            onClick={onEdit}
            onKeyDown={handleKeyDown}>

            {/* Column 1: Description */}
            <div className="flex-1 min-w-0 pr-4">
                <span className={descriptionClass}>
                    {item.description}
                </span>
            </div>

            {/* Column 2: Date Entered */}
            <div className="w-32 text-sm">
                {item.dateEntered}
            </div>

            {/* Column 3: Priority */}
            <div className="w-24 text-sm">
                {item.priority}
            </div>

            {/* Column 4: Target Date */}
            <div className="w-32 text-sm">
                {item.targetDate ? DateUtil.format(item.targetDate) : '—'}
                {item.targetDate ? item.targetDate : '—'}  
            </div>

            {/* Column 5: Completed */}
            <div className="w-24 text-center text-completed-mark font-bold text-lg">
                {item.completed ? '✓' : ''}
            </div>

            {/* Column 6: Controls */}
            <div className="flex gap-1">
                <IconButton
                    action="duplicate-item"
                    label={`Duplicate the item ${item.description}`}
                    glyph={DUPLICATE_GLYPH}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onDuplicate(index);
                    }} 
                />
                <IconButton
                    action="delete-item"
                    label={`Delete the item ${item.description}`}
                    glyph={DELETE_GLYPH}
                    danger
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                    }} 
                />
            </div>
        </div>
    );
}