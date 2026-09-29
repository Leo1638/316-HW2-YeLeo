import { useCurrentList } from '../context/CurrentListContext.jsx';
import { useLists } from '../context/ListsContext.jsx';
import { useModals } from '../context/ModalContext.jsx';
import { cloneItem, itemValues, valuesAreEqual, createListItem } from '../model/listItem.js';
import { normalizeListName } from '../model/wolfieList.js';
import { DuplicateItem_Transaction } from '../transactions/DuplicateItem_Transaction.js';
import { EditItem_Transaction } from '../transactions/EditItem_Transaction.js';
import { DeleteItem_Transaction } from '../transactions/DeleteItem_Transaction.js';
import { MoveItem_Transaction } from '../transactions/MoveItem_Transaction.js';
import { AddItem_Transaction } from '../transactions/AddItem_Transaction.js';
import { RenameList_Transaction } from '../transactions/RenameList_Transaction.js';

export const ItemModalModes = {
    EDIT: 'edit',
    CREATE: 'create'
};

export function useListEditor() {
    const { list, operations, addTransaction, undo, redo, canUndo, canRedo } = useCurrentList();
    const { closeList } = useLists();
    const { openItemModal, closeItemModal, inform, askConfirm } = useModals();

    function requestEditItem(index) {
        openItemModal({
            mode: ItemModalModes.EDIT,
            index,
            itemCount: list.items.length,
            values: itemValues(list.items[index])
        });
    }

    function requestDeleteItem(index) {
        const itemToDelete = list.items[index];
        askConfirm({
            title: 'Delete This Item?',
            message: 'Are you sure you want to delete this item? You can undo this.',
            acceptLabel: 'Delete Item',
            onAccept: () => {
                addTransaction(new DeleteItem_Transaction(operations, index, itemToDelete));
            }
        });
    }

    function requestAddItem() {
        openItemModal({
            mode: ItemModalModes.CREATE,
            index: list.items.length,
            itemCount: list.items.length,
            values: { 
                description: '', 
                priority: 'Low', 
                targetDate: null, 
                completed: false }
        });
    }

    function commitItemModal({ index, values, then = 'close' }) {
        if (values.description === '') {
            inform({ title: 'A Description Is Required', message: 'Every item needs a description.' });
            return;
        }

        if (index === list.items.length) {
            const newItem = createListItem(values);
            addTransaction(new AddItem_Transaction(operations, newItem, index)); 
        } else {
            const oldValues = itemValues(list.items[index]);
            if (!valuesAreEqual(oldValues, values)) {
                addTransaction(new EditItem_Transaction(operations, index, oldValues, values));
            }
        }

        if (then === 'next') requestEditItem(index + 1);
        else if (then === 'previous') requestEditItem(index - 1);
        else closeItemModal();
    }

    function duplicateItem(index) {
        addTransaction(new DuplicateItem_Transaction(operations, index, cloneItem(list.items[index])));
    }

    function moveItem(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        addTransaction(new MoveItem_Transaction(operations, fromIndex, toIndex));
    }

    function renameList(newName) {
        const normalized = normalizeListName(newName);
        if (normalized !== list.name) {
            addTransaction(new RenameList_Transaction(operations, list.name, normalized));
        }
    }

    return {
        list, items: list?.items ?? [], canUndo, canRedo, undo, redo, closeList, 
        requestDeleteItem, requestEditItem, requestAddItem, commitItemModal, duplicateItem, moveItem, renameList
    };
}