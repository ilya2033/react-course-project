import { Categories } from "../../common/Categories";

const adminCategories = [
    {
        _id: "goods/",
        name: "Товари",
    },
    {
        _id: "categories/",
        name: "Категорії",
    },
    {
        _id: "orders/",
        name: "Замовлення",
    },
    {
        _id: "tree/",
        name: "Дерево категорій",
    },
    {
        _id: "users/",
        name: "Користувачі",
    },
];

export const AdminCategories = () => <Categories categories={adminCategories} url="/admin/" />;
