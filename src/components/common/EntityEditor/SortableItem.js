import { SortableElement } from 'react-sortable-hoc';
export const SortableItem = SortableElement(({ children }) => <div className="SortableItem">{children}</div>);
