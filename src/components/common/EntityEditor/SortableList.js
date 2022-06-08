import { SortableContainer } from 'react-sortable-hoc';

export const SortableList = SortableContainer(({ children }) => {
    return <div className="SortableContainer">{children}</div>;
});
